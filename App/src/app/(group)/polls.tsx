import React, { useEffect, useRef } from "react";
import { FlatList, StyleSheet, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from "@/constants/color";
import PollCard from "@/components/group/PollCard";
import Button from "@/components/common/Button";
import { useAuthStore } from "@/store/auth.store";
import { useSocietyStore } from "@/store/society.store";
import { usePollStore } from "@/store/community.store";
import { pollService } from "@/services/community.services";
import { useRouter } from "expo-router";

const POLLING_INTERVAL = 3000;

const Polls = () => {
  const { user } = useAuthStore();
  const { selectedSociety } = useSocietyStore();
  const router = useRouter();
  const {
    polls,
    setPolls,
    appendNewPolls,
    updatePollVote,
    isInitialLoading,
    setInitialLoading,
  } = usePollStore();

  const societyId = selectedSociety?._id;
  const isPollingRef = useRef(false);
  const latestPollIdRef = useRef<string | undefined>(undefined);

  // Keep latestPollIdRef synchronized with index 0
  useEffect(() => {
    if (polls.length > 0) {
      latestPollIdRef.current = polls[0]._id;
    }
  }, [polls]);

  // Polling setup
  useEffect(() => {
    if (!societyId) return;

    let isMounted = true; // Track mount status

    const fetchPolls = async (isFirstLoad = false) => {
      if (isPollingRef.current) return;
      isPollingRef.current = true;

      try {
        if (isFirstLoad && isMounted) setInitialLoading(true);

        const lastId = isFirstLoad ? undefined : latestPollIdRef.current;
        const response = await pollService.getPolls(societyId, lastId);

        // Prevent updating state if the component unmounted while fetching
        if (!isMounted) return;

        if (response?.success && response.data?.length > 0) {
          if (isFirstLoad) {
            setPolls([...response.data].reverse());
          } else {
            appendNewPolls(response.data);
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error("Polls polling error:", err);
        }
      } finally {
        isPollingRef.current = false;
        if (isFirstLoad && isMounted) setInitialLoading(false);
      }
    };

    fetchPolls(true);

    const timerId = setInterval(() => {
      fetchPolls(false);
    }, POLLING_INTERVAL);

    // Cleanup: Clears the interval and prevents async state updates when unmounted
    return () => {
      isMounted = false;
      clearInterval(timerId);
    };
  }, [societyId]);

  const handleVote = async (pollId: string, optionId: string) => {
    if (!user?._id) return;

    try {
      const response = await pollService.votePoll(pollId, {
        userId: user._id,
        optionId,
      });

      if (response?.success && response.data) {
        updatePollVote(pollId, response.data);
      }
    } catch (err) {
      console.error("Failed to vote:", err);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface }}>
      <SafeAreaView
        style={{ flex: 1, marginTop: 70 }}
        edges={["top", "left", "right"]}
      >
        {isInitialLoading && polls.length === 0 ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        ) : (
          <FlatList
            data={polls}
            keyExtractor={(item) => item._id}
            inverted
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: 16,
              paddingTop: user?.role === "admin" ? 70 : 20,
            }}
            renderItem={({ item }) => (
              <PollCard poll={item} onVote={handleVote} />
            )}
          />
        )}

        {user?.role === "admin" && (
          <View style={styles.createButtonContainer}>
            <Button
              title="Create Poll"
              direction="left"
              icon="add"
              onPress={() => router.push("/(create)/CreatePoll")}
            />
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

export default Polls;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  createButtonContainer: {
    position: "absolute",
    bottom: 12,
    alignSelf: "center",
  },
});
