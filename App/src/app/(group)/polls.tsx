import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@react-native-vector-icons/ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from "@/constants/color";
import { Fonts } from "@/constants/font";
import PollCard from "@/components/group/PollCard";
import Button from "@/components/common/Button";
import { useAuthStore } from "@/store/auth.store";

// --- Types ---
interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface PollData {
  _id: string;
  authorName: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  userVotedOptionId?: string;
  timeAgo: string;
}

// --- Dummy Poll Data (10 Polls) ---
const INITIAL_POLLS: PollData[] = [
  {
    _id: "poll_001",
    authorName: "Rahul Sharma",
    question: "When should we schedule the annual society sports day?",
    totalVotes: 34,
    timeAgo: "10 mins ago",
    options: [
      { id: "opt_1_1", text: "This Saturday (4 PM)", votes: 18 },
      { id: "opt_1_2", text: "This Sunday (9 AM)", votes: 12 },
      { id: "opt_1_3", text: "Next Weekend", votes: 4 },
    ],
  },
  {
    _id: "poll_002",
    authorName: "Priya Verma",
    question:
      "Should we install EV charging stations in Visitor Parking Block B?",
    totalVotes: 52,
    timeAgo: "1 hour ago",
    options: [
      { id: "opt_2_1", text: "Yes, immediately", votes: 38 },
      { id: "opt_2_2", text: "No, priority should be Gym upgrade", votes: 10 },
      { id: "opt_2_3", text: "Need a budget discussion first", votes: 4 },
    ],
  },
  {
    _id: "poll_003",
    authorName: "Amit Gupta",
    question: "Which yoga timing works best for weekdays?",
    totalVotes: 28,
    timeAgo: "3 hours ago",
    options: [
      { id: "opt_3_1", text: "6:00 AM - 7:00 AM", votes: 15 },
      { id: "opt_3_2", text: "7:15 AM - 8:15 AM", votes: 9 },
      { id: "opt_3_3", text: "6:30 PM - 7:30 PM", votes: 4 },
    ],
  },
  {
    _id: "poll_004",
    authorName: "Neha Singh",
    question: "What theme should we choose for the Cultural Night?",
    totalVotes: 41,
    timeAgo: "Yesterday",
    options: [
      { id: "opt_4_1", text: "Retro 80s & 90s", votes: 20 },
      { id: "opt_4_2", text: "Traditional Folk & Fusion", votes: 16 },
      { id: "opt_4_3", text: "Bollywood Dhamaka", votes: 5 },
    ],
  },
  {
    _id: "poll_005",
    authorName: "Vikram Joshi",
    question:
      "Proposal to implement strict quiet hours after 10:00 PM on weekdays.",
    totalVotes: 65,
    timeAgo: "Yesterday",
    options: [
      { id: "opt_5_1", text: "Agree (Strict 10 PM)", votes: 45 },
      { id: "opt_5_2", text: "Extend to 11 PM", votes: 15 },
      { id: "opt_5_3", text: "Keep current rules", votes: 5 },
    ],
  },
  {
    _id: "poll_006",
    authorName: "Ananya Mishra",
    question: "Preferred weekend food pop-up at the Central Lawn?",
    totalVotes: 39,
    timeAgo: "2 days ago",
    options: [
      { id: "opt_6_1", text: "South Indian Tiffins", votes: 18 },
      { id: "opt_6_2", text: "Street Food & Chaat", votes: 14 },
      { id: "opt_6_3", text: "Artisanal Bakery & Coffee", votes: 7 },
    ],
  },
  {
    _id: "poll_007",
    authorName: "Rohit Mehta",
    question: "Where should we place the additional CCTV cameras?",
    totalVotes: 48,
    timeAgo: "3 days ago",
    options: [
      { id: "opt_7_1", text: "Basement Parking B2", votes: 26 },
      { id: "opt_7_2", text: "Children's Play Area", votes: 16 },
      { id: "opt_7_3", text: "Back Gate Entrance", votes: 6 },
    ],
  },
  {
    _id: "poll_008",
    authorName: "Sneha Kapoor",
    question: "Should pets be allowed inside the main Clubhouse garden?",
    totalVotes: 73,
    timeAgo: "4 days ago",
    options: [
      { id: "opt_8_1", text: "Yes, on leash only", votes: 42 },
      { id: "opt_8_2", text: "Designate a separate Pet Zone", votes: 25 },
      { id: "opt_8_3", text: "No pets in garden area", votes: 6 },
    ],
  },
  {
    _id: "poll_009",
    authorName: "Karan Malhotra",
    question: "Preferred day for the annual Pest Control spray in apartments?",
    totalVotes: 31,
    timeAgo: "5 days ago",
    options: [
      { id: "opt_9_1", text: "Friday afternoon", votes: 11 },
      { id: "opt_9_2", text: "Saturday morning", votes: 15 },
      { id: "opt_9_3", text: "Sunday afternoon", votes: 5 },
    ],
  },
  {
    _id: "poll_010",
    authorName: "Management Committee",
    question: "Rating overall cleanliness and maintenance service this month:",
    totalVotes: 82,
    timeAgo: "1 week ago",
    options: [
      { id: "opt_10_1", text: "Excellent (5 Stars)", votes: 40 },
      { id: "opt_10_2", text: "Good (4 Stars)", votes: 32 },
      { id: "opt_10_3", text: "Needs Improvement", votes: 10 },
    ],
  },
];

const Polls = () => {
  const { user } = useAuthStore();
  const [polls, setPolls] = useState<PollData[]>(INITIAL_POLLS);

  const handleVote = (pollId: string, optionId: string) => {
    setPolls((prevPolls) =>
      prevPolls.map((poll) => {
        if (poll._id !== pollId || poll.userVotedOptionId) return poll;

        const updatedOptions = poll.options.map((opt) =>
          opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt,
        );

        return {
          ...poll,
          userVotedOptionId: optionId,
          totalVotes: poll.totalVotes + 1,
          options: updatedOptions,
        };
      }),
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.surface }}>
      <SafeAreaView
        style={{ flex: 1, marginTop: 70 }}
        edges={["top", "left", "right"]}
      >
        <FlatList
          data={polls}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          inverted
          contentContainerStyle={{
            padding: 16,
            flexGrow: 1,
            flexDirection: "column-reverse",
            justifyContent: "flex-end",
          }}
          renderItem={({ item }) => (
            <PollCard poll={item} onVote={handleVote} />
          )}
        />
        {user?.role == "admin" && (
          <View
            style={{ position: "absolute", bottom: 12, alignSelf: "center" }}
          >
            <Button title="Create Poll" direction="left" icon="add" />
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

export default Polls;

const styles = StyleSheet.create({
  screenHeader: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 16 : 8,
    paddingBottom: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  screenTitle: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
  },
  screenSubtitle: {
    fontSize: 13,
    fontFamily: Fonts.medium,
    color: Colors.text.tertiary || "#64748B",
    marginTop: 2,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 24,
  },
});
