import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Storage } from "@/utils/storage";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import { useMMKVString } from "react-native-mmkv";
const Page = () => {
  const [apiKey, setApiKey] = useState("");
  const [org, setOrg] = useState("");
  const { signOut } = useAuth();
  const router = useRouter();
  const [key, setKey] = useMMKVString("apiKey", Storage);
  const [organization, setOrganization] = useMMKVString("org", Storage);

  const saveApiKey = async () => {
    setKey(apiKey);
    setOrganization(org);
    router.replace("/(auth)/(drawer)/chat/new");
  };

  const removeApiKey = async () => {
    setKey("");
    setOrganization("");
  };
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => {
            if (!key) return <View />;
            return (
              <TouchableOpacity
                onPress={() => router.back()}
                style={{
                  backgroundColor: Colors.greyLight,
                  borderRadius: 20,
                  padding: 4,
                }}
              >
                <Ionicons name="close-outline" size={16} color={Colors.grey} />
              </TouchableOpacity>
            );
          },
        }}
      />
      {key && key !== "" && (
        <>
          <Text style={styles.label}>You are all set!</Text>
          <TouchableOpacity
            style={[defaultStyles.btn, { backgroundColor: Colors.primary }]}
            onPress={removeApiKey}
          >
            <Text style={styles.buttonText}>Remove API Key</Text>
          </TouchableOpacity>
        </>
      )}

      {(!key || key === "") && (
        <>
          <Text style={styles.label}>API Key & Organization:</Text>
          <TextInput
            style={styles.input}
            value={apiKey}
            onChangeText={setApiKey}
            placeholder="Enter your API key"
            autoCorrect={false}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            value={org}
            onChangeText={setOrg}
            placeholder="Your organization"
            autoCorrect={false}
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={[defaultStyles.btn, { backgroundColor: Colors.primary }]}
            onPress={saveApiKey}
          >
            <Text style={styles.buttonText}>Save API Key</Text>
          </TouchableOpacity>
        </>
      )}
      <View style={{ marginTop: 9 }}>
        <Button
          title="Sign Out"
          onPress={() => signOut()}
          color={Colors.grey}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});
export default Page;
