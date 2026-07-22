import { ScrollView, View } from "react-native";
import React from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import ManagementContainer from "@/components/admin/ManagementContainer";
import Colors from "@/constants/color";

const actions = [
  {
    title: "Manage Residents",
    subtitle: "Residents",
    icon: "people-outline",
    route: "/(admin)/resident",
    theme: {
      color: "#3B82F6",
      backgroundColor: "#60A5FA",
    },
  },
  {
    title: "Manage Vehicles",
    subtitle: "Parking",
    icon: "car-sport-outline",
    route: "/(admin)/vehicle",
    theme: {
      color: "#d25cf6",
      backgroundColor: "#d98bfa",
    },
  },
  {
    title: "Manage Events",
    subtitle: "Society Events",
    icon: "ribbon-outline",
    route: "/(admin)/payment",
    theme: {
      color: "#10b9b9",
      backgroundColor: "#34cbd3",
    },
  },
  {
    title: "Manage Notices",
    subtitle: "Announcements",
    icon: "notifications-outline",
    route: "/(admin)/notice",
    theme: {
      color: "#F59E0B",
      backgroundColor: "#FBBF24",
    },
  },
  {
    title: "Manage Amenities",
    subtitle: "Facilities",
    icon: "fitness-outline",
    route: "/(admin)/amenity",
    theme: {
      color: "#8B5CF6",
      backgroundColor: "#A78BFA",
    },
  },
  {
    title: "Manage Payments",
    subtitle: "Maintenance",
    icon: "card-outline",
    route: "/(admin)/payment",
    theme: {
      color: "#10B981",
      backgroundColor: "#34D399",
    },
  },
];
const index = () => {
  return (
    <ScrollView>
      <AdminHeader
        divData={[
          {
            icon: "people",
            data: 1002,
            title: "Residents",
            color: Colors.success,
          },
          {
            icon: "business",
            data: 10,
            title: "Towers",
            color: Colors.blue[400],
          },
        ]}
      />

      <ManagementContainer
        item={actions}
        title="Quick Action"
        subTitle="Access most-used services instantly"
      />
    </ScrollView>
  );
};

export default index;
