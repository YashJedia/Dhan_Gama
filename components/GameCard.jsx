import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import convertTime from "../utils/convertTime";
const GameCard = ({
  gameName,
  gameType,
  gameTime,
  handlePress,
  gameTypeId,
  isDisabled,
}) => {
  const currentDate = new Date();

  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const seconds = currentDate.getSeconds().toString().padStart(2, "0");

  const currentTime = `${hours}:${minutes}:${seconds}`;

  return (
    <View
      className={`flex flex-col justify-start items-center rounded-lg border border-yellow-400 w-24 h-20  ${
        (gameTypeId == "2" && gameType == "Close") ||
        (gameTypeId == "6" && gameType == "Close") ||
        (gameTypeId == "7" && gameType == "Close")
          ? "bg-gray-400"
          : gameType == "Open" && currentTime < gameTime
          ? // ? "bg-[#50B498]"
            "bg-blue-500"
          : gameType == "Close" && currentTime < gameTime
          ? // ? "bg-red-600"
            "bg-blue-500"
          : "bg-gray-400"
      } my-1`}
    >
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        className={`rounded-full flex justify-center items-center m-2`}
        disabled={isDisabled}
      >
        <Text className="text-xs text-white font-semibold text-center">
          {gameName}
        </Text>
        <Text className="text-xs text-white font-semibold text-center">
          {gameType}
        </Text>
        <Text className="text-xs text-white font-semibold text-center">
          {convertTime(gameTime)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GameCard;
