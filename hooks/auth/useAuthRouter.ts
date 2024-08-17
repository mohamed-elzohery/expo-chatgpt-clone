import { useAuth } from "@clerk/clerk-expo";
import { useFonts } from "expo-font";
import { SplashScreen, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();


const useAuthRouter = () => {
    const { isLoaded: authDataLoaded, isSignedIn } = useAuth();

    const segments = useSegments();
    const router = useRouter();
    useEffect(() => {
        if (!authDataLoaded) return;
        const inAuthGroup = segments[0] === "(auth)";
        if (isSignedIn && !inAuthGroup) {
        router.replace('/(auth)/(drawer)/chat/new');
        } else if (!isSignedIn) {
        router.replace('/');
        }
    }, [isSignedIn]);
    
    return {authDataLoaded, isSignedIn}
}

export default useAuthRouter;