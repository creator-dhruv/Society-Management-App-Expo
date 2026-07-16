import Colors from "@/constants/color";
import { Fonts } from "@/constants/font";
import Ionicons from "@react-native-vector-icons/ionicons";
import { BlurView } from "expo-blur";
import { Stack, useRouter } from "expo-router";
import { Text, Touchable, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomHeader = ({ route, options }: any) => {
  const { top, right, left } = useSafeAreaInsets();
  const router = useRouter();
  return (
    <View
      style={{
        paddingTop: top,
        paddingRight: right + 10,
        paddingLeft: left + 10,
        flexDirection: "row",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          if (router.canGoBack()) {
            router.back();
          }
        }}
        style={
          {
            //   backgroundColor: Colors.transparent,
          }
        }
      >
        <BlurView
          intensity={85}
          tint="light"
          style={{
            backgroundColor: "#ffffff60",
            width: 50,
            height: 50,
            elevation: 10,
            borderRadius: Colors.radius.pill,
            overflow: "hidden",
            borderWidth: 1.5,
            borderColor: "#9d9a9a3c",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="arrow-back" size={25} />
        </BlurView>
      </TouchableOpacity>
      <View
        style={{
          width: "80%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          //   backgroundColor: "black",
        }}
      >
        <Text
          style={{
            fontFamily: Fonts.bold,
            fontSize: 20,
          }}
        >
          {options.title}
        </Text>
      </View>
    </View>
  );
};

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: Colors.background },
        header: ({ route, options }) => (
          <CustomHeader route={route} options={options} />
        ),
      }}
    >
      <Stack.Screen name="visitors" options={{ title: "Manage Visitors" }} />
      <Stack.Screen name="amenities" options={{ title: "Book Amenities" }} />
      <Stack.Screen name="noticeboard" options={{ title: "Noticeboard" }} />
      <Stack.Screen name="complaint" options={{ title: "Track Complaints" }} />
      <Stack.Screen name="maintenance" options={{ title: "Pay Maintenance" }} />
    </Stack>
  );
}
