import { View, Text, ScrollView, StatusBar } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { setting } from "@/store/thunk/settingThunk";

const HowToPlay = () => {
  const { settingData } = useSelector((state) => state.setting);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSetting = async () => {
      await dispatch(setting());
    };
    fetchSetting();
  }, []);

  return (
    <SafeAreaView className="bg-[#e0f5ff] h-screen py-6">
      {/* <ScrollView className="h-full"> */}
      <View className="bg-[#BBE9FF] min-h-[87vh] px-4 py-6 mx-6 rounded-lg">
        <View className="flex-col items-start m-2 bg-[#3FA2F6] rounded-lg p-4 space-y-2">
          <Text className="text-white font-pregular">
            1. To start playing, please deposit money into our account. The
            minimum deposit amount is ₹1000. Deposits below ₹1000 will not be
            accepted.
          </Text>
          <Text className="text-white font-pregular">
            2. The minimum amount to place a bet is ₹10. Rs. 1 = 1 Point.
          </Text>
          <Text className="text-white font-pregular">
            3. If you play and win, your points will increase automatically
            based on your game performance.
          </Text>
          <Text className="text-white font-pregular">
            4. To encash your points, simply contact us via call or message, and
            we will transfer the money to your account as soon as possible.
          </Text>
          <Text className="text-white font-pregular">
            4. If you have any issues with transactions or other queries, feel
            free to reach out to us at the contact details provided.
          </Text>
        </View>

        <View className="m-2 bg-[#3FA2F6] rounded-lg p-3">
          <Text className="text-white font-psemibold">
            CONTACT NO: {settingData?.mobile}
          </Text>
        </View>
        {/* <CustomButton
          text={"WATCH IT ON YOUTUBE CLICK HERE"}
          textStyles={"text-white text-[15px]"}
          customStyles={"bg-[#3FA2F6]"}
        /> */}
      </View>
      {/* </ScrollView> */}
      <StatusBar backgroundColor="#219C90" style="light" />
    </SafeAreaView>
  );
};

export default HowToPlay;
