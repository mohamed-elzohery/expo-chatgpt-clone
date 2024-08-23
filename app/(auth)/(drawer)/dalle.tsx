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
import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { defaultStyles } from "@/constants/Styles";
import { Redirect, Stack, useRouter } from "expo-router";
import HeaderDropDown from "@/components/HeaderDropdown";
import MessageInput from "@/components/MessageInput";
import { ScrollView } from "react-native-gesture-handler";
import MessageIdeas from "@/components/MessageIdeas";
import ChatMessage from "@/components/ChatMessage";
import { Message, Role } from "@/utils/interfaces/Messages";
import { useMMKVString } from "react-native-mmkv";
import { Storage } from "@/utils/storage";
import { Drawer } from "expo-router/drawer";
import OpenaAi from "react-native-openai";
import Colors from "@/constants/Colors";

const index = () => {
  const [height, setHeight] = useState(0);
  const [key, setKey] = useMMKVString("apikey", Storage);
  const [organization, setOrganization] = useMMKVString("org", Storage);
  const [messages, setMessages] = useState<Message[]>([]);
  const [working, setWorking] = useState(false);

  const [apiKey] = useMMKVString("apiKey", Storage);
  const openAI = useMemo(
    () =>
      new OpenaAi({
        apiKey: apiKey || "",
        organization: organization || "",
      }),
    []
  );

  if (!apiKey || !organization) {
    return <Redirect href="/(auth)/(modal)/settings" />;
  }

  const onLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height);
  };
  const getCompletion = async (text: string) => {
    setWorking(true);
    setMessages([...messages, { role: Role.User, content: text }]);

    const result = await openAI.image.create({
      prompt: text,
    });
    if (result.data && result.data.length > 0) {
      const imageUrl = result.data[0].url;
      setMessages((prev) => [
        ...prev,
        { role: Role.Bot, content: "", imageUrl, prompt: text },
      ]);
    }
    setWorking(false);
  };

  return (
    <View style={defaultStyles.pageContainer}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <HeaderDropDown
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
      <View style={styles.page} onLayout={onLayout}>
        {messages.length == 0 && (
          <View
            style={[
              { marginTop: height / 2 - 60, alignItems: "center", gap: 16 },
            ]}
          >
            <View style={styles.logoContainer}>
              <Image
                source={require("@/assets/images/dalle.png")}
                style={styles.image}
              />
            </View>
            <Text style={styles.label}>
              Let me turn your imagination into imagery.
            </Text>
          </View>
        )}
        <FlashList
          data={messages}
          renderItem={({ item }) => <ChatMessage {...item} />}
          estimatedItemSize={400}
          contentContainerStyle={{ paddingTop: 30, paddingBottom: 150 }}
          keyboardDismissMode="interactive"
          ListFooterComponent={
            <>
              {working && (
                <ChatMessage
                  {...{ role: Role.Bot, content: "", loading: true }}
                />
              )}
            </>
          }
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        keyboardVerticalOffset={60}
      >
        <MessageInput onShouldSendMessage={getCompletion} />
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  logoContainer: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 80,
    borderRadius: 50,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.greyLight,
  },
  image: {
    resizeMode: "cover",
  },
  page: {
    flex: 1,
  },
  label: {
    color: Colors.grey,
    fontSize: 16,
  },
});

export default index;
