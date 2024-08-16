import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { defaultStyles } from "@/constants/Styles";
import { Stack } from "expo-router";
import HeaderDropDown from "@/components/HeaderDropdown";
import MessageInput from "@/components/MessageInput";
import { ScrollView } from "react-native-gesture-handler";

const index = () => {
  const { signOut } = useAuth();
  const [gptVersion, setGptVersion] = useState("");
  const onGptVersionChange = (version: string) => {
    setGptVersion(version);
  };
  const getCompletions = (message: string) => {
    console.log("^");
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

      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
        }}
      >
        {/* <ScrollView>
          {Array(100)
            .fill("")
            .map((item, index) => (
              <Text>Message {index}</Text>
            ))}
        </ScrollView> */}
        {/* <TouchableOpacity onPress={() => signOut()}>
          <Text>Sign Out</Text>
        </TouchableOpacity> */}
      </View>

      <MessageInput onShouldSendMessage={getCompletions} />
    </View>
  );
};

export default index;
