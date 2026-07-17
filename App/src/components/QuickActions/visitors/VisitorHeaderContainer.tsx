import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@react-native-vector-icons/ionicons";
import Colors from "@/constants/color";
import { useRouter } from "expo-router";

const VisitorHeaderCard = () => {
  const router = useRouter();
  return (
    <View style={styles.wrapper}>
      {/* Background Gradient */}
      <LinearGradient
        colors={["#6DBBFF", "#3B9DFF", "#1E7CF8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Decorative Blobs */}

        <View style={styles.circle1} />
        <View style={styles.circle2} />

        {/* Header */}

        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Visitor Management</Text>

            <Text style={styles.subtitle}>
              Faster approvals for your society
            </Text>
          </View>

          <View style={styles.qr}>
            <Ionicons name="qr-code-outline" size={24} color="#fff" />
          </View>
        </View>

        {/* Search */}

        <View style={styles.search}>
          <Ionicons name="search-outline" size={20} color="#00000086" />

          <TextInput
            placeholder="Search visitor..."
            placeholderTextColor="#5f6165cb"
            // value={search}
            // onChangeText={setSearch}
            style={styles.input}
          />

          <Ionicons name="mic-outline" size={20} color="#64748B" />
        </View>

        {/* Button */}

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push("/(user)/(tabs)/approval")}
        >
          <LinearGradient
            colors={["#ffffff37", "#ffffff31"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <View style={styles.sparkle}>
              <Ionicons name="sparkles" size={18} color="#fff" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.buttonTitle}>Add Pre-Approval</Text>

              <Text style={styles.buttonSubtitle}>Create secure QR access</Text>
            </View>

            <View style={styles.arrow}>
              <Ionicons name="arrow-forward" size={18} color="#2388FF" />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default VisitorHeaderCard;

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  gradient: {
    padding: 22,
    borderRadius: 28,
    overflow: "hidden",
    ...Colors.shadowStyle.card,
  },

  card: {
    borderRadius: 30,
    padding: 22,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.35)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.65)",
  },

  circle1: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 120,
    backgroundColor: "#5caef09e",
    top: -80,
    right: -70,
  },

  circle2: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 900,
    backgroundColor: "#5caef09e",
    bottom: -40,
    left: -40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#ffffff",
  },

  subtitle: {
    marginTop: 5,
    color: "#f9f9f9",
    fontSize: 14,
  },

  qr: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#accfeb80",
    justifyContent: "center",
    alignItems: "center",
  },

  search: {
    marginTop: 22,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#ffffffe3",
    borderWidth: 1,
    borderColor: "#ffffffa6",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  input: {
    flex: 1,
    marginHorizontal: 12,
    color: "#0F172A",
    fontSize: 15,
  },

  stats: {
    flexDirection: "row",
    marginTop: 20,
    gap: 14,
  },

  stat: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.45)",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginBottom: 12,
  },

  number: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0F172A",
  },

  label: {
    marginTop: 4,
    color: "#64748B",
    fontSize: 13,
  },

  button: {
    marginTop: 22,
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    // elevation: 6,
    borderWidth: 1,
    borderColor: "#ffffff88",
  },

  sparkle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#ffffff49",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  buttonTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },

  buttonSubtitle: {
    color: "rgba(255,255,255,0.85)",
    marginTop: 2,
    fontSize: 13,
  },

  arrow: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
