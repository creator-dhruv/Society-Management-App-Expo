import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  Animated,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@react-native-vector-icons/ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";

import Colors from "@/constants/color";
import { Fonts } from "@/constants/font";
import { useChatStore } from "@/store/community.store";
import { useSocietyStore } from "@/store/society.store";
import { chatService } from "@/services/community.services";
import { Message } from "@/types/community";
import { useAuthStore } from "@/store/auth.store";

const CURRENT_USER_ID = "687f9c2a4e8f1d9a3b7c1005";
const POLLING_INTERVAL = 3000; // 3 seconds interval

const ChatInput = ({
  focus,
  setFocus,
  onSend,
}: {
  focus: boolean;
  setFocus: (val: boolean) => void;
  onSend: (text: string) => void;
}) => {
  const [message, setMessage] = useState("");

  const handlePressSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  return (
    <BlurView
      intensity={100}
      tint="light"
      style={[
        styles.container,
        !focus && {
          position: "absolute",
          bottom: 10,
          alignSelf: "center",
        },
      ]}
    >
      <View style={styles.inputContainer}>
        <TextInput
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholder="Write a message..."
          placeholderTextColor={Colors.text.tertiary}
          value={message}
          onChangeText={setMessage}
          multiline
          scrollEnabled
          textAlignVertical="top"
          style={styles.input}
        />

        <TouchableOpacity activeOpacity={0.85} onPress={handlePressSend}>
          <LinearGradient
            colors={["#6DBBFF", "#3B9DFF", "#1E7CF8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.sendButton}
          >
            <Ionicons name="paper-plane" size={20} color={Colors.white} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </BlurView>
  );
};

// ... keep imports and ChatInput component intact

const Chats = () => {
  const [keyboardHeight] = useState(new Animated.Value(0));
  const [focus, setFocus] = useState(false);

  const { selectedSociety } = useSocietyStore();
  const {
    messages,
    setMessages,
    appendNewMessages,
    isInitialLoading,
    setInitialLoading,
  } = useChatStore();

  const societyId = selectedSociety?._id;
  const isPollingRef = useRef(false);
  const latestMessageIdRef = useRef<string | undefined>(undefined);

  // Keep latestMessageIdRef synchronized with the newest message (index 0)
  useEffect(() => {
    if (messages.length > 0) {
      latestMessageIdRef.current = messages[0]._id;
    }
  }, [messages]);

  // Polling setup
  useEffect(() => {
    if (!societyId) return;

    const fetchMessages = async (isFirstLoad = false) => {
      if (isPollingRef.current) return;
      isPollingRef.current = true;

      try {
        if (isFirstLoad) setInitialLoading(true);

        const lastId = isFirstLoad ? undefined : latestMessageIdRef.current;
        const response = await chatService.getMessages(societyId, lastId);

        if (response?.success && response.data?.length > 0) {
          if (isFirstLoad) {
            // Reverse incoming array (oldest-to-newest) so newest sits at index 0
            setMessages([...response.data].reverse());
          } else {
            appendNewMessages(response.data);
          }
        }
      } catch (err) {
        console.error("Polling error:", err);
      } finally {
        isPollingRef.current = false;
        if (isFirstLoad) setInitialLoading(false);
      }
    };

    fetchMessages(true);

    const timerId = setInterval(() => {
      fetchMessages(false);
    }, POLLING_INTERVAL);

    return () => clearInterval(timerId);
  }, [societyId]);

  // Keyboard listeners...
  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSubscription = Keyboard.addListener(showEvent, (e) => {
      Animated.timing(keyboardHeight, {
        duration: Platform.OS === "ios" ? e.duration || 250 : 0,
        toValue: e.endCoordinates.height,
        useNativeDriver: false,
      }).start();
    });

    const hideSubscription = Keyboard.addListener(hideEvent, (e) => {
      Animated.timing(keyboardHeight, {
        duration: Platform.OS === "ios" ? e.duration || 250 : 0,
        toValue: 0,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const { user } = useAuthStore();

  const handleSendMessage = async (text: string) => {
    if (!societyId) return;

    try {
      await chatService.sendMessage({
        societyId,
        userId: CURRENT_USER_ID,
        name: user?.name ?? "",
        message: text,
      });
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface }}>
      <SafeAreaView
        style={{ flex: 1, marginTop: 70 }}
        edges={["top", "left", "right"]}
      >
        <Animated.View style={{ flex: 1, paddingBottom: keyboardHeight }}>
          {isInitialLoading && messages.length === 0 ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={Colors.primary} />
            </View>
          ) : (
            <FlatList
              data={messages}
              keyExtractor={(item) => item._id}
              inverted
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 16, // Top of the chat screen
                paddingTop: focus ? 0 : 80, // Clear the absolute input bar space
              }}
              renderItem={({ item, index }) => {
                const isMe = item.userId === CURRENT_USER_ID;
                return (
                  <View
                    style={{
                      alignItems: isMe ? "flex-end" : "flex-start",
                      marginBottom: 14,
                    }}
                  >
                    {!isMe && (
                      <Text
                        style={{
                          fontFamily: Fonts.semibold,
                          color: Colors.primary,
                          marginBottom: 4,
                          marginLeft: 10,
                          fontSize: 12,
                        }}
                      >
                        {item.name}
                      </Text>
                    )}

                    {isMe ? (
                      <LinearGradient
                        colors={["#6DBBFF", "#3B9DFF", "#1E7CF8"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                          maxWidth: "78%",
                          paddingHorizontal: 16,
                          paddingVertical: 12,
                          borderTopLeftRadius: 22,
                          borderTopRightRadius: 22,
                          borderBottomLeftRadius: 22,
                          borderBottomRightRadius: 6,
                          elevation: 10,
                          shadowColor: "#18161682",
                        }}
                      >
                        <Text
                          style={{
                            color: "#fff",
                            fontFamily: Fonts.medium,
                            fontSize: 15,
                            lineHeight: 22,
                          }}
                        >
                          {item.message}
                        </Text>
                      </LinearGradient>
                    ) : (
                      <View
                        style={{
                          maxWidth: "78%",
                          borderWidth: 1,
                          borderColor: "#00000016",
                          paddingHorizontal: 16,
                          paddingVertical: 12,
                          borderTopLeftRadius: 6,
                          borderTopRightRadius: 22,
                          borderBottomLeftRadius: 22,
                          borderBottomRightRadius: 22,
                          backgroundColor: Colors.surface,
                          elevation: 6,
                          shadowColor: "#18161682",
                        }}
                      >
                        <Text
                          style={{
                            color: Colors.text.primary,
                            fontFamily: Fonts.medium,
                            fontSize: 15,
                            lineHeight: 22,
                          }}
                        >
                          {item.message}
                        </Text>
                      </View>
                    )}
                  </View>
                );
              }}
            />
          )}

          <ChatInput
            focus={focus}
            setFocus={setFocus}
            onSend={handleSendMessage}
          />
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

// export default Chats;

export default Chats;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    marginBottom: 10,
    marginHorizontal: 12,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "#ffffff85",
    borderWidth: 1,
    borderColor: "#0000001b",
    shadowColor: "#18161682",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 28,
    paddingLeft: 18,
    paddingRight: 8,
    paddingVertical: 6,
  },
  input: {
    minHeight: 20,
    maxHeight: 50,
    flex: 1,
    fontFamily: Fonts.medium,
    fontSize: 15,
    color: Colors.text.primary,
    paddingTop: 8,
    paddingBottom: 8,
    marginRight: 10,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
});
