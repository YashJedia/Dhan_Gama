import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

function RadioButton({ label, value, selected, onPress }) {
  return (
    <TouchableOpacity
      onPress={() => onPress(value)}
      className="flex-row items-center w-1/2 bg-white border border-gray-300 rounded-xl p-3"
      activeOpacity={1}
    >
      <View
        className={`w-4 h-4 rounded-full border border-gray-400 border-double mr-2 ${
          selected ? "bg-blue-400" : "bg-white"
        }`}
      />
      <Text className="text-black font-bold">{label}</Text>
    </TouchableOpacity>
  );
}

function CustomRadioButtonGroup({ options, selectedValue, onValueChange }) {
  return (
    <View className="flex-row justify-between">
      {options.map((option) => (
        <RadioButton
          key={option.value}
          label={option.label}
          value={option.value}
          selected={selectedValue === option.value}
          onPress={onValueChange}
        />
      ))}
    </View>
  );
}

export default CustomRadioButtonGroup;
