import { updateTask } from "@/lib/database";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
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

export default function EditTaskScreen() {
  const params = useLocalSearchParams<{
    id: string;
    title: string;
    description: string;
    category: string;
    status: string;
  }>();

  const [title, setTitle] = useState(params.title || "");
  const [description, setDescription] = useState(params.description || "");
  const [category, setCategory] = useState(params.category || "");
  const [status, setStatus] = useState(params.status || "Pending");

  const handleUpdate = async () => {
    try {
      if (!title.trim()) {
        throw new Error("Task title is required");
      }
      await updateTask(Number(params.id), title, description, category, status);
      Alert.alert("Success", "Task updated successfully.");
      router.replace("/task/tasks");
    } catch (error) {
      Alert.alert(
        "Update Error",
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Edit Task</Text>
      </View>


  
      <ScrollView style={styles.content} contentContainerStyle={styles.formContent}>
          <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter task title"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter category"
          value={category}
          onChangeText={setCategory}
        />

        <Text style={styles.label}>Description</Text>
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
        <Pressable style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Update Task</Text>
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
    marginBottom: 5,
    color: "#000",
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
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
    color: "#000",
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