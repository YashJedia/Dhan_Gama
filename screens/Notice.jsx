import { View, Text, ScrollView, StatusBar } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Notice = () => {
  return (
    <SafeAreaView className="bg-[#e0f5ff]">
      <ScrollView className="h-full">
        {/* <View className="bg-[#BBE9FF] min-h-[10vh] justify-center my-4 mt-8 mx-6 px-3 py-2 rounded-lg items-start">
          <Text className="text-black font-psemibold text-[18px]">
            App Notice
          </Text>
          <Text className="text-black font-pregular">
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries
          </Text>
        </View> */}
        <View className="bg-[#BBE9FF] min-h-[10vh] justify-center my-2 mx-6 px-3 py-2 rounded-lg items-start">
          <Text className="text-black font-psemibold text-[18px]">
            Add Fund Notice
          </Text>
          <Text className="text-black font-pregular">
            Minimum Deposit Rs. 1000
          </Text>
        </View>
        <View className="bg-[#BBE9FF] min-h-[10vh] justify-center my-2 mx-6 px-3 py-2 rounded-lg items-start">
          <Text className="text-black font-psemibold text-[18px]">
            Withdraw Fund Notice
          </Text>
          <Text className="text-black font-pregular">
            Minimum Withdrawal Rs. 500
          </Text>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#219C90" style="light" />
    </SafeAreaView>
  );
};

export default Notice;
