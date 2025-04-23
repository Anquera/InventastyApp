import React, { useState, useEffect } from "react";
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { getChatHistory, sendUserMessage } from "../services/dietBotService";

const DietChatBotScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadMessages = async () => {
      const history = await getChatHistory();
      setMessages(history);
    };
    loadMessages();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const userMsg = input;
    setInput("");

    setMessages(prev => [...prev, { sender: "user", message: userMsg }]);
    const botReply = await sendUserMessage(userMsg);
    setMessages(prev => [...prev, { sender: "user", message: userMsg }, { sender: "Vita", message: botReply }]);

    setLoading(false);
  };

  const renderItem = ({ item }) => (
    <View style={[styles.bubble, item.sender === "user" ? styles.userBubble : styles.botBubble]}>
      <Text style={styles.message}>{item.message}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <FlatList data={messages} renderItem={renderItem} keyExtractor={(_, index) => index.toString()} />
      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Ask about nutrition, diets, or fitness..."
          style={styles.input}
        />
        <TouchableOpacity onPress={handleSend} disabled={loading} style={styles.sendButton}>
          <Text style={styles.sendText}>{loading ? "..." : "Send"}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  bubble: { marginVertical: 6, padding: 12, borderRadius: 10, maxWidth: "80%" },
  userBubble: { alignSelf: "flex-end", backgroundColor: "#d0f0c0" },
  botBubble: { alignSelf: "flex-start", backgroundColor: "#f0f0f0" },
  message: { fontSize: 16 },
  inputContainer: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  input: { flex: 1, padding: 10, borderColor: "#ccc", borderWidth: 1, borderRadius: 20 },
  sendButton: { marginLeft: 10, backgroundColor: "#4CAF50", padding: 10, borderRadius: 20 },
  sendText: { color: "#fff" },
});

export default DietChatBotScreen;
