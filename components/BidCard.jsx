import { View, Text } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";

const BidCard = ({
  gameName,
  bidName,
  bidNumber,
  bidPanel,
  bidPrice,
  bidType,
  customButtonText,
  customButtonStyle,
}) => {
  return (
    <View className="flex flex-row items-center justify-between w-full bg-[#3FA2F6] rounded-lg p-4 m-2">
      <View className="flex flex-row items-center">
        <View className="mr-3">
          <Text className="text-white font-pbold">Game:</Text>
          <Text className="text-white font-pbold">Bid Name:</Text>
          <Text className="text-white font-pbold">Number:</Text>
          <Text className="text-white font-pbold">Price:</Text>
          <Text className="text-white font-pbold">Type:</Text>
        </View>
        <View>
          <Text className="text-white font-pbold">{gameName}</Text>
          <Text className="text-white font-pbold">{bidName}</Text>
          {bidPanel ? (
            <Text className="text-white font-pbold">
              {bidNumber}-{bidPanel}
            </Text>
          ) : (
            <Text className="text-white font-pbold">{bidNumber}</Text>
          )}

          <Text className="text-white font-pbold">{bidPrice}</Text>
          <Text className="text-white font-pbold">{bidType}</Text>
        </View>
      </View>
      <View>
        <CustomButton
          text={customButtonText}
          customStyles={customButtonStyle}
          textStyles={"text-white"}
        />
      </View>
    </View>
  );
};

export default BidCard;
