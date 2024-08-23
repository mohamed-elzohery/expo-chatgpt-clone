import { View, Text } from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";
import Colors from "@/constants/Colors";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: Colors.selected },
      }}
    >
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modal)/settings"
        options={{
          headerTitle: "Settings",
          presentation: "modal",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.selected },
        }}
      />
    </Stack>
  );
};

export default _layout;
