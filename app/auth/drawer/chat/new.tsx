import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  StyleSheet,
  Image,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { defaultStyles } from "@/constants/Styles";
import { Stack } from "expo-router";
import HeaderDropDown from "@/components/HeaderDropdown";
import MessageInput from "@/components/MessageInput";
import { ScrollView } from "react-native-gesture-handler";
import MessageIdeas from "@/components/MessageIdeas";
import ChatMessage from "@/components/ChatMessage";
import { Message, Role } from "@/utils/interfaces/Messages";

const Dummy_Messages: Message[] = [
  {
    content: "m est dolor optio obcaecati explicabo alias voluptate ad?",
    role: Role.User,
  },
  {
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde itaque excepturi dolorum est dolor optio obcaecati explicabo alias voluptate ad?, Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde itaque excepturi dolorum est dolor optio obcaecati explicabo alias voluptate ad?",
    role: Role.Bot,
  },
  {
    content: "m est dolor optio obcaecati explicabo alias voluptate ad?",
    role: Role.User,
  },
  {
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde itaque excepturi dolorum est dolor optio obcaecati explicabo alias voluptate ad?, Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde itaque excepturi dolorum est dolor optio obcaecati explicabo alias voluptate ad?",
    role: Role.Bot,
  },
  {
    content: "m est dolor optio obcaecati explicabo alias voluptate ad?",
    role: Role.User,
  },
  {
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde itaque excepturi dolorum est dolor optio obcaecati explicabo alias voluptate ad?, Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde itaque excepturi dolorum est dolor optio obcaecati explicabo alias voluptate ad?",
    role: Role.Bot,
  },
  {
    content: "m est dolor optio obcaecati explicabo alias voluptate ad?",
    role: Role.User,
  },
  {
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde itaque excepturi dolorum est dolor optio obcaecati explicabo alias voluptate ad?, Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde itaque excepturi dolorum est dolor optio obcaecati explicabo alias voluptate ad?",
    role: Role.Bot,
  },
  {
    content: "m est dolor optio obcaecati explicabo alias voluptate ad?",
    role: Role.User,
  },
  {
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde itaque excepturi dolorum est dolor optio obcaecati explicabo alias voluptate ad?, Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde itaque excepturi dolorum est dolor optio obcaecati explicabo alias voluptate ad?",
    role: Role.Bot,
  },
];

const index = () => {
  const { signOut } = useAuth();
  const [gptVersion, setGptVersion] = useState("");
  const [height, setHeight] = useState(0);

  const [messages, setMessages] = useState<Message[]>(Dummy_Messages);
  const onGptVersionChange = (version: string) => {
    setGptVersion(version);
  };
  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    console.log(height);
    setHeight(height);
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

      <View style={styles.page} onLayout={onLayout}>
        {messages.length == 0 && (
          <View style={[styles.logoContainer, { marginTop: height / 2 - 15 }]}>
            <Image
              source={require("@/assets/images/logo-white.png")}
              style={styles.image}
            />
          </View>
        )}
        <FlashList
          data={messages}
          renderItem={({ item }) => <ChatMessage {...item} />}
          estimatedItemSize={400}
          contentContainerStyle={{ paddingTop: 30, paddingBottom: 150 }}
          keyboardDismissMode="interactive"
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        keyboardVerticalOffset={60}
        // style={{
        //   position: "absolute",
        //   left: 0,
        //   bottom: 0,
        //   width: "100%",
        // }}
      >
        <MessageIdeas onSelectMessage={getCompletions} />
        <MessageInput onShouldSendMessage={getCompletions} />
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  logoContainer: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    backgroundColor: "#000",
    borderRadius: 50,
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: "cover",
  },
  page: {
    flex: 1,
  },
});

export default index;
