import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { defaultStyles } from "@/constants/Styles";
import { Stack } from "expo-router";
import HeaderDropDown from "@/components/HeaderDropdown";

const index = () => {
  const { signOut } = useAuth();
  const [gptVersion, setGptVersion] = useState("");
  const onGptVersionChange = (version: string) => {
    setGptVersion(version);
  };

  return (
    <View style={defaultStyles.pageContainer}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <HeaderDropDown
              title="ChatGPT"
              items={[
                { key: "3.5", title: "GPT-3.5", icon: "bolt" },
                { key: "4", title: "GPT-4", icon: "sparkles" },
              ]}
              onSelect={onGptVersionChange}
              selected={gptVersion}
            />
          ),
        }}
      />
      <TouchableOpacity
        style={{ flex: 1, justifyContent: "center" }}
        onPress={() => signOut()}
      >
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default index;
