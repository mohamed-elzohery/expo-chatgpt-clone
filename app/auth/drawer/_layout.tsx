import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { Link, useNavigation } from "expo-router";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { DrawerActions } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { TextInput } from "react-native-gesture-handler";
import { defaultStyles } from "@/constants/Styles";

const CustomDrawerElement = (props: any) => {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, marginTop: top, marginBottom: bottom }}>
      <View style={styles.header}>
        <View style={styles.searchSection}>
          <Ionicons
            name="search"
            size={16}
            color={Colors.grey}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            underlineColorAndroid={"transparent"}
            placeholder="Search"
          />
        </View>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      {/* Footer */}
      <View>
        <Link href="/auth/modal/settings" asChild push>
          <TouchableOpacity style={styles.footer}>
            <Image
              source={{ uri: "https://galaxies.dev/img/meerkat_2.jpg" }}
              style={styles.avatar}
            />
            <Text style={styles.username}>Mike Merkeet</Text>
            <Ionicons
              name="ellipsis-horizontal"
              size={16}
              color={Colors.greyLight}
            />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const Layout = () => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  return (
    <Drawer
      drawerContent={CustomDrawerElement}
      screenOptions={{
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer)}
          >
            <FontAwesome6
              name="grip-lines"
              color={Colors.grey}
              size={20}
              style={{ marginLeft: 16 }}
            />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: Colors.light,
        },
        drawerActiveBackgroundColor: Colors.selected,
        drawerActiveTintColor: "#000",
        drawerInactiveTintColor: "#000",
        overlayColor: "rgba(0,0,0,0.2)",
        drawerItemStyle: {
          borderRadius: 12,
        },
        drawerLabelStyle: {
          marginLeft: -20,
        },
        drawerStyle: {
          width: width * 0.86,
        },
      }}
    >
      <Drawer.Screen
        name="chat/index"
        options={{
          title: "ChatGPT",
          drawerIcon: () => (
            <View style={[styles.item, { backgroundColor: "#000" }]}>
              <Image
                style={styles.image}
                source={require("../../../assets/images/logo-white.png")}
              />
            </View>
          ),
          headerRight: () => (
            <View>
              <Link href="/auth/drawer/chat/new" push asChild>
                <TouchableOpacity>
                  <Ionicons
                    name="create-outline"
                    size={24}
                    style={{ marginRight: 16 }}
                    color={Colors.grey}
                  />
                </TouchableOpacity>
              </Link>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="dalle"
        options={{
          title: "Dall.E",
          drawerIcon: () => (
            <View style={[styles.item, { backgroundColor: "#000" }]}>
              <Image
                style={styles.image}
                source={require("../../../assets/images/dalle.png")}
              />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="explore"
        options={{
          title: "Explore GPTs",
          drawerIcon: () => (
            <View>
              <Ionicons name="apps-outline" size={18} color={Colors.grey} />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="chat/new/index"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
    </Drawer>
  );
};

const styles = StyleSheet.create({
  item: {
    overflow: "hidden",
    borderRadius: 15,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 16,
    height: 16,
    resizeMode: "cover",
  },
  header: {
    backgroundColor: "#FFF",
    padding: 12,
    paddingBottom: 0,
    marginBottom: -10,
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.input,
    borderRadius: 6,
  },
  searchInput: {
    flex: 1,
    padding: 8,
    paddingLeft: 0,
  },
  searchIcon: {
    padding: 8,
  },
  footer: {
    paddingHorizontal: 16,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  username: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Layout;
