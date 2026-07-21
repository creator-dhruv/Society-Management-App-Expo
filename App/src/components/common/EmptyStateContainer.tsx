import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, Text, useWindowDimensions } from "react-native";
import Button from "./Button";
import Colors from "@/constants/color";
import { Fonts } from "@/constants/font";

const EmptyStateContainer = ({
  title,
  subTitle,
  buttonTitle,
}: {
  title: string;
  subTitle: string;
  buttonTitle?: string;
}) => {
  const { width } = useWindowDimensions();
  return (
    <LinearGradient
      colors={["#f7f8fa", "#fbfdff"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[emptyStyles.card, { width: width * 0.9 }]}
    >
      <View style={emptyStyles.topGlow} />
      <View style={emptyStyles.bottomGlow} />

      <Text style={emptyStyles.title}>{title}</Text>

      <Text style={emptyStyles.subtitle}>{subTitle}</Text>

      {buttonTitle && (
        <Button
          title={buttonTitle}
          icon="notifications-outline"
          direction="left"
          marginVertical={30}
          w={0.72}
        />
      )}
    </LinearGradient>
  );
};

export default EmptyStateContainer;

const emptyStyles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 28,
    padding: 28,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    ...Colors.shadowStyle.card,
  },

  topGlow: {
    position: "absolute",
    top: -70,
    right: -50,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(59,157,255,.08)",
  },

  bottomGlow: {
    position: "absolute",
    bottom: -60,
    left: -40,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(109,187,255,.10)",
  },

  title: {
    marginTop: 24,
    color: Colors.text.primary,
    fontSize: 24,
    fontFamily: Fonts.bold,
  },

  subtitle: {
    marginTop: 10,
    textAlign: "center",
    fontFamily: Fonts.medium,
    color: Colors.text.secondary,
    lineHeight: 22,
  },

  iconContainer: {
    marginTop: 6,
    marginBottom: 6,
  },

  iconGradient: {
    width: 88,
    height: 88,
    borderRadius: 44,

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#1E7CF8",
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 8,
  },
});
