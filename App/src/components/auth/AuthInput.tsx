import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  useWindowDimensions,
  View,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

import Colors from "@/constants/color";
import { Fonts, FontSize } from "@/constants/font";

interface AuthInputProps extends TextInputProps {
  label: string;
  icon?: any;
  error?: string;
}

export default function AuthInput({
  label,
  icon,
  error,
  style,
  ...props
}: AuthInputProps) {
  const [focused, setFocused] = useState(false);
  const { width } = useWindowDimensions();

  return (
    <View style={[styles.wrapper, { width: width * 0.85 }]}>
      <Text style={styles.label}>{label}</Text>

      <View
        style={[
          styles.inputContainer,
          focused && styles.inputFocused,
          error && styles.inputError,
        ]}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={focused ? Colors.primary : Colors.text.tertiary}
            style={styles.icon}
          />
        )}

        <TextInput
          {...props}
          style={[styles.input, style]}
          placeholderTextColor={Colors.text.placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },

  label: {
    marginBottom: Colors.spacing.sm,
    fontFamily: Fonts.semibold,
    fontSize: FontSize.sm,
    color: Colors.text.primary,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,

    borderRadius: Colors.radius.md,

    paddingHorizontal: Colors.spacing.lg,
    height: 56,

    ...Colors.shadowStyle.card,
  },

  inputFocused: {
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
  },

  inputError: {
    borderColor: Colors.error,
  },

  icon: {
    marginRight: 12,
  },

  input: {
    flex: 1,
    color: Colors.text.primary,
    fontFamily: Fonts.regular,
    fontSize: FontSize.md,
    paddingVertical: 0,
  },

  errorText: {
    marginTop: 6,
    color: Colors.error,
    fontFamily: Fonts.regular,
    fontSize: FontSize.xs,
  },
});
