import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import { useState } from "react";
import { Alert } from "react-native";

interface AuthParams {
    emailAddress: string,
    password: string
}

const useAuthActions = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { signUp, isLoaded: signUpLoaded, setActive: signupSetActive } = useSignUp();

  const [loading, setLoading] = useState(false);

  const handleSignInPress: (authData: AuthParams) => void = async (authData) => {
    if (!isLoaded) {
      return;
    };
    const {emailAddress, password} = authData; 
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      Alert.alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpPress : (authData: AuthParams) => void = async (authData) => {
    if (!signUpLoaded) {
      return;
    }
    const {emailAddress, password} = authData; 
    setLoading(true);
    try {
      // Create the user on Clerk
      const result = await signUp.create({
        emailAddress,
        password,
      });
      // This indicates the user is signed in
      signupSetActive({ session: result.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, handleSignInPress, handleSignUpPress }
}

export default useAuthActions;