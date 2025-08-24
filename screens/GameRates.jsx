import { View, Text, ScrollView, StatusBar } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { gameTypes } from "@/store/thunk/gameTypeThunk";

// 10:100 (Single)
// 10:1000 (Jodi)
// 10:1400 (Single Panel)
// 10:3000 (Double Panel)
// 10:7000 (Triple Panel)
// 10:10000 (Half Sangam)
// 10:100000 (Full Sangam)

const GameRates = () => {
  const dispatch = useDispatch();
  const { gameType } = useSelector((state) => state.gametype);

  useEffect(() => {
    const fetchGameRates = async () => {
      await dispatch(gameTypes());
    };
    fetchGameRates();
  }, []);

  return (
    <SafeAreaView className="bg-[#e0f5ff] h-screen py-6">
      {/* <ScrollView className="h-full"> */}
      <View className="bg-[#BBE9FF] min-h-[87vh] px-4 py-6 mx-6 rounded-lg">
        {gameType?.map((item) => (
          <View
            className="flex-row m-1 bg-[#3FA2F6] rounded-lg p-4"
            key={item?.gt_id}
          >
            <View className="flex-col w-3/4">
              <Text className="text-white font-psemibold text-lg">
                {item?.gt_name}
              </Text>
            </View>
            <View className="flex-col w-1/4">
              <Text className="text-white font-psemibold text-lg">
                {item?.gt_rate}
              </Text>
            </View>
          </View>
        ))}
      </View>
      {/* </ScrollView> */}
      <StatusBar backgroundColor="#219C90" style="light" />
    </SafeAreaView>
  );
};

export default GameRates;
