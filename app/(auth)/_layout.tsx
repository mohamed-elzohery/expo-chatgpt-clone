import { View, Text } from "react-native";
import React from "react";
import { Slot, Stack, useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const _layout = () => {
  const router = useRouter();
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
