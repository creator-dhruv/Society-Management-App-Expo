import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

import Colors from "@/constants/color";
import { Fonts, FontSize } from "@/constants/font";
import type { UserRole } from "@/types/auth";
import { ROLE_LABELS } from "@/utils/authRoutes";

const ROLE_OPTIONS: {
  role: UserRole;
  icon: keyof typeof Ionicons.glyphMap;
  description: string;
}[] = [
  {
    role: "user",
    icon: "person-outline",
    description: "Approve guests & manage your flat",
  },
  {
    role: "admin",
    icon: "shield-checkmark-outline",
    description: "Manage society operations",
  },
  {
    role: "guard",
    icon: "key-outline",
    description: "Verify visitors at the gate",
  },
];

interface RoleSelectorProps {
  value: UserRole;
  onChange: (role: UserRole) => void;
}

export default function RoleSelector({ value, onChange }: RoleSelectorProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.list}>
        {ROLE_OPTIONS.map((option) => {
          const selected = value === option.role;

          return (
            <Pressable
              key={option.role}
              onPress={() => onChange(option.role)}
              style={[styles.card, selected ? styles.cardSelected : null]}
            >
              <View
                style={[
                  styles.iconWrap,
                  selected ? styles.iconWrapSelected : null,
                ]}
              >
                <Ionicons
                  name={option.icon as any}
                  size={22}
                  color={selected ? Colors.text.white : Colors.primary}
                />
              </View>

              <View style={styles.content}>
                <Text
                  style={[styles.title, selected ? styles.titleSelected : null]}
                >
                  {ROLE_LABELS[option.role]}
                </Text>
                <Text style={styles.description}>{option.description}</Text>
              </View>

              {selected ? (
                <Ionicons
                  name="checkmark-circle"
                  size={22}
                  color={Colors.primary}
                />
              ) : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: Colors.spacing.lg,
  },
  label: {
    fontFamily: Fonts.medium,
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
    marginBottom: Colors.spacing.sm,
  },
  list: {
    gap: Colors.spacing.sm,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Colors.radius.md,
    padding: Colors.spacing.md,
    ...Colors.shadowStyle.card,
  },
  cardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.blue[50],
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.blue[50],
    alignItems: "center",
    justifyContent: "center",
    marginRight: Colors.spacing.md,
  },
  iconWrapSelected: {
    backgroundColor: Colors.primary,
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: Fonts.semibold,
    fontSize: FontSize.sm,
    color: Colors.text.primary,
  },
  titleSelected: {
    color: Colors.secondary,
  },
  description: {
    marginTop: 2,
    fontFamily: Fonts.regular,
    fontSize: FontSize.xs,
    color: Colors.text.tertiary,
  },
});
