import { ScrollView } from "react-native";
import React from "react";

import AdminHeader from "@/components/admin/AdminHeader";
import ManagementContainer from "@/components/admin/ManagementContainer";
import Colors from "@/constants/color";

const actions = [
  {
    title: "Manage Guards",
    subtitle: "Security staff",
    icon: "shield-checkmark-outline",
    route: "/(admin)/staff/guards",
    theme: {
      color: "#3B82F6",
      backgroundColor: "#60A5FA",
    },
  },
  {
    title: "Manage Maids",
    subtitle: "Housekeeping",
    icon: "home-outline",
    route: "/(admin)/staff/maids",
    theme: {
      color: "#10B981",
      backgroundColor: "#34D399",
    },
  },
  {
    title: "Service Staff",
    subtitle: "Electrician & Plumber",
    icon: "construct-outline",
    route: "/(admin)/staff/service",
    theme: {
      color: "#F59E0B",
      backgroundColor: "#FBBF24",
    },
  },
  {
    title: "Facility Staff",
    subtitle: "Cleaning & Maintenance",
    icon: "build-outline",
    route: "/(admin)/staff/facility",
    theme: {
      color: "#8B5CF6",
      backgroundColor: "#A78BFA",
    },
  },
  {
    title: "Duty Roster",
    subtitle: "Shifts & schedules",
    icon: "calendar-outline",
    route: "/(admin)/staff/roster",
    theme: {
      color: "#EF4444",
      backgroundColor: "#F87171",
    },
  },
];
const Staff = () => {
  return (
    <ScrollView>
      <AdminHeader
        divData={[
          {
            icon: "people",
            data: 27,
            title: "Guards",
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
        title="Staff Management"
        subTitle="Manage security, maids and service staff"
      />
    </ScrollView>
  );
};

export default Staff;
