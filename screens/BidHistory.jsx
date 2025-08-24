import {
  View,
  Text,
  ScrollView,
  StatusBar,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BidCard from "@/components/BidCard";
import { useDispatch, useSelector } from "react-redux";
import { userBids } from "@/store/thunk/bidThunk";

const BidHistory = () => {
  const dispatch = useDispatch();
  const { bidData } = useSelector((state) => state.bid);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const getUserBids = async () => {
      try {
        await dispatch(userBids());
      } catch (error) {
        console.log(error);
      }
    };
    getUserBids();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(userBids());
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
        <View className="bg-[#BBE9FF] min-h-[10vh] justify-center my-2 mx-2 p-2 rounded-lg items-center">
          {bidData?.map((item) => (
            <BidCard
              key={item?.id}
              gameName={item?.title}
              bidName={item?.gt_name}
              bidNumber={item?.bid_number}
              bidPanel={item?.bid_panel}
              bidPrice={item?.bid_value}
              bidType={item?.bid_type}
              customButtonText={
                item?.win_status === "Win"
                  ? "Won"
                  : item?.win_status === "Loss"
                  ? "Lost"
                  : "Pending"
              }
              customButtonStyle={
                item?.win_status === "Win"
                  ? "bg-green-500 p-2 w-24"
                  : item?.win_status === "Loss"
                  ? "bg-red-500 p-2 w-24"
                  : "bg-orange-400 p-2 w-24"
              }
            />
          ))}
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#219C90" style="light" />
    </SafeAreaView>
  );
};

export default BidHistory;
