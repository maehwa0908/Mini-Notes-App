import { addTask } from "@/lib/database";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const statusOptions = ["Pending", "Ongoing", "Finished"];

export default function AddTaskScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Pending");

  const handleSave = async () => {
    try {
      if (!title.trim()) {
        throw new Error("Task title is required");
      }
      addTask(title, description, category, status);
      Alert.alert("Success", `Task created successfully.`);
      router.back();
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>New Task</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.formContent}>
        <TextInput
          style={styles.input}
          placeholder="Enter task title"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={styles.input}
          placeholder="Enter category"
          value={category}
          onChangeText={setCategory}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter task description"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Text style={styles.label}>Select Status</Text>
        <View style={styles.statusContainer}>
          {statusOptions.map((option) => (
            <Pressable
              key={option}
              style={[
                styles.statusButton,
                status === option && styles.statusButtonActive,
              ]}
              onPress={() => setStatus(option)}
            >
              <Text
                style={[
                  styles.statusButtonText,
                  status === option && styles.statusButtonTextActive,
                ]}
              >
                {option}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomButtonContainer}>
        <Pressable style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Create Task</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 0,
  },
  content: {
    flex: 1,
  },
  formContent: {
    padding: 20,
    paddingBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  statusContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
    flexWrap: "wrap",
  },
  statusButton: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  statusButtonActive: {
    backgroundColor: "#ffa600",
    borderColor: "#ffa600",
  },
  statusButtonText: {
    color: "#111",
    fontWeight: "600",
  },
  statusButtonTextActive: {
    color: "#fff",
  },
  bottomButtonContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  button: {
    backgroundColor: "#4A90E2",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

