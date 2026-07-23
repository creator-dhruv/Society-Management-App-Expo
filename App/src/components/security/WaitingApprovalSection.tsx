import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/color";
import { Fonts, FontSize } from "@/constants/font";

export type VisitorType = "visitor" | "delivery" | "househelp";

export type WaitingVisitor = {
  id: string;
  name: string;
  flat: string;
  waitingTime: string;
  type: VisitorType;
};

type Props = {
  data: WaitingVisitor[];
  onPress?: (visitor: WaitingVisitor) => void;
};

const WaitingApprovalSection = ({ data, onPress }: Props) => {
  return (
    <LinearGradient colors={["#FFFFFF", "#F8FBFF"]} style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Waiting Approval</Text>

          <Text style={styles.subtitle}>
            {data.length} visitor{data.length !== 1 ? "s" : ""} waiting
          </Text>
        </View>

        <View style={styles.count}>
          <Text style={styles.countText}>{data.length}</Text>
        </View>
      </View>

      {data.map((item, index) => (
        <Pressable
          key={item.id}
          style={[styles.row, index !== data.length - 1 && styles.border]}
          onPress={() => onPress?.(item)}
        >
          <View style={styles.avatar}>
            <Ionicons
              name={
                item.type === "visitor"
                  ? "person-outline"
                  : item.type === "delivery"
                    ? "bicycle-outline"
                    : "construct-outline"
              }
              size={20}
              color={Colors.primary}
            />
          </View>

          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>

            <Text style={styles.flat}>
              {item.flat} • Waiting {item.waitingTime}
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={22}
            color={Colors.text.muted}
          />
        </Pressable>
      ))}
    </LinearGradient>
  );
};

export default WaitingApprovalSection;

const styles = StyleSheet.create({
  card: {
    marginVertical: 20,
    marginBottom: 100,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden",
    ...Colors.shadowStyle.card,
  },

  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontFamily: Fonts.bold,
    fontSize: FontSize.lg,
    color: Colors.text.primary,
  },

  subtitle: {
    marginTop: 4,
    fontFamily: Fonts.medium,
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
  },

  count: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.blue[50],
    justifyContent: "center",
    alignItems: "center",
  },

  countText: {
    fontFamily: Fonts.bold,
    color: Colors.primary,
    fontSize: FontSize.lg,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },

  border: {
    borderTopWidth: 1,
    borderColor: Colors.divider,
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: Colors.blue[50],
    justifyContent: "center",
    alignItems: "center",
  },

  info: {
    flex: 1,
    marginLeft: 14,
  },

  name: {
    fontFamily: Fonts.semibold,
    fontSize: FontSize.md,
    color: Colors.text.primary,
  },

  flat: {
    marginTop: 4,
    fontFamily: Fonts.medium,
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
  },
});
