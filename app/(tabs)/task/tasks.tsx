import { deleteTask, getTasks, Task } from "@/lib/database";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const loadTasks = () => {
    try {
      const data = getTasks();
      setTasks(data);
    } catch (error) {
      Alert.alert("Load Error", "Failed to load tasks");
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, []),
  );

  const handleDelete = (id: number) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            try {
              deleteTask(id);
              loadTasks();
            } catch (error) {
              Alert.alert("Delete Error", "Failed to delete task");
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Notes</Text>
      </View>

      <View style={styles.content}>
        {tasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No Tasks yet.</Text>
          </View>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text style={styles.taskCategory}>{item.category}</Text>
                <Text style={styles.taskDescription}>{item.description}</Text>
                <Text style={styles.taskStatus}>{item.status}</Text>

                <View style={styles.actions}>
                  <Pressable
                    style={styles.detailButton}
                    onPress={() =>
                      router.push({
                        pathname: "/(tabs)/task/detail",
                        params: {
                          id: item.id,
                          title: item.title,
                          description: item.description,
                          category: item.category,
                          status: item.status,
                        },
                      })
                    }
                  >
                    <Text style={styles.detailButtonText}>View</Text>
                  </Pressable>

                  <Pressable
                    style={styles.editButton}
                    onPress={() =>
                      router.push({
                        pathname: "/(tabs)/task/edit",
                        params: {
                          id: item.id,
                          title: item.title,
                          description: item.description,
                          category: item.category,
                          status: item.status,
                        },
                      })
                    }
                  >
                    <Text style={styles.editButtonText}>Edit</Text>
                  </Pressable>

                  <Pressable
                    style={styles.deleteButton}
                    onPress={() => handleDelete(item.id)}
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </Pressable>
                </View>
              </View>
            )}
          />
        )}
      </View>

      <View style={styles.bottomButtonContainer}>
        <Pressable
          style={styles.addButton}
          onPress={() => router.push("/(tabs)/task/add-task")}
        >
          <Text style={styles.addButtonText}>+ Add Task</Text>
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
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    color: "#000",
  },
  content: {
    flex: 1,
  },
  card: {
    backgroundColor: "#ededed",
    borderWidth: 1,
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
  bottomButtonContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
  },
  addButton: {
    backgroundColor: "#4A90E2",
    padding: 16,
    borderRadius: 6,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  taskCategory: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  taskDescription: {
    fontSize: 14,
    color: "#444",
    marginBottom: 6,
  },
  taskStatus: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  detailButton: {
    flex: 1,
    backgroundColor: "#1565c0",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  detailButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  editButton: {
    flex: 1,
    backgroundColor: "#F39C12",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#c01515",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
});
