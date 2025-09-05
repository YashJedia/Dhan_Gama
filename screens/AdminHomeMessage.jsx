import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import axios from "axios";
import { useHomeMessage } from "../context/HomeMessageContext";

const AdminHomeMessage = ({ navigation, route }) => {
  const { homeMessage, setHomeMessage } = useHomeMessage();
  const [message, setMessage] = useState(homeMessage);

  const handleSave = () => {
    if (!message.trim()) {
      Alert.alert("Validation", "Message cannot be empty.");
      return;
    }
    setHomeMessage(message);
    Alert.alert("Success", "Message updated successfully.");
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#e0f5ff", justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>Edit Home Page Message</Text>
      <TextInput
        style={{ width: "100%", borderColor: "#219C90", borderWidth: 1, borderRadius: 8, padding: 12, fontSize: 18, backgroundColor: "#fff", marginBottom: 20 }}
        value={message}
        onChangeText={setMessage}
        multiline
        numberOfLines={3}
      />
      <TouchableOpacity
        style={{ backgroundColor: "#219C90", paddingVertical: 12, paddingHorizontal: 32, borderRadius: 8 }}
        onPress={handleSave}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>Save Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminHomeMessage;
