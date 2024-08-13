import { View, Text } from "react-native";
import React from "react";
import { Slot, Stack } from "expo-router";
import Colors from "@/constants/Colors";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: Colors.selected },
      }}
    >
      <Stack.Screen name="drawer" options={{ headerShown: false }} />
      {/* <Stack.Screen name="modal/purchase" options={{ headerShown: false }} /> */}
    </Stack>
  );
};

export default _layout;
