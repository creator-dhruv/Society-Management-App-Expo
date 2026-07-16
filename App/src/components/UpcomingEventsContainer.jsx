import { Text, View, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import useDimension from "@/hooks/dimensions";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@react-native-vector-icons/ionicons";

import Color from "@/constants/color";
import { Fonts, FontSize } from "@/constants/font";

export const UpcomingEvents = [
  {
    id: "evt-001",
    title: "Independence Day Flag Hoisting",
    description:
      "Celebrate Independence Day with the national flag hoisting ceremony followed by breakfast.",
    category: "Festival",
    date: "2026-08-15",
    startTime: "08:00 AM",
    endTime: "10:00 AM",
    location: "Society Central Park",
    isPaid: false,
    fee: 0,
    maxAttendees: 150,
    currentRegistrations: 42,
    organizer: "Cultural Committee",
    contactNumber: "+91-9876543210",
    bannerUrl: "",
    registrationRequired: false,
  },

  {
    id: "evt-002",
    title: "Monsoon Cricket Tournament",
    description:
      "Friendly cricket tournament between society blocks with exciting prizes.",
    category: "Sports",
    date: "2026-08-18",
    startTime: "07:30 AM",
    endTime: "12:30 PM",
    location: "Society Sports Ground",
    isPaid: true,
    fee: 200,
    maxAttendees: 80,
    currentRegistrations: 61,
    organizer: "Sports Committee",
    contactNumber: "+91-9876543211",
    bannerUrl: "",
    registrationRequired: true,
  },

  {
    id: "evt-003",
    title: "AI & Productivity Workshop",
    description:
      "Learn how AI tools can improve productivity in work and everyday life.",
    category: "Workshop",
    date: "2026-08-21",
    startTime: "04:00 PM",
    endTime: "06:30 PM",
    location: "Community Hall",
    isPaid: true,
    fee: 499,
    maxAttendees: 60,
    currentRegistrations: 44,
    organizer: "Tech Club",
    contactNumber: "+91-9876543212",
    bannerUrl: "",
    registrationRequired: true,
  },

  {
    id: "evt-004",
    title: "Free Health Checkup Camp",
    description:
      "Blood pressure, sugar testing, BMI analysis and physician consultation.",
    category: "Health & Wellness",
    date: "2026-08-23",
    startTime: "09:00 AM",
    endTime: "01:00 PM",
    location: "Clubhouse Hall A",
    isPaid: false,
    fee: 0,
    maxAttendees: 100,
    currentRegistrations: 85,
    organizer: "Management Committee",
    contactNumber: "+91-9876543213",
    bannerUrl: "",
    registrationRequired: true,
  },

  {
    id: "evt-005",
    title: "Janmashtami Cultural Night",
    description:
      "Enjoy dance performances, bhajans, dahi handi competition and food stalls.",
    category: "Cultural",
    date: "2026-08-28",
    startTime: "06:30 PM",
    endTime: "10:30 PM",
    location: "Open Amphitheatre",
    isPaid: false,
    fee: 0,
    maxAttendees: 250,
    currentRegistrations: 173,
    organizer: "Cultural Committee",
    contactNumber: "+91-9876543214",
    bannerUrl: "",
    registrationRequired: false,
  },

  {
    id: "evt-006",
    title: "Monthly General Body Meeting",
    description:
      "Discussion on maintenance budget, security updates and resident concerns.",
    category: "Meeting",
    date: "2026-08-30",
    startTime: "11:00 AM",
    endTime: "01:00 PM",
    location: "Clubhouse Terrace",
    isPaid: false,
    fee: 0,
    maxAttendees: 50,
    currentRegistrations: 18,
    organizer: "RWA",
    contactNumber: "+91-9876543215",
    bannerUrl: "",
    registrationRequired: false,
  },

  {
    id: "evt-007",
    title: "Yoga & Meditation Session",
    description:
      "Morning yoga session with certified instructors for all age groups.",
    category: "Health & Wellness",
    date: "2026-09-02",
    startTime: "06:30 AM",
    endTime: "08:00 AM",
    location: "Central Lawn",
    isPaid: false,
    fee: 0,
    maxAttendees: 120,
    currentRegistrations: 72,
    organizer: "Wellness Club",
    contactNumber: "+91-9876543216",
    bannerUrl: "",
    registrationRequired: false,
  },

  {
    id: "evt-008",
    title: "Badminton Championship",
    description:
      "Singles and doubles badminton tournament with exciting cash prizes.",
    category: "Sports",
    date: "2026-09-05",
    startTime: "08:00 AM",
    endTime: "06:00 PM",
    location: "Indoor Sports Arena",
    isPaid: true,
    fee: 300,
    maxAttendees: 64,
    currentRegistrations: 52,
    organizer: "Sports Club",
    contactNumber: "+91-9876543217",
    bannerUrl: "",
    registrationRequired: true,
  },

  {
    id: "evt-009",
    title: "Photography Masterclass",
    description:
      "Hands-on workshop covering mobile photography, editing and composition.",
    category: "Workshop",
    date: "2026-09-10",
    startTime: "03:00 PM",
    endTime: "06:00 PM",
    location: "Conference Room",
    isPaid: true,
    fee: 599,
    maxAttendees: 40,
    currentRegistrations: 26,
    organizer: "Creative Club",
    contactNumber: "+91-9876543218",
    bannerUrl: "",
    registrationRequired: true,
  },

  {
    id: "evt-010",
    title: "Navratri Garba Night",
    description:
      "Traditional Garba & Dandiya night with live music, food stalls and prizes.",
    category: "Festival",
    date: "2026-09-18",
    startTime: "07:00 PM",
    endTime: "11:30 PM",
    location: "Society Ground",
    isPaid: true,
    fee: 150,
    maxAttendees: 300,
    currentRegistrations: 215,
    organizer: "Festival Committee",
    contactNumber: "+91-9876543219",
    bannerUrl: "",
    registrationRequired: true,
  },
];

const EventCard = ({ event, onPress }) => {
  const { width } = useDimension();
  const cardWidth = Math.min(width - 64, 360);
  const theme = Color.eventCard[event.category] ?? Color.eventCard.Default;
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      accessibilityRole="button"
      accessibilityLabel={`View ${event.title}`}
    >
      <LinearGradient
        colors={theme.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: cardWidth,
          borderRadius: 28,
          overflow: "hidden",
          padding: 22,
          margin: 10,

          ...Color.shadowStyle.card,
        }}
      >
        {/* Background circles */}

        <View
          style={{
            position: "absolute",
            top: -70,
            right: -50,
            width: 180,
            height: 180,
            borderRadius: 90,
            backgroundColor: "#ffffff1f",
          }}
        />

        <View
          style={{
            position: "absolute",
            bottom: -60,
            left: -40,
            width: 130,
            height: 130,
            borderRadius: 65,
            backgroundColor: "#ffffff14",
          }}
        />

        {/* Header */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              backgroundColor: "#ffffff2e",
              paddingHorizontal: 14,
              paddingVertical: 7,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                color: "#FFF",
                fontFamily: Fonts.bold,
              }}
            >
              {event.category}
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#ffffff2e",
              paddingHorizontal: 14,
              paddingVertical: 7,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                color: "#FFF",
                fontFamily: Fonts.bold,
              }}
            >
              {event.isPaid ? `₹${event.fee}` : "FREE"}
            </Text>
          </View>
        </View>

        {/* Title */}

        <Text
          numberOfLines={2}
          style={{
            marginTop: 18,
            color: "#FFF",
            fontFamily: Fonts.bold,
            fontSize: 22,
          }}
        >
          {event.title}
        </Text>

        <Text
          numberOfLines={2}
          style={{
            marginTop: 8,
            color: "rgba(255,255,255,.82)",
            fontFamily: Fonts.medium,
            lineHeight: 22,
          }}
        >
          {event.description}
        </Text>

        {/* Time */}

        <View
          style={{
            marginVertical: 14,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Ionicons name="calendar-outline" color="#FFF" size={18} />

            <Text
              style={{
                color: "#FFF",
                marginLeft: 8,
                fontFamily: Fonts.medium,
              }}
            >
              30 AUG
            </Text>

            <Ionicons
              style={{
                marginLeft: 18,
              }}
              name="time-outline"
              color="#FFF"
              size={18}
            />

            <Text
              style={{
                color: "#FFF",
                marginLeft: 8,
              }}
            >
              {event.startTime}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons name="location-outline" color="#FFF" size={18} />

            <Text
              style={{
                color: "#FFF",
                marginLeft: 8,
              }}
            >
              {event.location}
            </Text>
          </View>
        </View>

        {/* Registration Required */}
        <View
          style={{
            backgroundColor: "#ffffff2e",
            paddingHorizontal: 14,
            paddingVertical: 7,
            borderRadius: 20,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#FFF",
              fontFamily: Fonts.bold,
            }}
          >
            {event.registrationRequired
              ? "Registration Required"
              : "Open for All"}
          </Text>
        </View>

        {/* Ticket Divider */}

        <View
          style={{
            marginVertical: 18,
            height: 1,
            backgroundColor: "rgba(255,255,255,.25)",
          }}
        />

        {/* Ticket Cuts */}

        <View
          style={{
            position: "absolute",
            left: -15,
            bottom: 84,
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: Color.background,
          }}
        />

        <View
          style={{
            position: "absolute",
            right: -15,
            bottom: 84,
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: Color.background,
          }}
        />

        {/* Footer */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: "100%",
              height: 54,
              borderRadius: 27,
              backgroundColor: "#FFF",

              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <Ionicons name="arrow-forward" size={22} color={theme.shadow} /> */}
            <Text
              style={{
                color: theme.chipText,
                fontFamily: Fonts.bold,
                fontSize: 16,
              }}
            >
              Connect to Organizer
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const UpcomingEventsContainer = () => {
  return (
    <View
      style={{
        width: "100%",
        alignSelf: "center",
      }}
    >
      <View
        style={{
          paddingHorizontal: 20,
          marginBottom: 8,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Text
              style={{
                fontSize: FontSize["2xl"],
                fontFamily: Fonts.bold,
                color: "#0F172A",
                letterSpacing: -0.7,
              }}
            >
              Upcoming Events
            </Text>
          </View>

          <Text
            style={{
              fontSize: FontSize["sm"],
              color: "#64748B",
              fontFamily: Fonts.medium,
              lineHeight: 20,
            }}
          >
            Stay connected in your community
          </Text>
        </View>
      </View>
      <FlatList
        data={UpcomingEvents}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
      />
    </View>
  );
};

export default UpcomingEventsContainer;
