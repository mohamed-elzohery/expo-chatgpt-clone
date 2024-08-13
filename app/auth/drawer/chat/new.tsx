import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { TouchableHighlight } from "react-native-gesture-handler";
import { defaultStyles } from "@/constants/Styles";
import { Stack } from "expo-router";
import HeaderDropdown from "@/components/HeaderDropdown";

const index = () => {
  const { signOut } = useAuth();
  return (
    <View style={defaultStyles.pageContainer}>
      <TouchableOpacity
        style={{ flex: 1, justifyContent: "center" }}
        onPress={() => signOut()}
      >
        <Stack.Screen
          options={{
            headerTitle: () => <HeaderDropdown />,
          }}
        />
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default index;
