import { Stack } from "expo-router";

export default function TaskLayout() {
    return(
        <Stack 
        screenOptions={{
            headerStyle: { 
                backgroundColor: '#f0f4ff'  
             },
             headerTintColor: '#000',
             headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 20,
             }
        }}
        >
            <Stack.Screen name="tasks" options={{ title: "Notes List" }} />

            <Stack.Screen name="add-task" options={{ title: "Add Task" }} />

            <Stack.Screen name="detail" options={{ title: "Details List" }} />

            <Stack.Screen name="edit" options={{ title: "Edit Task" }} />

        </Stack>
    )
}