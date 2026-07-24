import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@react-native-vector-icons/ionicons";
import Colors from "@/constants/color";
import { Fonts } from "@/constants/font";

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

const PollCard = ({
  poll,
  onVote,
}: {
  poll: PollData;
  onVote: (pollId: string, optionId: string) => void;
}) => {
  const hasVoted = poll.userVotedOptionId !== undefined;

  return (
    <View style={styles.cardContainer}>
      {/* Header Info */}
      <View style={styles.cardHeader}>
        <View style={styles.authorBadge}>
          <Ionicons name="bar-chart-outline" size={14} color={Colors.primary} />
          <Text style={styles.authorText}>{poll.authorName}</Text>
        </View>
        <Text style={styles.timeText}>{poll.timeAgo}</Text>
      </View>

      {/* Poll Question */}
      <Text style={styles.questionText}>{poll.question}</Text>

      {/* Options List */}
      <View style={styles.optionsList}>
        {poll.options.map((option) => {
          const isSelected = poll.userVotedOptionId === option.id;
          const percentage =
            poll.totalVotes > 0
              ? Math.round((option.votes / poll.totalVotes) * 100)
              : 0;

          return (
            <TouchableOpacity
              key={option.id}
              activeOpacity={hasVoted ? 1 : 0.7}
              disabled={hasVoted}
              onPress={() => onVote(poll._id, option.id)}
              style={[
                styles.optionButton,
                isSelected && styles.optionButtonSelected,
              ]}
            >
              {/* Animated/Filled Progress Bar when voted */}
              {hasVoted && (
                <View style={styles.progressBarBackground}>
                  <LinearGradient
                    colors={
                      isSelected
                        ? ["#6DBBFF", "#3B9DFF"]
                        : ["#E2E8F0", "#CBD5E1"]
                    }
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[
                      styles.progressBarFill,
                      { width: `${percentage}%` },
                    ]}
                  />
                </View>
              )}

              {/* Option Text Content */}
              <View style={styles.optionContent}>
                <View style={styles.optionLeft}>
                  <View
                    style={[
                      styles.radioCircle,
                      isSelected && styles.radioCircleSelected,
                    ]}
                  >
                    {isSelected && (
                      <Ionicons name="checkmark" size={12} color="#FFF" />
                    )}
                  </View>
                  <Text
                    style={[
                      styles.optionText,
                      isSelected && styles.optionTextSelected,
                    ]}
                  >
                    {option.text}
                  </Text>
                </View>

                {/* Percentage Display */}
                {hasVoted && (
                  <Text
                    style={[
                      styles.percentageText,
                      isSelected && styles.percentageTextSelected,
                    ]}
                  >
                    {percentage}%
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Footer Info */}
      <View style={styles.cardFooter}>
        <Text style={styles.totalVotesText}>
          {poll.totalVotes} {poll.totalVotes === 1 ? "vote" : "votes"}
        </Text>
        {hasVoted && <Text style={styles.votedStatusText}>• Voted</Text>}
      </View>
    </View>
  );
};

export default PollCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    elevation: 10,
    shadowColor: "#18161682",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  authorBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  authorText: {
    fontSize: 12,
    fontFamily: Fonts.semibold,
    color: Colors.primary,
  },
  timeText: {
    fontSize: 11,
    fontFamily: Fonts.medium,
    color: "#94A3B8",
  },
  questionText: {
    fontSize: 15,
    fontFamily: Fonts.semibold,
    color: Colors.text.primary,
    lineHeight: 22,
    marginBottom: 14,
  },
  optionsList: {
    gap: 10,
  },
  optionButton: {
    position: "relative",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    backgroundColor: "#F8FAFC",
    overflow: "hidden",
    justifyContent: "center",
  },
  optionButtonSelected: {
    borderColor: "#3B9DFF",
  },
  progressBarBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },
  progressBarFill: {
    height: "100%",
    opacity: 0.2,
    borderRadius: 14,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: "#94A3B8",
    justifyContent: "center",
    alignItems: "center",
  },
  radioCircleSelected: {
    backgroundColor: "#3B9DFF",
    borderColor: "#3B9DFF",
  },
  optionText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.text.primary,
    flex: 1,
  },
  optionTextSelected: {
    fontFamily: Fonts.semibold,
    color: "#1E7CF8",
  },
  percentageText: {
    fontSize: 13,
    fontFamily: Fonts.medium,
    color: "#64748B",
    marginLeft: 8,
  },
  percentageTextSelected: {
    fontFamily: Fonts.bold,
    color: "#1E7CF8",
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
  },
  totalVotesText: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: Colors.text.tertiary || "#94A3B8",
  },
  votedStatusText: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: "#3B9DFF",
  },
});
