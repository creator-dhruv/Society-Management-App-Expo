import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/color";
import { Fonts, FontSize } from "@/constants/font";
import Button from "@/components/common/Button";

const STATUS_CONFIG = {
  Upcoming: {
    background: "#FEF3C7",
    dot: "#F59E0B",
    text: "#B45309",
  },
  Inside: {
    background: "#DBEAFE",
    dot: "#2563EB",
    text: "#1D4ED8",
  },
  Exited: {
    background: "#ECFDF5",
    dot: "#10B981",
    text: "#059669",
  },
} as any;

const VisitorHistoryTicketCard = ({ item }: { item: any }) => {
  const statusStyle = STATUS_CONFIG[item.status] ?? STATUS_CONFIG.Upcoming;
  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      {/* Top Ticket */}
      <LinearGradient colors={["#FFFFFF", "#F8FBFF"]} style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.left}>
            <View style={styles.iconContainer}>
              <Ionicons
                name={
                  item.type == "visitor"
                    ? "person-outline"
                    : item.type == "delivery"
                      ? "bicycle-outline"
                      : "construct-outline"
                }
                size={28}
                color="#3392f0"
              />
            </View>

            <View style={{ marginLeft: 14 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </View>

          <View
            style={[styles.status, { backgroundColor: statusStyle.background }]}
          >
            <View
              style={[styles.statusDot, { backgroundColor: statusStyle.dot }]}
            />

            <Text style={[styles.statusText, { color: statusStyle.text }]}>
              {item.status}
            </Text>
          </View>
        </View>

        {/* Ticket Divider */}
        <View style={styles.dashedLine} />

        {/* Bottom */}
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Ionicons name="calendar-outline" size={18} color="#2563EB" />
            <Text style={styles.infoTitle}>DATE</Text>
            <Text style={styles.infoValue}>{item.info.date}</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.infoItem}>
            <Ionicons name="location-outline" size={18} color="#2563EB" />
            <Text style={styles.infoTitle}>GATE</Text>
            <Text style={styles.infoValue}>{item.info.gate}</Text>
          </View>

          <View style={styles.separator} />

          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={18} color="#2563EB" />
            <Text style={styles.infoTitle}>TIME</Text>
            <Text style={styles.infoValue}>{item.info.time}</Text>
          </View>
        </View>

        {/* Botton */}
        {/* <TouchableOpacity
          accessibilityRole="button"
          //   onPress={() => Linking.openURL(`tel:${item.phone}`)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            paddingVertical: 9,
            paddingHorizontal: 20,
            borderRadius: 20,
            backgroundColor: "#2f94face",
            alignSelf: "center",
            justifyContent: "center",
            width: "90%",
            marginBottom: 10,
          }}
        >
          <Ionicons
            name="arrow-up-right-box-outline"
            size={16}
            color={Colors.white}
          />
          <Text
            style={{
              color: Colors.white,
              fontFamily: Fonts.semibold,
              fontSize: FontSize.sm,
            }}
          >
            View Details
          </Text>
        </TouchableOpacity> */}
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            title="View Details"
            icon="arrow-up-right-box-outline"
            direction="left"
          />
        </View>
      </LinearGradient>
    </View>
  );
};

export default VisitorHistoryTicketCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 18,
    marginBottom: 18,
  },

  card: {
    borderRadius: 26,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",

    shadowColor: "#2563EB",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 8,
  },

  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
  },

  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
  },

  title: {
    marginTop: 3,
    fontSize: 14,
    color: "#64748B",
  },

  status: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },

  statusText: {
    fontWeight: "700",
    fontSize: 12,
  },

  dashedLine: {
    borderTopWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D1D5DB",
  },

  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },

  infoItem: {
    flex: 1,
    alignItems: "center",
  },

  separator: {
    width: 1,
    backgroundColor: "#d5d7dc",
    marginHorizontal: 10,
  },

  infoTitle: {
    marginTop: 8,
    fontSize: 11,
    color: "#94A3B8",
    letterSpacing: 1,
    fontWeight: "700",
  },

  infoValue: {
    marginTop: 4,
    fontSize: 13,
    color: "#0F172A",
    fontWeight: "600",
    textAlign: "center",
  },
});
