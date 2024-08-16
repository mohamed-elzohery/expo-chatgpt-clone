import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { defaultStyles } from "@/constants/Styles";
import { Stack } from "expo-router";
import HeaderDropDown from "@/components/HeaderDropdown";
import MessageInput from "@/components/MessageInput";
import { ScrollView } from "react-native-gesture-handler";
import MessageIdeas from "@/components/MessageIdeas";

const index = () => {
  const { signOut } = useAuth();
  const [gptVersion, setGptVersion] = useState("");
  const [messages, setMessages] = useState<[]>([]);
  const onGptVersionChange = (version: string) => {
    setGptVersion(version);
  };
  const getCompletions = (message: string) => {
    console.log(message);
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
          justifyContent: "center",
        }}
        onTouchStart={() => Keyboard.dismiss()}
      ></View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        keyboardVerticalOffset={60}
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
        }}
      >
        <MessageIdeas onSelectMessage={getCompletions} />
        <MessageInput onShouldSendMessage={getCompletions} />
      </KeyboardAvoidingView>
    </View>
  );
};

export default index;
