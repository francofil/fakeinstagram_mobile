import { Stack } from "expo-router";
import { useState } from "react";

export default function RootLayout() {
    return (
        // Usar tabs ?
        <Stack >
            <Stack.Screen name="feed" options={{ headerShown: false }} />
        </Stack>
    );
}
