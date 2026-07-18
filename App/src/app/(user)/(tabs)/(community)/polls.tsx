import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import TopTabContainer from "@/components/tabs/community/TopTabContainer";

const polls = () => {
  return (
    <View style={{ flex: 1 }}>
      <TopTabContainer />
      <ScrollView
        contentContainerStyle={{
          paddingTop: 90, // leave space for the floating tab
          paddingBottom: 30,
        }}
      >
        {/* Your content */}
      </ScrollView>
    </View>
  );
};

export default polls;

const styles = StyleSheet.create({});
