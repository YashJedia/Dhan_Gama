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
import { fetchTransactions } from "@/store/thunk/addFundsTransactionsThunk";

const AddFundsTransactions = () => {
  const dispatch = useDispatch();
  const { transactionsData } = useSelector(
    (state) => state.addfundstransactions
  );
  const sortedData = transactionsData
    ?.slice()
    .sort((a, b) => new Date(b?.txn_req_date) - new Date(a?.txn_req_date));

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const getUserTransactions = async () => {
      try {
        await dispatch(fetchTransactions());
      } catch (error) {
        console.log(error);
      }
    };
    getUserTransactions();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchTransactions());
    setRefreshing(false);
  };
  // console.log(transactionsData);

  return (
    <SafeAreaView className="bg-[#e0f5ff]">
      <ScrollView
        className="h-full"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="bg-[#BBE9FF] min-h-[10vh] my-2 mx-2 p-2 rounded-lg">
          {sortedData?.map((item) => (
            <View
              className="flex flex-col items-start bg-blue-400 rounded-md p-3 my-2"
              key={item?.txn_id}
            >
              <Text className="text-white text-sm font-psemibold">
                Amount: {item?.txn_amount}
              </Text>
              <Text className="text-white text-sm font-psemibold">
                Requested Amount: {item?.txn_req_amt}
              </Text>
              <Text className="text-white text-sm font-psemibold">
                Date: {item?.txn_req_date}
              </Text>
              <Text className="text-white text-sm font-psemibold">
                Date of Approval:{" "}
                {item?.txn_req_approve_date
                  ? item?.txn_req_approve_date
                  : "Not Available"}
              </Text>
              <Text className="text-white text-sm font-psemibold">
                Payment Method: {item?.payment_method}
              </Text>
              <Text className="text-white text-sm font-psemibold">
                Transaction ID:{" "}
                {item?.payment_txn_id ? item?.payment_txn_id : "Not Available"}
              </Text>
              <Text className="text-white text-sm font-psemibold">
                Status: {item?.txn_status}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#219C90" style="light" />
    </SafeAreaView>
  );
};

export default AddFundsTransactions;
