import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const InputBox = ({
  value,
  placeholder,
  icon,
  editable,
  customInputStyles,
  customStyles,
  customTextStyles,
  endText,
  endIcon,
  handleChangeText,
  keyboardTypeValue,
  handleEndButtonPress,
  secureEntry,
}) => {
  return (
    <View
      className={`flex-row bg-white items-center border border-gray-300 rounded-xl p-2 ${customStyles}`}
    >
      <Ionicons name={icon} color="gray" size={20} />
      <TextInput
        keyboardType={keyboardTypeValue}
        placeholder={placeholder}
        className={`flex-1 text-base ml-2 ${customInputStyles}`}
        editable={editable}
        value={value}
        secureTextEntry={secureEntry}
        onChangeText={handleChangeText}
      />
      <Text className={`flex-row-reverse text-base ${customTextStyles}`}>
        {endText}
      </Text>
      <TouchableOpacity onPress={handleEndButtonPress} activeOpacity={1}>
        <Ionicons name={endIcon} color="gray" size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default InputBox;
