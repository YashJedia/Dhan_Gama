import { View, Text, ScrollView, StatusBar } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import CustomCalendar from "@/components/CustomCalendar";

const WinHistory = () => {
  return (
    <SafeAreaView className="bg-[#e0f5ff]">
      <ScrollView className="h-full">
        <View className="bg-[#BBE9FF] min-h-[10vh] justify-center my-6 mx-6 p-4 rounded-lg items-center">
          <View className="flex-1 flex-row gap-4">
            <View className="flex-1 justify-center items-center">
              <Text className="font-pregular">From Date</Text>
              <CustomCalendar />
            </View>
            <View className="flex-1 justify-center items-center">
              <Text className="font-pregular">To Date</Text>
              <CustomCalendar />
            </View>
          </View>
          <CustomButton
            text={"Submit"}
            textStyles={"text-white"}
            customStyles={"bg-[#219C90] mt-6 w-full"}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#219C90" style="light" />
    </SafeAreaView>
  );
};

export default WinHistory;
