import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
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
  },
  {
    title: "Book Amenities",
    icon: "fitness",
    theme: Colors.quickAction.amenities,
  },
  {
    title: "Notice Board",
    icon: "newspaper",
    theme: Colors.quickAction.notices,
  },
  {
    title: "Pay Maintenance",
    icon: "card",
    theme: Colors.quickAction.payments,
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
  },
];

export default function QuickActionContainer() {
  const { width, height } = useDimension();
  const router = useRouter();
  const cardWidth = (width - 60) / 2;
  const cardHeight = Math.max(150, Math.min(height * 0.22, 185));

  return (
    <View>
      <View
        style={{
          paddingHorizontal: Colors.spacing.xl,
          marginBottom: Colors.spacing.sm,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: Colors.spacing.sm,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: FontSize["2xl"],
              fontFamily: Fonts.bold,
              color: Colors.text.primary,
              letterSpacing: -0.7,
            }}
          >
            Quick Actions
          </Text>
          <Ionicons name="sparkles" size={22} color={Colors.icon.dark} />
        </View>
        <Text
          style={{
            fontSize: FontSize.sm,
            color: Colors.text.tertiary,
            fontFamily: Fonts.medium,
            lineHeight: 20,
          }}
        >
          Access most-used services instantly
        </Text>
      </View>

      <FlatList
        data={QUICK_ACTIONS}
        numColumns={2}
        scrollEnabled={false}
        keyExtractor={(item) => item.title}
        columnWrapperStyle={{ gap: Colors.spacing.lg }}
        contentContainerStyle={{
          paddingHorizontal: Colors.spacing.xl,
          gap: Colors.spacing.lg,
          paddingBottom: Colors.spacing.md,
        }}
        renderItem={({ item }) => (
          <View style={{ width: cardWidth, height: cardHeight }}>
            <View
              pointerEvents="none"
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                right: -2,
                bottom: -2,
                borderRadius: Colors.radius.xl,
                backgroundColor: item.theme.color + "32",
                transform: [{ rotate: "6deg" }],
              }}
            />
            <View
              pointerEvents="none"
              style={{
                position: "absolute",
                top: 8,
                left: 8,
                right: -1,
                bottom: -1,
                borderRadius: Colors.radius.xl,
                backgroundColor: item.theme.color + "18",
                transform: [{ rotate: "3deg" }],
              }}
            />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={item.title}
              onPress={() => router.navigate("/demo")}
              style={({ pressed }) => ({
                width: "100%",
                height: "100%",
                opacity: pressed ? 0.92 : 1,
                borderRadius: Colors.radius.xl,
                overflow: "hidden",
                ...Colors.shadowStyle.card,
              })}
            >
            <LinearGradient
              colors={[Colors.surface, Colors.surfaceSecondary]}
              style={{
                flex: 1,
                padding: Colors.spacing.lg,
                borderRadius: Colors.radius.xl,
                borderWidth: 1,
                borderColor: Colors.divider,
              }}
            >
              <View
                style={{
                  position: "absolute",
                  right: -30,
                  top: -30,
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                  backgroundColor: item.theme.color + "12",
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <LinearGradient
                  colors={[item.theme.backgroundColor, item.theme.color]}
                  style={{
                    width: 58,
                    height: 58,
                    borderRadius: Colors.radius.md,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name={item.icon}
                    size={28}
                    color={Colors.text.white}
                  />
                </LinearGradient>
                <View
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 19,
                    backgroundColor: Colors.surface,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name="arrow-forward"
                    size={18}
                    color={Colors.text.muted}
                  />
                </View>
              </View>
              <View style={{ flex: 1, marginTop: Colors.spacing.sm }} />
              <Text
                numberOfLines={2}
                style={{
                  fontFamily: Fonts.bold,
                  fontSize: FontSize.lg,
                  color: Colors.text.primary,
                  lineHeight: 24,
                }}
              >
                {item.title}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  marginTop: 6,
                  color: Colors.text.tertiary,
                  fontSize: FontSize.xs,
                  fontFamily: Fonts.medium,
                }}
              >
                Tap to continue
              </Text>
              <View
                style={{
                  marginTop: Colors.spacing.lg,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 34,
                    height: 5,
                    borderRadius: Colors.radius.pill,
                    backgroundColor: item.theme.color,
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    height: 1,
                    marginLeft: Colors.spacing.sm,
                    backgroundColor: Colors.border,
                  }}
                />
              </View>
            </LinearGradient>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}
