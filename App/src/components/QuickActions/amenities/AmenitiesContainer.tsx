import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "@/constants/color";
import { Fonts, FontSize } from "@/constants/font";
import useDimension from "@/hooks/dimensions";

const AMENITIES = [
  {
    id: "gym",
    title: "Gym",
    subtitle: "Open from 10 AM to 10 PM",
    icon: "barbell",
    color: Colors.primary,
  },
  {
    id: "pool",
    title: "Swimming Pool",
    subtitle: "Open from 10 AM to 8 PM",
    icon: "water",
    color: Colors.info,
  },
  {
    id: "basketball",
    title: "Basketball Court",
    subtitle: "Book a time slot",
    icon: "basketball",
    color: Colors.warning,
  },
  {
    id: "badminton",
    title: "Badminton Court",
    subtitle: "2 courts available",
    icon: "tennisball",
    color: Colors.success,
  },
  {
    id: "clubhouse",
    title: "Clubhouse",
    subtitle: "Available today",
    icon: "business",
    color: Colors.notification.delivery,
  },
];

const ELECTRIC_COLORS = [
  "#0066ff",
  "#ff0055",
  "#00ff66",
  "#ffcc00",
  "#cc00ff",
  "#ff5500",
  "#00f0ff",
  "#ff00aa",
  "#70ff00",
  "#3300ff",
];

const getColor = (index: number) =>
  ELECTRIC_COLORS[Math.abs(index) % ELECTRIC_COLORS.length];

export default function AmenitiesContainer() {
  const { width, height } = useDimension();

  const cardWidth = width - 120;
  const cardHeight = height * 0.32;

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.heading}>Society Amenities</Text>
        <Text style={styles.subHeading}>
          Reserve spaces for your next activity
        </Text>
      </View>

      <FlatList
        horizontal
        data={AMENITIES}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => {
          const color = getColor(index);

          return (
            <View
              style={[
                styles.cardWrapper,
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
                    backgroundColor: color + "32",
                  },
                ]}
              />

              <View
                pointerEvents="none"
                style={[
                  styles.backLayerTwo,
                  {
                    backgroundColor: color + "18",
                  },
                ]}
              />

              <Pressable
                accessibilityRole="button"
                accessibilityLabel={item.title}
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
                        backgroundColor: color + "62",
                      },
                    ]}
                  />

                  <Image
                    source={{
                      uri: "https://cdn.sportsforlife.in/shared/blog-images/22-01-26/862ca9dd-89dc-4d12-bd99-c85944a86666_What_Are_the_Basic_Tennis_rules__1769078532013.png",
                    }}
                    style={styles.image}
                  />

                  <Text numberOfLines={1} style={styles.title}>
                    {item.title}
                  </Text>

                  <Text numberOfLines={1} style={styles.subtitle}>
                    {item.subtitle}
                  </Text>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: color + 90 }]}
                  >
                    <Text
                      style={[
                        styles.buttonText,
                        {
                          color: "#ffffff",
                        },
                      ]}
                    >
                      Book Now
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </Pressable>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    flex: 1,
  },

  heading: {
    fontSize: FontSize["2xl"],
    fontFamily: Fonts.bold,
    color: "#0F172A",
    letterSpacing: -0.7,
  },

  subHeading: {
    fontSize: FontSize.sm,
    color: "#64748B",
    fontFamily: Fonts.medium,
    lineHeight: 20,
  },

  listContent: {
    gap: 20,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },

  cardWrapper: {
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
    transform: [{ rotate: "4deg" }],
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
    borderRadius: 600,
  },

  image: {
    width: "100%",
    aspectRatio: 16 / 9,
    marginBottom: 12,
    borderRadius: 16,
  },

  title: {
    fontFamily: Fonts.bold,
    fontSize: FontSize.lg,
    color: Colors.text.primary,
  },

  subtitle: {
    marginVertical: 6,
    width: "80%",
    color: Colors.text.tertiary,
    fontFamily: Fonts.medium,
    fontSize: FontSize.xs,
  },

  button: {
    width: "100%",
    height: 45,
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    fontFamily: Fonts.bold,
    fontSize: 16,
  },
});
