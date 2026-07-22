import React, { useState } from "react";
import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import { useRouter } from "expo-router";

import Colors from "@/constants/color";
import { Fonts, FontSize } from "@/constants/font";
import SectionNavCard from "./SectionNavCard";

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
  item: Action[];
  title: string;
  subTitle: string;
};

const ManagementContainer = ({ item, title, subTitle }: Props) => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [action, setAction] = useState(item || []);
  return (
    <View style={styles.container}>
      <View style={styles.headingRow}>
        <Text style={styles.heading}>{title}</Text>

        <Text style={styles.subHeading}>{subTitle}</Text>
      </View>

      <View style={styles.cardSection}>
        {action.map((item) => (
          <SectionNavCard key={item.title} cardHeight={85} item={item} />
        ))}
      </View>
    </View>
  );
};

export default ManagementContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 70,
  },
  headingRow: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 10,
    marginLeft: 6,
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
    marginBottom: 10,
  },

  cardSection: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
});
