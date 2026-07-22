import { ScrollView } from "react-native";
import React from "react";

import AdminHeader from "@/components/admin/AdminHeader";
import ManagementContainer from "@/components/admin/ManagementContainer";
import Colors from "@/constants/color";

const actions = [
  {
    title: "Manage Complaints",
    subtitle: "View & update tickets",
    icon: "clipboard-outline",
    route: "/(admin)/helpdesk/complaints",
    theme: {
      color: "#3B82F6",
      backgroundColor: "#60A5FA",
    },
  },
  {
    title: "Resolved Tickets",
    subtitle: "Completed requests",
    icon: "checkmark-done-outline",
    route: "/(admin)/helpdesk/resolved",
    theme: {
      color: "#10B981",
      backgroundColor: "#34D399",
    },
  },
  {
    title: "Pending Tickets",
    subtitle: "Awaiting resolution",
    icon: "time-outline",
    route: "/(admin)/helpdesk/pending",
    theme: {
      color: "#F59E0B",
      backgroundColor: "#FBBF24",
    },
  },
  {
    title: "Reports & Analytics",
    subtitle: "Performance insights",
    icon: "bar-chart-outline",
    route: "/(admin)/helpdesk/reports",
    theme: {
      color: "#EF4444",
      backgroundColor: "#F87171",
    },
  },
];

const HelpDesk = () => {
  return (
    <ScrollView>
      <AdminHeader
        divData={[
          {
            icon: "alert-circle",
            data: 24,
            title: "Open Issues",
            color: Colors.notification.emergency,
          },
          {
            icon: "checkmark-circle",
            data: 186,
            title: "Resolved",
            color: Colors.success,
          },
        ]}
      />

      <ManagementContainer
        item={actions}
        title="Helpdesk Management"
        subTitle="Track, assign and resolve resident complaints"
      />
    </ScrollView>
  );
};

export default HelpDesk;
