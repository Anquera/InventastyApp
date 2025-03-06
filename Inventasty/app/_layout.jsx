import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)/signin" />
            <Stack.Screen name="(auth)/signup" />
            <Stack.Screen name="(tabs)" /> {/* Use (tabs) to route to the tab layout */}
        </Stack>
    );
}
