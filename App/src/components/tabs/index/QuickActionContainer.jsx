import React from "react";
import { FlatList, Pressable, Text, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useRouter } from "expo-router";

import useDimension from "@/hooks/dimensions";
import Colors from "@/constants/color";
import { Fonts, FontSize } from "@/constants/font";

const QUICK_ACTIONS = [
  {
    title: "Manage Visitors",
    icon: "person",
    theme: Colors.quickAction.visitors,
    onPress: "/visitors",
  },
  {
    title: "Book Amenities",
    icon: "fitness",
    theme: Colors.quickAction.amenities,
    onPress: "/amenities",
  },
  {
    title: "Notice Board",
    icon: "newspaper",
    theme: Colors.quickAction.notices,
    onPress: "/noticeboard",
  },
  {
    title: "Pay Maintenance",
    icon: "card",
    theme: Colors.quickAction.payments,
    onPress: "/maintenance",
  },
  {
    title: "SOS Emergency",
    icon: "flame",
    theme: Colors.quickAction.emergency,
  },
  {
    title: "Raise Complaint",
    icon: "warning",
    theme: Colors.quickAction.complaints,
    onPress: "/complaint",
  },
];

export default function QuickActionContainer() {
  const { width, height } = useDimension();
  const router = useRouter();

  const cardWidth = (width - 60) / 2;
  const cardHeight = Math.max(150, Math.min(height * 0.22, 185));

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.headingRow}>
          <Text style={styles.heading}>Quick Actions</Text>

          <Ionicons name="sparkles" size={22} color={Colors.icon.dark} />
        </View>

        <Text style={styles.subHeading}>
          Access most-used services instantly
        </Text>
      </View>

      <FlatList
        data={QUICK_ACTIONS}
        numColumns={2}
        scrollEnabled={false}
        keyExtractor={(item) => item.title}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => (
          <View
            style={[
              styles.cardContainer,
              {
                width: cardWidth,
                height: cardHeight,
              },
            ]}
          >
            <View
              pointerEvents="none"
              style={[
                styles.backLayerOne,
                {
                  backgroundColor: item.theme.color + "32",
                },
              ]}
            />

            <View
              pointerEvents="none"
              style={[
                styles.backLayerTwo,
                {
                  backgroundColor: item.theme.color + "18",
                },
              ]}
            />

            <Pressable
              accessibilityRole="button"
              accessibilityLabel={item.title}
              onPress={() => router.push(item.onPress || "/")}
              style={({ pressed }) => [
                styles.card,
                {
                  opacity: pressed ? 0.92 : 1,
                },
              ]}
            >
              <LinearGradient
                colors={[Colors.surface, Colors.surfaceSecondary]}
                style={styles.gradient}
              >
                <View
                  style={[
                    styles.glow,
                    {
                      backgroundColor: item.theme.color + "12",
                    },
                  ]}
                />

                <View style={styles.topRow}>
                  <LinearGradient
                    colors={[item.theme.backgroundColor, item.theme.color]}
                    style={styles.iconContainer}
                  >
                    <Ionicons
                      name={item.icon}
                      size={28}
                      color={Colors.text.white}
                    />
                  </LinearGradient>

                  <View style={styles.arrowContainer}>
                    <Ionicons
                      name="arrow-forward"
                      size={18}
                      color={Colors.text.muted}
                    />
                  </View>
                </View>

                <View style={styles.spacer} />

                <Text numberOfLines={2} style={styles.title}>
                  {item.title}
                </Text>

                <Text numberOfLines={1} style={styles.subtitle}>
                  Tap to continue
                </Text>

                <View style={styles.footer}>
                  <View
                    style={[
                      styles.indicator,
                      {
                        backgroundColor: item.theme.color,
                      },
                    ]}
                  />

                  <View style={styles.line} />
                </View>
              </LinearGradient>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },

  headingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  heading: {
    fontSize: FontSize["2xl"],
    fontFamily: Fonts.bold,
    color: Colors.text.primary,
    letterSpacing: -0.7,
  },

  subHeading: {
    fontSize: FontSize.sm,
    color: Colors.text.tertiary,
    fontFamily: Fonts.medium,
    lineHeight: 20,
  },

  columnWrapper: {
    gap: 16,
  },

  contentContainer: {
    paddingHorizontal: 20,
    gap: 16,
    paddingBottom: 12,
  },

  cardContainer: {
    position: "relative",
  },

  backLayerOne: {
    position: "absolute",
    top: 14,
    left: 14,
    right: -2,
    bottom: -2,
    borderRadius: 28,
    transform: [{ rotate: "6deg" }],
  },

  backLayerTwo: {
    position: "absolute",
    top: 8,
    left: 8,
    right: -1,
    bottom: -1,
    borderRadius: 28,
    transform: [{ rotate: "3deg" }],
  },

  card: {
    width: "100%",
    height: "100%",
    borderRadius: 28,
    overflow: "hidden",
    ...Colors.shadowStyle.card,
  },

  gradient: {
    flex: 1,
    padding: 16,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: Colors.divider,
  },

  glow: {
    position: "absolute",
    top: -30,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  iconContainer: {
    width: 58,
    height: 58,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  arrowContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },

  spacer: {
    flex: 1,
    marginTop: 8,
  },

  title: {
    fontFamily: Fonts.bold,
    fontSize: FontSize.lg,
    color: Colors.text.primary,
    lineHeight: 24,
  },

  subtitle: {
    marginTop: 6,
    color: Colors.text.tertiary,
    fontSize: FontSize.xs,
    fontFamily: Fonts.medium,
  },

  footer: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  indicator: {
    width: 34,
    height: 5,
    borderRadius: 999,
  },

  line: {
    flex: 1,
    height: 1,
    marginLeft: 8,
    backgroundColor: Colors.border,
  },
});
