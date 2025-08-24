import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const HeaderButton = ({ onPress, iconName }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} className="ml-3">
      <Ionicons name={iconName} size={26} color="#fff" />
    </TouchableOpacity>
  );
};

export default HeaderButton;
