import ChatPage from "@/components/ChatPage";
import { useLocalSearchParams } from "expo-router";

const Chat = () => {
  const { id } = useLocalSearchParams();
  return <ChatPage id={id as string} />;
};

export default Chat;
