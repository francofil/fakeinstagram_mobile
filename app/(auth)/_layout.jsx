import { Stack } from "expo-router";
import { useState } from "react";

export default function RootLayout() {
    return (
        <Stack >
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
        </Stack>
    );
}
