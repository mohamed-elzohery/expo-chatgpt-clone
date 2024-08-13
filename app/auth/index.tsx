import { View, Text, Button } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";

const index = () => {
  const { signOut } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Button title="Sign out" onPress={() => signOut()} />
    </View>
  );
};

export default index;
