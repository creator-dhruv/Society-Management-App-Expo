import { Text, View, Pressable, Image } from "react-native";
import React from "react";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import useDimension from "@/hooks/dimensions";
import Colors from "@/constants/color";
import { Fonts, FontSize } from "@/constants/font";
import { useRouter } from "expo-router";
import { authService } from "@/services/auth.services";
import { clearAuthSession, getAuthSession } from "@/services/storage";
import { useAuthStore } from "@/store/auth.store";

const Header = () => {
  const navigate = useRouter();
  const { width } = useDimension();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      const keys = await getAuthSession();

      if (keys) {
        console.log(keys.accessToken);
        try {
          await authService.logout(keys);
        } catch (apiErr: any) {
          console.warn(
            "Backend logout failed:",
            apiErr?.response?.data?.message || apiErr.message,
          );
        }
      }
    } catch (err) {
      console.error("Error reading session during logout:", err);
    } finally {
      await clearAuthSession();
      logout();
      navigate.replace("/(auth)/Login");
    }
  };
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 20,
        justifyContent: "space-between",
      }}
    >
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <Ionicons name="location-outline" size={42} color={Colors.icon.dark} />
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: Colors.text.tertiary,
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
        onPress={handleLogout}
        style={{
          backgroundColor: Colors.surface,
          width: 50,
          height: 50,
          borderRadius: 25,
          ...Colors.shadowStyle.card,
        }}
      >
        <Image
          source={require("@/assets/image.png")}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            borderWidth: 0.5,
            borderColor: Colors.border,
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
