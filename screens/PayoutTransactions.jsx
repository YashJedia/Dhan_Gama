import {
  View,
  Text,
  ScrollView,
  StatusBar,
  RefreshControl,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "@/store/thunk/payoutTransactionsThunk";
import { baseUrl } from "@/utils/common";

const PayoutTransactions = () => {
  const dispatch = useDispatch();
  const { transactionsData } = useSelector((state) => state.payoutTransactions);
  const sortedData = transactionsData
    ?.slice()
    .sort((a, b) => new Date(b?.txn_req_date) - new Date(a?.txn_req_date));
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");

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
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                  setModalImageUrl(baseUrl() + item?.payment_image);
                }}
                activeOpacity={1}
                disabled={!item?.payment_image}
              >
                <Text className="text-white text-sm font-psemibold">
                  Payment Image:{" "}
                  {item?.payment_image
                    ? "Tap here to open image"
                    : "Not Available"}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#219C90" style="light" />
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={{
                uri: modalImageUrl,
              }}
              style={styles.image}
              resizeMode="contain"
            />

            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                setModalImageUrl("");
              }}
              className="bg-red-600 rounded-lg px-4 py-1"
              activeOpacity={0.8}
            >
              <Text className="text-white text-lg">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 400,
  },
});

export default PayoutTransactions;
