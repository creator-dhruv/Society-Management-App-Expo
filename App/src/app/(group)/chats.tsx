import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Keyboard,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

import Colors from "@/constants/color";
import { Fonts } from "@/constants/font";
import { SafeAreaView } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";

const CURRENT_USER_ID = "687f9c2a4e8f1d9a3b7c1005";

interface IMessages {
  _id: string;
  userId: string;
  name: string;
  message: string;
}
[];

const messages = [
  {
    _id: "687f9c2a4e8f1d9a3b7c2001",
    userId: "687f9c2a4e8f1d9a3b7c1001",
    name: "Rahul Sharma",
    message: "Does anyone know when the water supply will resume?",
  },
  {
    _id: "687f9c2a4e8f1d9a3b7c2002",
    userId: CURRENT_USER_ID,
    name: "You",
    message: "Maintenance team said it'll be restored by 5 PM.",
  },
  {
    _id: "687f9c2a4e8f1d9a3b7c2003",
    userId: "687f9c2a4e8f1d9a3b7c1002",
    name: "Priya Verma",
    message: "Thanks for the update!",
  },
  {
    _id: "687f9c2a4e8f1d9a3b7c2004",
    userId: "687f9c2a4e8f1d9a3b7c1003",
    name: "Amit Gupta",
    message: "Clubhouse booking opens tomorrow morning.",
  },
  {
    _id: "687f9c2a4e8f1d9a3b7c2005",
    userId: CURRENT_USER_ID,
    name: "You",
    message: "Perfect, I'll reserve a slot.",
  },
  {
    _id: "687f9c2a4e8f1d9a3b7c2006",
    userId: "687f9c2a4e8f1d9a3b7c1004",
    name: "Neha Singh",
    message: "Has anyone received today's newspaper?",
  },
  {
    _id: "687f9c2a4e8f1d9a3b7c2007",
    userId: "687f9c2a4e8f1d9a3b7c1006",
    name: "Vikram Joshi",
    message: "Security has kept a few copies at the gate.",
  },
  {
    _id: "687f9c2a4e8f1d9a3b7c2008",
    userId: CURRENT_USER_ID,
    name: "You",
    message: "I'll collect mine this evening.",
  },
  {
    _id: "687f9c2a4e8f1d9a3b7c2009",
    userId: "687f9c2a4e8f1d9a3b7c1007",
    name: "Ananya Mishra",
    message: "Yoga session starts at 7 AM tomorrow.",
  },
  {
    _id: "687f9c2a4e8f1d9a3b7c2010",
    userId: "687f9c2a4e8f1d9a3b7c1008",
    name: "Rohit Mehta",
    message: "Looking forward to it!",
  },
  {
    _id: "687f9c2a4e8f1d9a3b7c2011",
    userId: CURRENT_USER_ID,
    name: "You",
    message: "See you there.",
  },
  {
    _id: "687f9c2a4e8f1d9a3b7c2012",
    userId: "687f9c2a4e8f1d9a3b7c1009",
    name: "Sneha Kapoor",
    message: "Please don't park near the fire exit.",
  },
  {
    _id: "687f9c2a4e8f1d9a3b7c2013",
    userId: "687f9c2a4e8f1d9a3b7c1010",
    name: "Karan Malhotra",
    message: "Visitor parking is available in Block C.",
  },
  {
    _id: "687f9c2a4e8f1d9a3b7c2014",
    userId: CURRENT_USER_ID,
    name: "You",
    message: "Thanks for letting everyone know.",
  },
  {
    _id: "687f9c2a4e8f1d9a3b7c2015",
    userId: "687f9c2a4e8f1d9a3b7c1001",
    name: "Rahul Sharma",
    message: "Any update on the lift maintenance?",
  },
  {
    _id: "687f9c2a4e8f1d9a3b7c2016",
    userId: "687f9c2a4e8f1d9a3b7c1002",
    name: "Priya Verma",
    message: "Technicians are expected by noon.",
  },
  {
    _id: "687f9c2a4e8f1d9a3b7c2017",
    userId: CURRENT_USER_ID,
    name: "You",
    message: "Hopefully it gets fixed today.",
  },
  {
    _id: "687f9c2a4e8f1d9a3b7c2018",
    userId: "687f9c2a4e8f1d9a3b7c1003",
    name: "Amit Gupta",
    message: "Kids' drawing competition starts this weekend.",
  },
  {
    _id: "687f9c2a4e8f1d9a3b7c2019",
    userId: "687f9c2a4e8f1d9a3b7c1004",
    name: "Neha Singh",
    message: "Registrations close tomorrow evening.",
  },
  {
    _id: "687f9c2a4e8f1d9a3b7c2020",
    userId: CURRENT_USER_ID,
    name: "You",
    message: "I've already registered my nephew.",
  },
  {
    _id: "687f9c2a4e8f1d9a3b7c2021",
    userId: "687f9c2a4e8f1d9a3b7c1006",
    name: "Vikram Joshi",
    message: "Anyone interested in badminton this evening?",
  },
  {
    _id: "687f9c2a4e8f1d9a3b7c2022",
    userId: CURRENT_USER_ID,
    name: "You",
    message: "Count me in!",
  },
  {
    _id: "687f9c2a4e8f1d9a3b7c2023",
    userId: "687f9c2a4e8f1d9a3b7c1007",
    name: "Ananya Mishra",
    message: "I'll join after work.",
  },
  {
    _id: "687f9c2a4e8f1d9a3b7c2024",
    userId: "687f9c2a4e8f1d9a3b7c1008",
    name: "Rohit Mehta",
    message: "Can someone share the court timing?",
  },
  {
    _id: "687f9c2a4e8f1d9a3b7c2025",
    userId: CURRENT_USER_ID,
    name: "You",
    message: "6 PM to 8 PM every weekday.",
  },
  {
    _id: "687f9c2a4e8f1d9a3b7c2026",
    userId: "687f9c2a4e8f1d9a3b7c1009",
    name: "Sneha Kapoor",
    message: "Rain is expected tonight.",
  },
  {
    _id: "687f9c2a4e8f1d9a3b7c2027",
    userId: "687f9c2a4e8f1d9a3b7c1010",
    name: "Karan Malhotra",
    message: "Please close your balcony windows.",
  },
  {
    _id: "687f9c2a4e8f1d9a3b7c2028",
    userId: CURRENT_USER_ID,
    name: "You",
    message: "Thanks for the reminder.",
  },
  {
    _id: "687f9c2a4e8f1d9a3b7c2029",
    userId: "687f9c2a4e8f1d9a3b7c1001",
    name: "Rahul Sharma",
    message: "Have a great evening everyone!",
  },
  {
    _id: "687f9c2a4e8f1d9a3b7c2030",
    userId: CURRENT_USER_ID,
    name: "You",
    message: "You too! 😊",
  },
];

const ChatInput = ({ focus, setFocus }: any) => {
  const [message, setMessage] = useState("");

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

        <TouchableOpacity activeOpacity={0.85}>
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

const Chats = () => {
  const [keyboardHeight] = useState(new Animated.Value(0));
  const [focus, setFocus] = useState(false);

  // const flatListRef = useRef<FlatList<IMessages>>(null);

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

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface }}>
      <SafeAreaView
        style={{ flex: 1, marginTop: 70 }}
        edges={["top", "left", "right"]}
      >
        <Animated.View style={{ flex: 1, paddingBottom: keyboardHeight }}>
          <FlatList
            // ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item._id}
            inverted
            contentContainerStyle={{
              padding: 16,
              flexGrow: 1,
              flexDirection: "column-reverse",
              justifyContent: "flex-end",
            }}
            // Dismiss keyboard when scrolling down
            // keyboardDismissMode="on-drag"
            renderItem={({ item, index }) => {
              const isMe = item.userId === CURRENT_USER_ID;
              return (
                <View
                  style={{
                    alignItems: isMe ? "flex-end" : "flex-start",
                    marginBottom:
                      messages.length == index + 1 && !focus ? 80 : 14,
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
          <ChatInput focus={focus} setFocus={setFocus} />
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({
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
