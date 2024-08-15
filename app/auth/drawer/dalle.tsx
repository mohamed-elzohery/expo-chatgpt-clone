import { View, Text } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import HeaderDropdown from "@/components/HeaderDropdown";
import { defaultStyles } from "@/constants/Styles";

const Dalle = () => {
  // const [gptVersion, setGptVersion] = useState("");
  // const onGptVersionChange = (version: string) => {
  //   setGptVersion(version);
  // };
  return (
    <View style={defaultStyles.pageContainer}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <HeaderDropdown
              title="Dall·E"
              items={[
                {
                  key: "share",
                  title: "Share GPT",
                  icon: "square.and.arrow.up",
                },
                { key: "details", title: "See Details", icon: "info.circle" },
                { key: "keep", title: "Keep in Sidebar", icon: "pin" },
              ]}
              onSelect={() => {}}
            />
          ),
        }}
      />
    </View>
  );
};

export default Dalle;
