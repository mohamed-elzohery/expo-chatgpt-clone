import {
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  StyleSheet,
  Image,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { defaultStyles } from "@/constants/Styles";
import { Redirect, Stack, useLocalSearchParams, useRouter } from "expo-router";
import HeaderDropDown from "@/components/HeaderDropdown";
import MessageInput from "@/components/MessageInput";
import MessageIdeas from "@/components/MessageIdeas";
import ChatMessage from "@/components/ChatMessage";
import { Message, Role } from "@/utils/interfaces/Messages";
import { useMMKVString } from "react-native-mmkv";
import { Storage } from "@/utils/storage";
import { Drawer } from "expo-router/drawer";
import OpenaAi from "react-native-openai";
import { useSQLiteContext } from "expo-sqlite";
import { addChat, addMessage, getMessages } from "@/utils/storage/Database";

const ChatPage: React.FC<{ id: string }> = ({ id }) => {
  const [gptVersion, setGptVersion] = useMMKVString("gptVersion", Storage);
  const [apiKey] = useMMKVString("apiKey", Storage);
  const [organization, setOrganization] = useMMKVString("org", Storage);
  const [height, setHeight] = useState(0);
  const db = useSQLiteContext();

  const [chatId, setChatId] = useState(id);

  const openAI = useMemo(
    () =>
      new OpenaAi({
        apiKey: apiKey || "",
        organization: organization || "",
      }),
    []
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const onGptVersionChange = (version: string) => {
    setGptVersion(version);
  };

  useEffect(() => {
    if (id) {
      getMessages(db, parseInt(id)).then((res) => {
        setMessages(res);
      });
    }
  }, [id]);

  useEffect(() => {
    const handleNewMessage = (payload: any) => {
      setMessages((messages) => {
        const newMessage = payload.choices[0]?.delta.content;
        if (newMessage) {
          console.log("old messages", messages);
          messages[messages.length - 1].content += newMessage;
          return [...messages];
        }
        if (payload.choices[0]?.finishReason) {
          addMessage(db, parseInt(chatId), {
            content: messages[messages.length - 1].content,
            role: Role.Bot,
          });
        }
        return messages;
      });
    };

    openAI.chat.addListener("onChatMessageReceived", handleNewMessage);

    return () => {
      openAI.chat.removeListener("onChatMessageReceived");
    };
  }, [openAI, chatId]);

  if (!apiKey || !organization) {
    return <Redirect href="/(auth)/(modal)/settings" />;
  }

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height);
  };
  const getCompletions = (message: string) => {
    if (messages.length === 0) {
      addChat(db, message).then((res) => {
        const chatID = res.lastInsertRowId;
        setChatId(chatID.toString());
        addMessage(db, parseInt(chatId), { content: message, role: Role.User });
      });
      setMessages([
        { content: message, role: Role.User },
        { content: "", role: Role.Bot },
      ]);
    } else {
      addMessage(db, parseInt(chatId), {
        content: message,
        role: Role.User,
      });
      setMessages((prev) => [
        ...prev,
        { content: message, role: Role.User },
        { content: "", role: Role.Bot },
      ]);
    }
    openAI.chat.stream({
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      model: gptVersion === "3.5" ? "gpt-3.5-turbo" : "gpt-3.5-turbo",
    });
  };

  return (
    <View style={defaultStyles.pageContainer}>
      <Drawer.Screen
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

export default ChatPage;
