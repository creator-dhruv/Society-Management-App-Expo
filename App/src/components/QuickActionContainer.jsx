import React from "react";
import {
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@react-native-vector-icons/ionicons";

import useDimension from "@/hooks/dimensions";
import Colors from "@/constants/color";
import { Fonts, FontSize } from "@/constants/font";
import { useRouter } from "expo-router";

const QuickActionButton = [
  {
    title: "Manage Visitors",
    icon: "person",
    color: "#10B981",
    backgroundColor: "#34D399",
  },
  {
    title: "Book Amenities",
    icon: "fitness",
    color: "#8B5CF6",
    backgroundColor: "#A78BFA",
  },
  {
    title: "Pay Maintenance",
    icon: "card",
    color: "#06B6D4",
    backgroundColor: "#22D3EE",
  },
  {
    title: "Raise Complaint",
    icon: "warning",
    color: "#F97316",
    backgroundColor: "#FB923C",
  },
];

const QuickActionContainer = () => {
  const { width, height } = useDimension();
  const router = useRouter();

  return (
    <View style={{ marginHorizontal: 10 }}>
      <View
        style={{
          paddingHorizontal: 20,
          marginBottom: 8,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left */}
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Text
              style={{
                fontSize: FontSize["2xl"],
                fontFamily: Fonts.bold,
                color: "#0F172A",
                letterSpacing: -0.7,
              }}
            >
              Quick Actions
            </Text>
            <Ionicons name="sparkles" size={22} color={Colors.black} />
          </View>

          <Text
            style={{
              fontSize: FontSize["sm"],
              color: "#64748B",
              fontFamily: Fonts.medium,
              lineHeight: 20,
            }}
          >
            Access most-used services instantly
          </Text>
        </View>
      </View>
      <FlatList
        data={QuickActionButton}
        horizontal={true}
        renderItem={({ item }) => (
          <View
            style={{
              width: width * 0.44,
              height: height * 0.25,
              margin: 10,
            }}
          >
            {/* Back Card 2 */}
            <View
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                right: -2,
                bottom: -2,
                borderRadius: 28,
                backgroundColor: item.color + "40",
                transform: [{ rotate: "6deg" }],
              }}
            />

            {/* Back Card 1 */}
            <View
              style={{
                position: "absolute",
                top: 8,
                left: 8,
                right: -1,
                bottom: -1,
                borderRadius: 28,
                backgroundColor: item.color + "18",
                transform: [{ rotate: "4deg" }],
              }}
            />
            <Pressable
              onPress={() => router.navigate("/demo")}
              style={{
                flex: 1,
                borderRadius: 28,
                overflow: "hidden",

                shadowColor: item.color,
                shadowOpacity: 0.18,
                shadowRadius: 18,
                shadowOffset: {
                  width: 0,
                  height: 10,
                },
                elevation: 10,
              }}
            >
              <LinearGradient
                colors={["#FFFFFF", "#F8FBFF"]}
                style={{
                  flex: 1,
                  borderRadius: 28,
                  padding: 18,
                  borderWidth: 1,
                  borderColor: "#EDF2F7",
                }}
              >
                {/* Decorative Glow */}
                <View
                  style={{
                    position: "absolute",
                    right: -30,
                    top: -30,
                    width: 120,
                    height: 120,
                    borderRadius: 60,
                    backgroundColor: item.color + "12",
                  }}
                />

                {/* Header */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <LinearGradient
                    colors={[item.backgroundColor, item.color]}
                    style={{
                      width: 58,
                      height: 58,
                      borderRadius: 18,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons name={item.icon} size={28} color="#FFF" />
                  </LinearGradient>

                  <View
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 19,
                      backgroundColor: "#F3F7FA",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons name="arrow-forward" size={18} color="#94A3B8" />
                  </View>
                </View>

                <View style={{ flex: 1, marginTop: 10 }} />

                {/* Title */}
                <Text
                  numberOfLines={2}
                  style={{
                    fontFamily: Fonts.bold,
                    fontSize: 18,
                    color: "#0F172A",
                    lineHeight: 24,
                    // width: "50%",
                  }}
                >
                  {item.title}
                </Text>

                {/* Subtitle */}
                <Text
                  numberOfLines={1}
                  style={{
                    marginTop: 6,
                    color: "#64748B",
                    fontSize: 13,
                    fontFamily: Fonts.medium,
                  }}
                >
                  Tap to continue
                </Text>

                {/* Bottom Accent */}
                <View
                  style={{
                    marginTop: 16,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 34,
                      height: 5,
                      borderRadius: 20,
                      backgroundColor: item.color,
                    }}
                  />

                  <View
                    style={{
                      flex: 1,
                      height: 1,
                      marginLeft: 8,
                      backgroundColor: "#E5E7EB",
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
};

export default QuickActionContainer;
