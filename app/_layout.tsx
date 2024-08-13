import tokenCache from "@/utils/auth/TokenCache";
import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { router, SplashScreen, Stack } from "expo-router";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { publishableKey } from "../utils/auth/Constants";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useSplashScreen from "@/hooks/useSplashScreen";
import useAuthRouter from "@/hooks/auth/useAuthRouter";

function RootNavigationLayout() {
  const { authDataLoaded } = useAuthRouter();
  if (!authDataLoaded) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="login"
        options={{
          title: "",
          presentation: "modal",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
    </Stack>
  );
}

const RootLayout = () => {
  useSplashScreen();

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RootNavigationLayout />
        </GestureHandlerRootView>
      </ClerkLoaded>
    </ClerkProvider>
  );
};

export default RootLayout;
