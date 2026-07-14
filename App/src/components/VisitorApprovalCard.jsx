import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@react-native-vector-icons/ionicons";

import useDimension from "@/hooks/dimensions";
import Colors from "@/constants/color";
import { Fonts } from "@/constants/font";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

const VisitorApprovalCard = () => {
  const { width } = useDimension();
  const theme = Colors.approvalCard.visitor;

  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { scale: scale.value }],
    opacity: opacity.value,
  }));

  const onApprove = () => {
    scale.value = withTiming(0.96, { duration: 120 });

    translateX.value = withTiming(500, { duration: 350 });

    opacity.value = withTiming(0, { duration: 300 }, () => {
      runOnJS(console.log)("Approved");
      // runOnJS(removeCard)();
    });
  };

  const onReject = () => {
    scale.value = withTiming(0.96, { duration: 120 });

    translateX.value = withTiming(-500, { duration: 350 });

    opacity.value = withTiming(0, { duration: 300 }, () => {
      runOnJS(console.log)("Rejected");
    });
  };

  return (
    <Animated.View style={animatedStyle}>
      <LinearGradient
        colors={theme.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: width,
          alignSelf: "center",
          marginVertical: 20,
          padding: 22,
          borderRadius: 28,
          overflow: "hidden",

          shadowColor: theme.shadow,
          shadowOpacity: 0.35,
          shadowRadius: 18,
          shadowOffset: {
            width: 0,
            height: 10,
          },
          elevation: 10,
        }}
      >
        {/* Decorative Glow */}
        <View
          style={{
            position: "absolute",
            top: -60,
            right: -50,
            width: 180,
            height: 180,
            borderRadius: 90,
            backgroundColor: theme.glowTop,
          }}
        />

        <View
          style={{
            position: "absolute",
            bottom: -70,
            left: -40,
            width: 140,
            height: 140,
            borderRadius: 70,
            backgroundColor: theme.glowBottom,
          }}
        />

        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              style={{
                color: theme.text,
                fontFamily: Fonts.bold,
                fontSize: 24,
              }}
            >
              Visitor Waiting
            </Text>

            <Text
              style={{
                marginTop: 4,
                color: theme.subText,
                fontFamily: Fonts.medium,
                fontSize: 14,
              }}
            >
              Approval required
            </Text>
          </View>

          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(255,255,255,0.12)",
            }}
          >
            <Ionicons name="notifications" size={24} color={theme.iconColor} />
          </View>
        </View>

        {/* Visitor Details */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 24,
          }}
        >
          <View
            style={{
              width: 58,
              height: 58,
              borderRadius: 29,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme.iconBackground,
            }}
          >
            <Ionicons name="person" size={30} color={theme.iconColor} />
          </View>

          <View
            style={{
              flex: 1,
              marginLeft: 14,
            }}
          >
            <Text
              style={{
                color: theme.text,
                fontFamily: Fonts.bold,
                fontSize: 18,
              }}
            >
              Rahul Sharma
            </Text>

            <Text
              style={{
                marginTop: 4,
                color: theme.subText,
                fontFamily: Fonts.medium,
                fontSize: 14,
              }}
            >
              Main Gate • 2 min ago
            </Text>
          </View>

          <Ionicons
            name="chevron-forward-circle"
            size={30}
            color={theme.iconColor}
          />
        </View>

        {/* Action Buttons */}
        <View
          style={{
            flexDirection: "row",
            marginTop: 24,
          }}
        >
          <TouchableOpacity
            onPress={onApprove}
            style={{
              flex: 1,
              height: 52,
              borderRadius: 16,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme.primaryButton,
              marginRight: 10,
            }}
          >
            <Text
              style={{
                color: theme.primaryButtonText,
                fontFamily: Fonts.bold,
                fontSize: 15,
              }}
            >
              Approve
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onReject}
            style={{
              flex: 1,
              height: 52,
              borderRadius: 16,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme.secondaryButton,
              borderWidth: 1,
              borderColor: theme.secondaryBorder,
            }}
          >
            <Text
              style={{
                color: theme.text,
                fontFamily: Fonts.bold,
                fontSize: 15,
              }}
            >
              Reject
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const DeliveryApprovalCard = () => {
  const { width } = useDimension();
  const theme = Colors.approvalCard.delivery;

  return (
    <LinearGradient
      colors={theme.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        width: width,
        alignSelf: "center",
        marginVertical: 20,
        padding: 22,
        borderRadius: 28,
        overflow: "hidden",

        shadowColor: theme.shadow,
        shadowOpacity: 0.35,
        shadowRadius: 18,
        shadowOffset: {
          width: 0,
          height: 10,
        },
        elevation: 10,
      }}
    >
      {/* Decorative Glow */}
      <View
        style={{
          position: "absolute",
          top: -60,
          right: -50,
          width: 180,
          height: 180,
          borderRadius: 90,
          backgroundColor: theme.glowTop,
        }}
      />

      <View
        style={{
          position: "absolute",
          bottom: -70,
          left: -40,
          width: 140,
          height: 140,
          borderRadius: 70,
          backgroundColor: theme.glowBottom,
        }}
      />

      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              color: theme.text,
              fontFamily: Fonts.bold,
              fontSize: 24,
            }}
          >
            Delivery Waiting
          </Text>

          <Text
            style={{
              marginTop: 4,
              color: theme.subText,
              fontFamily: Fonts.medium,
              fontSize: 14,
            }}
          >
            Verify before allowing entry
          </Text>
        </View>

        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.12)",
          }}
        >
          <Ionicons name="cube" size={24} color={theme.iconColor} />
        </View>
      </View>

      {/* Delivery Details */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 24,
        }}
      >
        <View
          style={{
            width: 58,
            height: 58,
            borderRadius: 29,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.iconBackground,
          }}
        >
          <Ionicons name="bicycle" size={30} color={theme.iconColor} />
        </View>

        <View
          style={{
            flex: 1,
            marginLeft: 14,
          }}
        >
          <Text
            style={{
              color: theme.text,
              fontFamily: Fonts.bold,
              fontSize: 18,
            }}
          >
            Blinkit Delivery
          </Text>

          <Text
            style={{
              marginTop: 4,
              color: theme.subText,
              fontFamily: Fonts.medium,
              fontSize: 14,
            }}
          >
            Gate 2 • 1 min ago
          </Text>
        </View>

        <Ionicons
          name="chevron-forward-circle"
          size={30}
          color={theme.iconColor}
        />
      </View>

      {/* Action Buttons */}
      <View
        style={{
          flexDirection: "row",
          marginTop: 24,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            height: 52,
            borderRadius: 16,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.primaryButton,
            marginRight: 10,
          }}
        >
          <Text
            style={{
              color: theme.primaryButtonText,
              fontFamily: Fonts.bold,
              fontSize: 15,
            }}
          >
            Share OTP
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            height: 52,
            borderRadius: 16,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.secondaryButton,
            borderWidth: 1,
            borderColor: theme.secondaryBorder,
          }}
        >
          <Text
            style={{
              color: theme.text,
              fontFamily: Fonts.bold,
              fontSize: 15,
            }}
          >
            Reject
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const HouseHelpApprovalCard = () => {
  const { width } = useDimension();
  const theme = Colors.approvalCard.houseHelp;

  return (
    <LinearGradient
      colors={theme.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        width: width,
        alignSelf: "center",
        marginVertical: 20,
        padding: 22,
        borderRadius: 28,
        overflow: "hidden",

        shadowColor: theme.shadow,
        shadowOpacity: 0.35,
        shadowRadius: 18,
        shadowOffset: {
          width: 0,
          height: 10,
        },
        elevation: 10,
      }}
    >
      {/* Decorative Glow */}
      <View
        style={{
          position: "absolute",
          top: -60,
          right: -50,
          width: 180,
          height: 180,
          borderRadius: 90,
          backgroundColor: theme.glowTop,
        }}
      />

      <View
        style={{
          position: "absolute",
          bottom: -70,
          left: -40,
          width: 140,
          height: 140,
          borderRadius: 70,
          backgroundColor: theme.glowBottom,
        }}
      />

      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              color: theme.text,
              fontFamily: Fonts.bold,
              fontSize: 24,
            }}
          >
            House Help
          </Text>

          <Text
            style={{
              marginTop: 4,
              color: theme.subText,
              fontFamily: Fonts.medium,
              fontSize: 14,
            }}
          >
            Daily staff waiting for entry
          </Text>
        </View>

        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,0.12)",
          }}
        >
          <Ionicons name="home" size={24} color={theme.iconColor} />
        </View>
      </View>

      {/* Staff Details */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 24,
        }}
      >
        <View
          style={{
            width: 58,
            height: 58,
            borderRadius: 29,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.iconBackground,
          }}
        >
          <Ionicons name="person" size={30} color={theme.iconColor} />
        </View>

        <View
          style={{
            flex: 1,
            marginLeft: 14,
          }}
        >
          <Text
            style={{
              color: theme.text,
              fontFamily: Fonts.bold,
              fontSize: 18,
            }}
          >
            Sunita Devi
          </Text>

          <Text
            style={{
              marginTop: 4,
              color: theme.subText,
              fontFamily: Fonts.medium,
              fontSize: 14,
            }}
          >
            Main Gate • 7:58 AM
          </Text>
        </View>

        <Ionicons
          name="chevron-forward-circle"
          size={30}
          color={theme.iconColor}
        />
      </View>

      {/* Action Buttons */}
      <View
        style={{
          flexDirection: "row",
          marginTop: 24,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            height: 52,
            borderRadius: 16,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.primaryButton,
            marginRight: 10,
          }}
        >
          <Text
            style={{
              color: theme.primaryButtonText,
              fontFamily: Fonts.bold,
              fontSize: 15,
            }}
          >
            Allow Entry
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 1,
            height: 52,
            borderRadius: 16,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.secondaryButton,
            borderWidth: 1,
            borderColor: theme.secondaryBorder,
          }}
        >
          <Text
            style={{
              color: theme.text,
              fontFamily: Fonts.bold,
              fontSize: 15,
            }}
          >
            Deny
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const CARD_HEIGHT = 285; // Change according to your card height
const STACK_OFFSET = 15; // Visible part of the next card

const ApprovalCardStack = ({ children }) => {
  const cards = React.Children.toArray(children).slice(0, 3);

  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 40,
        elevation: 5,
        height: CARD_HEIGHT + (cards.length - 1) * STACK_OFFSET + 20,
      }}
    >
      {cards.map((card, index) => (
        <View
          key={index}
          style={{
            position: "absolute",
            left: 20,
            right: 20,
            top: index * STACK_OFFSET,
            zIndex: cards.length - index,
          }}
        >
          {card}
        </View>
      ))}
    </View>
  );
};

export {
  DeliveryApprovalCard,
  VisitorApprovalCard,
  HouseHelpApprovalCard,
  ApprovalCardStack,
};
