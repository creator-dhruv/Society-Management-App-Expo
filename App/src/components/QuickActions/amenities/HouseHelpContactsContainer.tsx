import React from "react";
import {
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

import Colors from "@/constants/color";
import { Fonts, FontSize } from "@/constants/font";
import Button from "@/components/common/Button";

const HOUSE_HELP = [
  {
    id: "sunita",
    name: "Sunita Devi",
    role: "House cleaning",
    phone: "+919876543221",
    photo: require("@/assets/image.png"),
  },
  {
    id: "ramesh",
    name: "Ramesh Kumar",
    role: "Cook",
    phone: "+919876543222",
    photo: require("@/assets/image.png"),
  },
  {
    id: "meena",
    name: "Meena Sharma",
    role: "Child care",
    phone: "+919876543223",
    photo: require("@/assets/image.png"),
  },
];

export default function HouseHelpContactsContainer() {
  const { width } = useWindowDimensions();
  return (
    <View style={{ marginVertical: 24 }}>
      <View
        style={{
          paddingHorizontal: 20,
          flex: 1,
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
          Service Providers
        </Text>

        <Text
          style={{
            fontSize: FontSize["sm"],
            color: "#64748B",
            fontFamily: Fonts.medium,
            lineHeight: 20,
          }}
        >
          Connect with trusted Service Providers
        </Text>
      </View>
      <FlatList
        horizontal
        data={HOUSE_HELP}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 12,
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 12,
        }}
        renderItem={({ item }) => (
          <View
            style={{
              width: width * 0.5,
              alignItems: "center",
              padding: 16,
              borderRadius: 30,
              backgroundColor: Colors.surface,
              borderWidth: 1,
              borderColor: Colors.divider,
              ...Colors.shadowStyle.card,
            }}
          >
            <Image
              source={{
                uri: "https://img.magnific.com/free-photo/smiling-housekeeping-worker-standing-with-bedclothes-linen-cart_171337-12727.jpg?t=st=1784226971~exp=1784230571~hmac=282878deebf5e5cd01e4a3eb1504ddf2ba104573ddd63a537635b90a361de12d&w=1480",
              }}
              style={{
                width: 76,
                height: 76,
                borderRadius: 38,
                backgroundColor: Colors.surfaceTertiary,
              }}
            />
            <View
              style={{
                position: "absolute",
                top: 76,
                right: 42,
                width: 22,
                height: 22,
                borderRadius: 11,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Colors.success,
                borderWidth: 2,
                borderColor: Colors.surface,
              }}
            >
              <Ionicons name="checkmark" size={12} color={Colors.text.white} />
            </View>
            <Text
              style={{
                color: Colors.text.primary,
                fontFamily: Fonts.bold,
                fontSize: FontSize.md,
                marginTop: 12,
              }}
              numberOfLines={1}
            >
              {item.name}
            </Text>
            <Text
              style={{
                color: Colors.text.tertiary,
                fontFamily: Fonts.medium,
                fontSize: FontSize.xs,
              }}
              numberOfLines={1}
            >
              {item.role}
            </Text>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              <Button
                title="Call now"
                icon="call"
                direction="left"
                w={0.4}
                marginVertical={0}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}
