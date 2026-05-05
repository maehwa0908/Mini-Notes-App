import { initDatabase } from "@/lib/database";
import { router } from "expo-router";
import { useEffect } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  useEffect(() => {
    try {
      initDatabase();
    } catch (error) {
      Alert.alert("Database Error", "Failed to initialize database");
    }
  }, []);

  return (
    <View style={styles.container}>
       <View>
                <Text style={styles.title}>Notes App</Text>
                </View>
        <Pressable style={styles.button} onPress={() => router.push("/tasks")}>
          <Text style={styles.buttonText}>Go to Notes</Text>
        </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4ff",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 38,
    fontWeight: "600",
    color: "#1e1b4b",
    letterSpacing: -1,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#3c70ff",
    paddingVertical: 10,
    width: "35%",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
