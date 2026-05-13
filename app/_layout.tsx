import { Stack } from "expo-router";
import { useEffect } from "react";
import { initDatabase } from "@/lib/database";

export default function StackLayout() {
  useEffect(() => {
    initDatabase().catch((error) => {
      console.error("Failed to initialize database:", error);
    });
  }, []);

  return(
    <Stack screenOptions={{ headerShown: false }}/>
  );
}
