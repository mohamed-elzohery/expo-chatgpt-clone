import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import React, { FC, useCallback, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { BlurView } from "expo-blur";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import debounce from "@/utils/performance/debounce";

export interface MessageInputProps {
  onShouldSendMessage: (message: string) => void;
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const MessageInput: FC<MessageInputProps> = ({ onShouldSendMessage }) => {
  const { bottom } = useSafeAreaInsets();
  const expanded = useSharedValue(0);
  const [message, setMessage] = useState("");
  const expandItems = () => {
    expanded.value = withTiming(1, { duration: 400 });
  };

  const collapseItems = () => {
    expanded.value = withTiming(0, { duration: 400 });
  };

  const expandBtnStyle = useAnimatedStyle(() => {
    const widthInterpolation = interpolate(
      expanded.value,
      [0, 1],
      [0, 100],
      Extrapolation.CLAMP
    );
    return {
      width: widthInterpolation,
      opacity: expanded.value,
    };
  });
  const collapsedBtnStyle = useAnimatedStyle(() => {
    const opacityInterpolation = interpolate(
      expanded.value,
      [0, 1],
      [1, 0],
      Extrapolation.CLAMP
    );
    const widthInterpolation = interpolate(
      expanded.value,
      [0, 1],
      [30, 0],
      Extrapolation.CLAMP
    );

    return {
      opacity: opacityInterpolation,
      width: widthInterpolation,
    };
  });

  const handleOnChange = useCallback((text: string) => {
    collapseItems();
    if (expanded.value === 1) setTimeout(() => setMessage(text), 400);
    else setMessage(text);
  }, []);
  const onSend = () => {
    onShouldSendMessage(message);
    setMessage("");
  };
  return (
    <BlurView
      experimentalBlurMethod={"dimezisBlurView"}
      tint="extraLight"
      intensity={90}
    >
      <View style={[styles.row, { paddingBottom: bottom + 10 }]}>
        <AnimatedTouchableOpacity
          onPress={expandItems}
          style={[styles.roundedBtn, collapsedBtnStyle]}
        >
          <Ionicons name="add" color={Colors.grey} size={24} />
        </AnimatedTouchableOpacity>
        <Animated.View style={[styles.btnsContainer, expandBtnStyle]}>
          <TouchableOpacity onPress={() => ImagePicker.launchCameraAsync()}>
            <Ionicons name="camera-outline" size={24} color={Colors.grey} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => ImagePicker.launchImageLibraryAsync()}
          >
            <Ionicons name="image-outline" size={24} color={Colors.grey} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => DocumentPicker.getDocumentAsync()}>
            <Ionicons name="folder-outline" size={24} color={Colors.grey} />
          </TouchableOpacity>
        </Animated.View>
        <TextInput
          autoFocus
          placeholder="Message"
          style={styles.messageInput}
          multiline
          onFocus={collapseItems}
          value={message}
          onChangeText={handleOnChange}
          defaultValue=""
          maxLength={500}
        />
        {message.length > 0 ? (
          <TouchableOpacity onPress={onSend}>
            <Ionicons
              name="arrow-up-circle-outline"
              size={24}
              color={Colors.grey}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <FontAwesome5 name="headphones" size={24} color={Colors.grey} />
          </TouchableOpacity>
        )}
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  roundedBtn: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.input,
    borderRadius: 30,
  },
  messageInput: {
    backgroundColor: Colors.light,
    padding: 10,
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 20,
    marginHorizontal: 10,
    borderColor: Colors.greyLight,
  },
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
});

export default MessageInput;
