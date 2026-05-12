import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

//Todo: Test this function
export default function TabsLayout() {
  return(
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#4A90E2',
      tabBarStyle: {
        paddingBottom: 6,
        height: 60,
      }
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
          )
        }}
      />

      <Tabs.Screen
        name="task"
        options={{
          title: "Notes",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "list" : "list-outline"} size={size} color={color} />
          )
        }}
      />
    </Tabs>
  )
}