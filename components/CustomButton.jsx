import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const CustomButton = ({
  text,
  textStyles,
  customStyles,
  onPress,
  imgSource,
  customImageStyles,
  isloading,
}) => {
  return (
    <TouchableOpacity
      // onPress={handlePress}
      activeOpacity={0.8}
      className={`rounded-xl flex justify-center items-center m-2 p-1 ${customStyles}`}
      disabled={isloading}
      onPress={onPress}
    >
      <Image source={imgSource} className={customImageStyles} />
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
