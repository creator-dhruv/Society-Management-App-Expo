import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import useDimension from "@/hooks/dimensions";
import Colors from "@/constants/color";
import { Fonts, FontSize } from "@/constants/font";
import { useRouter } from "expo-router";

const Header = () => {
  const navigate = useRouter();
  const { width } = useDimension();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: width,
        justifyContent: "space-between",
      }}
    >
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "center",
          marginLeft: 10,
          gap: 5,
        }}
      >
        <Ionicons name="location-outline" size={50} />
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: Colors.text.muted,
              fontFamily: Fonts.semibold,
              fontSize: FontSize["sm"],
            }}
          >
            Your Location
          </Text>
          <View
            style={{
              flexDirection: "row",
              gap: 4,
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                color: Colors.text.primary,
                fontFamily: Fonts.bold,
                fontSize: FontSize["lg"],
                width: width * 0.5,
              }}
            >
              Gokuldham Society
            </Text>
            <Ionicons
              name="chevron-down"
              size={20}
              color={Colors.text.primary}
              style={{ marginTop: 7 }}
            />
          </View>
        </View>
      </Pressable>
      <Pressable
        onPress={() => navigate.push("/demo")}
        style={{
          backgroundColor: "black",
          width: 50,
          height: 50,
          borderRadius: 30,
          elevation: 20,
        }}
      >
        <Image
          source={require("@/assets/image.png")}
          style={{
            width: 50,
            height: 50,
            borderRadius: 30,
            borderWidth: 0.5,
          }}
        />
        {/* <Image
            source={{
              uri: "https://www.magnific.com/free-photo/closeup-young-female-professional-making-eye-contact-against-colored-background_27507695.htm#fromView=keyword&page=1&position=1&uuid=562f1d40-188e-487d-9caf-21d4dce323be&query=Profile",
            }}
            style={{ width: 50, height: 10 }}
          /> */}
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
