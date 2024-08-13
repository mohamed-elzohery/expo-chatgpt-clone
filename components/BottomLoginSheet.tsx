import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BottomLoginSheet = () => {
  const { bottom } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      <TouchableOpacity style={[defaultStyles.btn, styles.lightBtn]}>
        <Ionicons name="logo-apple" size={14} style={styles.iconBtn} />
        <Text style={styles.btnLightText}>Continue with Apple</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[defaultStyles.btn, styles.darkBtn]}>
        <Ionicons
          name="logo-google"
          size={14}
          style={styles.iconBtn}
          color={"#FFF"}
        />
        <Text style={styles.btnDarkText}>Continue with Google</Text>
      </TouchableOpacity>
      <Link
        href={{
          pathname: "/login",
          params: { type: "register" },
        }}
        asChild
        style={[defaultStyles.btn, styles.darkBtn, { alignItems: "center" }]}
      >
        <TouchableOpacity>
          <Ionicons
            name="mail"
            size={14}
            style={styles.iconBtn}
            color={"#FFF"}
          />
          <Text style={styles.btnDarkText}>Continue with email</Text>
        </TouchableOpacity>
      </Link>
      <Link
        href={{
          pathname: "/login",
          params: { type: "login" },
        }}
        style={[defaultStyles.btn, styles.darkBtn]}
        asChild
      >
        <TouchableOpacity>
          <Text style={styles.btnDarkText}>Log In</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#000",
    padding: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: 15,
  },
  lightBtn: {
    backgroundColor: "#FFF",
  },
  darkBtn: {
    backgroundColor: Colors.grey,
  },
  iconBtn: {
    paddingRight: 7,
  },
  btnLightText: {
    fontSize: 20,
  },
  btnDarkText: {
    fontSize: 20,
    color: "#FFF",
  },
  btnOutline: {
    borderWidth: 3,
    borderColor: Colors.grey,
  },
});

export default BottomLoginSheet;
