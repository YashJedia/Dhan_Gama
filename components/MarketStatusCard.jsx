import { View, Text, Image, Touchable, TouchableOpacity } from "react-native";
import React from "react";
import stockIcon from "../assets/icons/stock-icon.png";

const MarketStatusCard = ({
  marketOpenTiming,
  marketCloseTiming,
  marketStatus,
  gameName,
  result,
  customTextStyles,
  marketStatusViewStyles,
  marketStatusTextStyles,
  onPress,
  playIcon,
  isDisabled,
}) => {
  return (
    <View className="flex-row justify-between items-center bg-white rounded-xl p-4 my-1">
      <View className="grid items-center">
        <Image source={stockIcon} className="w-12 h-12" />
        <View
          className={`border px-1 py-[1px] mt-1 flex justify-center items-center bg-[#219C90] rounded-md ${customTextStyles}`}
        >
          <Text className="text-white text-[10px] font-psemibold">
            {marketOpenTiming}
          </Text>
        </View>
      </View>
      <View className="grid items-center">
        <Text className="font-pbold">{gameName}</Text>
        <Text className="font-pbold">{result}</Text>
        <View className={`border px-1  rounded-md ${marketStatusViewStyles}`}>
          <Text className={`font-psemibold ${marketStatusTextStyles}`}>
            {marketStatus}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        disabled={isDisabled}
      >
        <View className="grid items-center">
          <Image source={playIcon} className="w-12 h-12" />
          <View
            className={`border px-1 py-[1px] mt-1 flex justify-center items-center bg-[#219C90] rounded-md `}
          >
            <Text className="text-white text-[10px] font-psemibold">
              {marketCloseTiming}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MarketStatusCard;
