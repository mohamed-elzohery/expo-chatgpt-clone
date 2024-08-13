import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { TouchableHighlight } from "react-native-gesture-handler";

const index = () => {
  const { signOut } = useAuth();
  return (
    <TouchableOpacity
      style={{ flex: 1, justifyContent: "center" }}
      onPress={() => signOut()}
    >
      <Text>Sign Out</Text>
    </TouchableOpacity>
  );
};

export default index;
