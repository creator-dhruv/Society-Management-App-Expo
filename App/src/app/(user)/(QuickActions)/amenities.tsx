import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import SocietyContactsContainer from "@/components/QuickActions/amenities/SocietyContactsContainer";
import AmenitiesContainer from "@/components/QuickActions/amenities/AmenitiesContainer";
import HouseHelpContactsContainer from "@/components/QuickActions/amenities/HouseHelpContactsContainer";
import { Colors } from "@/constants/color";

const amenities = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SocietyContactsContainer />
      <View style={styles.contentSurface}>
        <AmenitiesContainer />
        <HouseHelpContactsContainer />
      </View>
    </ScrollView>
  );
};

export default amenities;

const styles = StyleSheet.create({
  contentSurface: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 16,
    paddingTop: 20,
  },
  eventsSurface: {
    marginTop: 12,
    paddingTop: 20,
    paddingBottom: 120,
  },
});
