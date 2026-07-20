import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import React from "react";

const AuthError = (error: { error: string }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={[styles.errorBox, { width: width * 0.85 }]}>
      <Text style={{ textAlign: "center", fontSize: 14 }} numberOfLines={2}>
        {error.error}
      </Text>
    </View>
  );
};

export default AuthError;

const styles = StyleSheet.create({
  errorBox: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    textAlign: "center",
    backgroundColor: "#ee20201b",
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: "red",
  },
});
