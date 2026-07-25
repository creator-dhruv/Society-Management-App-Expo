import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useRouter } from "expo-router";

import Colors from "@/constants/color";
import { Fonts, FontSize } from "@/constants/font";

import CreateInput from "@/components/create/CreateInput";
import Button from "@/components/common/Button";
import Error from "@/components/create/Error";

import { pollService } from "@/services/community.services";
import { useAuthStore } from "@/store/auth.store";
import { useSocietyStore } from "@/store/society.store";

export interface CreatePollForm {
  question: string;
  options: string[];
}

export default function CreatePoll() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { selectedSociety } = useSocietyStore();

  const [form, setForm] = useState<CreatePollForm>({
    question: "",
    options: ["", ""], // Start with 2 default option fields
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Record<string, string>>({});
  const [errorString, setErrorString] = useState("");

  const updateQuestion = (value: string) => {
    setForm((prev) => ({ ...prev, question: value }));
  };

  const updateOption = (index: number, value: string) => {
    setForm((prev) => {
      const updatedOptions = [...prev.options];
      updatedOptions[index] = value;
      return { ...prev, options: updatedOptions };
    });
  };

  const handleAddOption = () => {
    if (form.options.length < 6) {
      setForm((prev) => ({ ...prev, options: [...prev.options, ""] }));
    }
  };

  const handleRemoveOption = (index: number) => {
    if (form.options.length > 2) {
      setForm((prev) => {
        const updatedOptions = prev.options.filter((_, i) => i !== index);
        return { ...prev, options: updatedOptions };
      });
    }
  };

  const handleReset = () => {
    setForm({
      question: "",
      options: ["", ""],
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError({});
      setErrorString("");

      // Front-end validation
      if (!form.question.trim()) {
        setError({ question: "Question is required" });
        return;
      }

      const validOptions = form.options
        .map((opt) => opt.trim())
        .filter((opt) => opt.length > 0);

      if (validOptions.length < 2) {
        setErrorString("Please provide at least 2 valid options.");
        return;
      }

      const payload = {
        societyId: selectedSociety?._id ?? "",
        authorName: user?.name || "Admin",
        question: form.question.trim(),
        options: validOptions,
      };

      const response = await pollService.createPoll(payload);

      if (!response.success) {
        setErrorString(response.message || "Failed to create poll");
        return;
      }

      handleReset();
      router.dismissTo("/(group)/polls");
    } catch (err: any) {
      console.log(err);
      if (typeof err?.response?.data?.message === "object") {
        setError(err?.response?.data?.message);
      } else {
        setErrorString(err?.response?.data?.message || "Failed to create poll");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* SECTION 1: Poll Question */}
      <FormSection
        icon="help-circle-outline"
        title="Poll Question"
        subtitle="Ask a question in community"
      >
        <CreateInput
          label="Question"
          icon="chatbox-ellipses-outline"
          placeholder="Should we host sport event?"
          value={form.question}
          error={error.question}
          onChangeText={updateQuestion}
          multiline
        />
      </FormSection>

      {/* SECTION 2: Poll Options */}
      <FormSection
        icon="list-outline"
        title="Poll Options"
        subtitle="Provide between 2 to 6 choices"
      >
        {form.options.map((option, index) => (
          <View key={index} style={styles.optionRow}>
            <View style={{ flex: 1 }}>
              <CreateInput
                label={`Option ${index + 1}`}
                icon="bulb-outline"
                placeholder={`Option ${index + 1}`}
                value={option}
                error={error[`options.${index}`]}
                onChangeText={(text) => updateOption(index, text)}
              />
            </View>

            {form.options.length > 2 && (
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveOption(index)}
              >
                <Ionicons name="trash-outline" size={20} color={Colors.error} />
              </TouchableOpacity>
            )}
          </View>
        ))}

        {form.options.length < 6 && (
          <TouchableOpacity
            style={styles.addOptionButton}
            onPress={handleAddOption}
            activeOpacity={0.7}
          >
            <Ionicons
              name="add-circle-outline"
              size={20}
              color={Colors.primary}
            />
            <Text style={styles.addOptionText}>Add Option</Text>
          </TouchableOpacity>
        )}
      </FormSection>

      {/* Submit Action */}
      <View style={styles.actionContainer}>
        {errorString ? <Error error={errorString} /> : null}
        <Button title="Create Poll" loading={loading} onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}

const FormSection = ({ icon, title, subtitle, children }: any) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={20} color={Colors.primary} />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionSubtitle}>{subtitle}</Text>
      </View>
    </View>

    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 24,
    backgroundColor: Colors.surface,
  },

  section: {
    width: "90%",
    backgroundColor: Colors.surface,
    borderRadius: 22,
    padding: 20,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: Colors.border,
    elevation: 4,
    shadowColor: Colors.text.muted,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary + "12",
    marginRight: 14,
  },

  sectionTitle: {
    fontFamily: Fonts.bold,
    fontSize: FontSize.lg,
    color: Colors.text.primary,
  },

  sectionSubtitle: {
    marginTop: 3,
    fontFamily: Fonts.regular,
    fontSize: FontSize.sm,
    color: Colors.text.secondary,
  },

  optionRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  removeButton: {
    padding: 10,
    marginTop: 12,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  addOptionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    marginTop: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderStyle: "dashed",
  },

  addOptionText: {
    marginLeft: 6,
    fontFamily: Fonts.medium,
    fontSize: FontSize.md,
    color: Colors.primary,
  },

  actionContainer: {
    width: "90%",
    alignItems: "center",
    marginBottom: 24,
  },
});
