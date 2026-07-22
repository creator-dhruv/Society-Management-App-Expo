import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import Colors from "@/constants/color";
import Ionicons from "@react-native-vector-icons/ionicons";
import { Fonts } from "@/constants/font";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

type Action = {
  title: string;
  subtitle: string;
  icon: any;
  route: string;
  theme: {
    color: string;
    backgroundColor: string;
  };
};
type Props = {
  cardHeight: number;
  item: Action;
};

const SectionNavCard = ({ cardHeight, item }: Props) => {
  const { width } = useWindowDimensions();
  const router = useRouter();
  return (
    <View
      key={item.title}
      style={[
        styles.cardContainer,
        {
          height: cardHeight,
        },
      ]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={item.title}
        onPress={() => router.push(item.route as any)}
        style={({ pressed }) => [
          styles.card,
          pressed && {
            transform: [{ scale: 0.97 }],
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
                backgroundColor: item.theme.color + "10",
              },
            ]}
          />

          <View style={styles.topRow}>
            <View
              style={{
                width: width * 0.5,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: 10,
              }}
            >
              <LinearGradient
                colors={[item.theme.backgroundColor, item.theme.color]}
                style={styles.iconContainer}
              >
                <Ionicons
                  name={item.icon as any}
                  size={28}
                  color={Colors.white}
                />
              </LinearGradient>
              <View>
                <Text numberOfLines={1} style={styles.title}>
                  {item.title}
                </Text>

                <Text numberOfLines={1} style={styles.subtitle}>
                  {item.subtitle}
                </Text>
              </View>
            </View>

            <View style={styles.arrowContainer}>
              <Ionicons
                name="arrow-forward"
                size={18}
                color={Colors.text.secondary}
              />
            </View>
          </View>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

export default SectionNavCard;

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 24,
    marginBottom: 25,
    elevation: 5,
    shadowColor: "#2a2a2a22",
    // ...Colors.shadowStyle.card,
  },

  card: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  gradient: {
    flex: 1,
    padding: 18,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: "hidden",
    ...Colors.shadowStyle.card,
  },

  glow: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    top: -45,
    right: -42,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },

  arrowContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 18,
    color: Colors.text.primary,
    fontFamily: Fonts.bold,
    backgroundColor: "white",
  },

  subtitle: {
    fontSize: 13,
    color: Colors.text.secondary,
    fontFamily: Fonts.medium,
  },
});
