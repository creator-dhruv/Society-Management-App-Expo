import { FlatList } from "react-native";
import React from "react";
import VisitorHeaderContainer from "@/components/QuickActions/visitors/VisitorHeaderContainer";
import VisitorListCard from "@/components/QuickActions/visitors/VisitorListCard";

export const VisitorHistory = [
  {
    id: "1",
    type: "visitor",
    title: "Guest Visit",
    name: "Rahul Sharma",
    status: "Upcoming",
    info: {
      gate: "Main Gate",
      date: "2026-07-17",
      time: "10:42 AM",
    },
  },
  {
    id: "2",
    type: "delivery",
    title: "Blinkit Delivery",
    name: "Amit Kumar",
    status: "Exited",
    info: {
      gate: "Main Gate",
      date: "2026-07-17",
      time: "09:18 AM",
    },
  },
  {
    id: "3",
    type: "cab",
    title: "Uber Pickup",
    name: "Rohit Verma",
    status: "Exited",
    info: {
      gate: "Gate 2",
      date: "2026-07-17",
      time: "08:05 AM",
    },
  },
  {
    id: "4",
    type: "service",
    title: "Electrician Visit",
    name: "Sanjay Mishra",
    status: "Exited",
    info: {
      gate: "Service Gate",
      date: "2026-07-16",
      time: "03:20 PM",
    },
  },
  {
    id: "5",
    type: "delivery",
    title: "Swiggy Delivery",
    name: "Deepak Singh",
    status: "Exited",
    info: {
      gate: "Main Gate",
      date: "2026-07-16",
      time: "01:14 PM",
    },
  },
  {
    id: "6",
    type: "visitor",
    title: "Family Visit",
    name: "Priya Sharma",
    status: "Exited",
    info: {
      gate: "Main Gate",
      date: "2026-07-16",
      time: "11:45 AM",
    },
  },
  {
    id: "7",
    type: "courier",
    title: "Blue Dart Parcel",
    name: "Vikas Jain",
    status: "Exited",
    info: {
      gate: "Main Gate",
      date: "2026-07-15",
      time: "05:18 PM",
    },
  },
  {
    id: "8",
    type: "service",
    title: "Plumber Visit",
    name: "Ankit Gupta",
    status: "Exited",
    info: {
      gate: "Service Gate",
      date: "2026-07-15",
      time: "10:00 AM",
    },
  },
  {
    id: "9",
    type: "delivery",
    title: "Amazon Delivery",
    name: "Rakesh Yadav",
    status: "Exited",
    info: {
      gate: "Main Gate",
      date: "2026-07-14",
      time: "04:35 PM",
    },
  },
  {
    id: "10",
    type: "visitor",
    title: "Friend Visit",
    name: "Neha Arora",
    status: "Upcoming",
    info: {
      gate: "Gate 1",
      date: "2026-07-14",
      time: "07:10 PM",
    },
  },
  {
    id: "11",
    type: "cab",
    title: "Ola Drop-off",
    name: "Suresh Patel",
    status: "Inside",
    info: {
      gate: "Gate 2",
      date: "2026-07-13",
      time: "06:55 PM",
    },
  },
  {
    id: "12",
    type: "service",
    title: "AC Technician",
    name: "Vivek Chauhan",
    status: "Exited",
    info: {
      gate: "Service Gate",
      date: "2026-07-13",
      time: "11:20 AM",
    },
  },
];

const visitors = () => {
  return (
    <FlatList
      ListHeaderComponent={<VisitorHeaderContainer />}
      data={VisitorHistory}
      renderItem={(item) => <VisitorListCard item={item.item} />}
    />
  );
};

export default visitors;
