import {
  View,
  Text,
  ScrollView,
  StatusBar,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "@/store/thunk/notificationsThunk";

const PayoutTransactions = () => {
  const dispatch = useDispatch();
  const { notificationsData } = useSelector((state) => state.notifications);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const getUserTransactions = async () => {
      try {
        await dispatch(fetchNotifications());
      } catch (error) {
        console.log(error);
      }
    };
    getUserTransactions();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchNotifications());
    setRefreshing(false);
  };
  // console.log(bidData);

  return (
    <SafeAreaView className="bg-[#e0f5ff]">
      <ScrollView
        className="h-full"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="bg-[#BBE9FF] my-2 mx-2 p-4 rounded-lg flex-col space-y-2">
          {notificationsData?.length ? (
            <View>
              {notificationsData?.map((item) => (
                <View
                  className="flex-col justify-center items-start bg-blue-400 rounded-md p-2"
                  key={item?.id}
                >
                  <Text className="text-white font-pregular">
                    Message: {item?.message}
                  </Text>
                  <Text className="text-white font-pregular">
                    Date: {item?.created_at}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <Text className="text-sm font-psemibold text-white bg-blue-400 rounded-lg p-2">
              Notifications not available
            </Text>
          )}
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#219C90" style="light" />
    </SafeAreaView>
  );
};

export default PayoutTransactions;
