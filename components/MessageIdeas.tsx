import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";

const PredefinedMessages = [
  { title: "Explain React Native", text: "like I'm five years old" },
  {
    title: "Suggest fun activites",
    text: "for a family visting San Francisco",
  },
  { title: "Recommend a dish", text: "to impress a date who's a picky eater" },
];

interface MessageIdeasProps {
  onSelectMessage: (text: string) => void;
}

const MessageIdeas: React.FC<MessageIdeasProps> = ({ onSelectMessage }) => {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingVertical: 10,
          gap: 16,
        }}
      >
        {PredefinedMessages.map((message) => (
          <TouchableOpacity
            key={message.title}
            style={styles.card}
            onPress={() => onSelectMessage(`${message.title}: ${message.text}`)}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              {message.title}
            </Text>
            <Text style={{ fontSize: 14, color: Colors.grey }}>
              {message.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: 14,
    backgroundColor: Colors.input,
  },
});

export default MessageIdeas;
