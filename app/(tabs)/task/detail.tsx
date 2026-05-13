import { deleteTask } from "@/lib/database";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export default function TaskDetailScreen() {
  const { id, title, description, category, status } = useLocalSearchParams<{
    id: string;
    title: string;
    description: string;
    category: string;
    status: string;
  }>();

  const handleDelete = () => {
    Alert.alert(
      "Delete Task",
      `Are you sure you want to delete "${title}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            try {
              deleteTask(Number(id));
              router.replace("/task/tasks");
            } catch (error) {
              Alert.alert("Error", "Failed to delete task");
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {category && (
        <View style={styles.field}>
          <Text style={styles.label}>Category</Text>
          <Text style={styles.value}>{category}</Text>
        </View>
      )}

      <View style={styles.field}>
        <Text style={styles.label}>Status</Text>
        <Text style={styles.value}>{status}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>
        </Text>
      </View>

      <Pressable
        style={styles.editButton}
        onPress={() =>
          router.push({
            pathname: "/task/edit",
            params: { id, title, description, category, status },
          })
        }
      >
        <Text style={styles.editButtonText}>Edit Task</Text>
      </Pressable>

      <Pressable style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Delete Task</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 24,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    color: "#111",
  },
  editButton: {
    backgroundColor: "#4A90E2",
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  editButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  deleteButton: {
    backgroundColor: "#ff0a0a",
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  deleteButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "600",
  },
});

