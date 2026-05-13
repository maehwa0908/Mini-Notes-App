import { Stack } from "expo-router";
import { useEffect } from "react";
import { initDatabase } from "@/lib/database";

export default function StackLayout() {
  useEffect(() => {
    initDatabase();
  }, []);

  return(
    <Stack screenOptions={{ headerShown: false }}/>
  );
}
