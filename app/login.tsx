import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import useAuthActions from "@/hooks/auth/useAuthActions";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";

const login = () => {
  const { type } = useLocalSearchParams<{ type: "register" | "login" }>();
  const { handleSignInPress, handleSignUpPress, loading } = useAuthActions();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const isRegistering = type === "register";

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={1}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {loading && (
        <View style={[defaultStyles.loadingOverlay]}>
          <ActivityIndicator size={"large"} color={"#FFF"} />
        </View>
      )}
      <Image
        source={require("../assets/images/logo-dark.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>
        {isRegistering ? "Create your account" : "Welcome Back"}
      </Text>
      <View style={{ marginBottom: 30 }}>
        <TextInput
          autoCapitalize="none"
          placeholder="john@apple.com"
          value={emailAddress}
          onChangeText={setEmailAddress}
          style={styles.inputField}
        />
        <TextInput
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.inputField}
        />
      </View>
      {isRegistering ? (
        <TouchableOpacity
          style={[defaultStyles.btn, styles.btnPrimary]}
          onPress={() => handleSignUpPress({ emailAddress, password })}
        >
          <Text style={styles.btnPrimaryText}>Sign Up</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[defaultStyles.btn, styles.btnPrimary]}
          onPress={() => handleSignInPress({ emailAddress, password })}
        >
          <Text style={styles.btnPrimaryText}>Login</Text>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    padding: 20,
  },
  logo: {
    width: 60,
    height: 60,
    alignSelf: "center",
  },
  title: {
    fontSize: 30,
    marginVertical: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 12,
    padding: 10,
    backgroundColor: "#fff",
  },
  btnPrimary: {
    backgroundColor: Colors.primary,
    marginVertical: 4,
  },
  btnPrimaryText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default login;
