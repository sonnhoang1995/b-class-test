import { Stack } from "expo-router"

export default function UsersLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerTitle: "Users" }} />
            <Stack.Screen
                name="[id]"
                options={{ headerTitle: "User Detail" }}
            />
        </Stack>
    )
}
