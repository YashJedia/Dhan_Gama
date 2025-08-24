import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const CustomDropDown = ({ dropDownText, handlePress }) => {
  return (
    <TouchableOpacity
      className="text-base w-full border-b border-gray-200"
      activeOpacity={1}
      onPress={handlePress}
    >
      <Text className="text-base my-2 ml-2">{dropDownText}</Text>
    </TouchableOpacity>
  );
};

export default CustomDropDown;
