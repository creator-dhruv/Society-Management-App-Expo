import React, { useState } from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

import Colors from "@/constants/color";
import { Fonts, FontSize } from "@/constants/font";

const CONTACTS = [
  {
    name: "Society Secretary",
    role: "Administration & support",
    phone: "+919876543210",
    icon: "person",
    color: Colors.primary,
  },
  {
    name: "Main Gate Guard",
    role: "Security desk",
    phone: "+919876543211",
    icon: "shield-checkmark",
    color: Colors.success,
  },
  {
    name: "Cleaning Staff",
    role: "Housekeeping desk",
    phone: "+919876543212",
    icon: "sparkles",
    color: Colors.notification.delivery,
  },
  {
    name: "Emergency Helpline",
    role: "Available 24/7",
    phone: "+919876543213",
    icon: "alert-circle",
    color: Colors.error,
  },
];

export default function SocietyContactsContainer() {
  const [contacts, setContacts] = useState(CONTACTS);
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <View style={{ gap: 12, marginVertical: 20 }}>
        {contacts.map((contact) => (
          <View
            key={contact.name}
            style={{
              minHeight: 82,
              flexDirection: "row",
              alignItems: "center",
              padding: 12,
              borderRadius: 24,
              backgroundColor: Colors.surface,
              borderWidth: 1,
              borderColor: Colors.divider,
              ...Colors.shadowStyle.card,
            }}
          >
            <View
              style={{
                backgroundColor: contact.color + "18",
                width: 46,
                height: 46,
                borderRadius: 23,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name={contact.icon as any}
                size={22}
                color={contact.color}
              />
            </View>
            <View style={{ flex: 1, marginHorizontal: 12 }}>
              <Text
                style={{
                  color: Colors.text.primary,
                  fontFamily: Fonts.bold,
                  fontSize: FontSize.md,
                }}
              >
                {contact.name}
              </Text>
              <Text
                style={{
                  color: Colors.text.tertiary,
                  fontFamily: Fonts.medium,
                  fontSize: FontSize.xs,
                  marginTop: 3,
                }}
              >
                {contact.role}
              </Text>
            </View>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={`Call ${contact.name}`}
              onPress={() => Linking.openURL(`tel:${contact.phone}`)}
              style={{
                backgroundColor: contact.color,
                minHeight: 40,
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                paddingHorizontal: Colors.spacing.md,
                borderRadius: Colors.radius.pill,
              }}
            >
              <Ionicons name="call" size={15} color={Colors.text.white} />
              <Text
                style={{
                  color: Colors.text.white,
                  fontFamily: Fonts.semibold,
                  fontSize: FontSize.xs,
                }}
              >
                Call now
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}
