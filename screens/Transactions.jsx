import {
  View,
  Text,
  ScrollView,
  StatusBar,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Transactions = ({ navigation }) => {
  return (
    <SafeAreaView className="bg-[#e0f5ff]">
      <ScrollView className="h-full">
        <View className="bg-[#BBE9FF] min-h-[100vh] my-2 mx-2 px-2 py-4 rounded-lg">
          <TouchableOpacity
            className="flex flex-col items-start bg-blue-400 rounded-md p-3 my-2"
            activeOpacity={1}
            onPress={() => navigation.navigate("Add Funds Transactions")}
          >
            <Text className="text-white text-lg">Add Funds Transactions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex flex-col items-start bg-blue-400 rounded-md p-3 my-1"
            activeOpacity={1}
            onPress={() => navigation.navigate("Payout Transactions")}
          >
            <Text className="text-white text-lg">
              Withdraw Funds Transactions
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#219C90" style="light" />
    </SafeAreaView>
  );
};

export default Transactions;
