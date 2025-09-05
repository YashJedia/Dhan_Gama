import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputBox from "@/components/InputBox";
import CustomButton from "@/components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getProfile } from "@/store/thunk/profileThunk";
import { useDispatch } from "react-redux";
const WithdrawPoints = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestForm, setRequestForm] = useState({
    holderName: "",
    bankAccount: "",
    ifscCode: "",
    bankName: "",
    amount: "",
  });
  const dispatch = useDispatch();
  const submitRequest = async () => {
    if (
      !requestForm.holderName.trim() ||
      !requestForm.bankAccount.trim() ||
      !requestForm.ifscCode.trim() ||
      !requestForm.bankName.trim() ||
      !requestForm.amount.trim()
    ) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }
    const points = parseInt(requestForm.amount);
    if (isNaN(points) || points < 300 || points > 50000) {
      Alert.alert("Error", "Minimum withdrawal is 300 and maximum is 50000.");
      return;
    }
    setIsSubmitting(true);
    // Submit logic here (API call or local handling)
    setTimeout(() => {
      Alert.alert("Success", "Withdrawal request submitted.");
      setRequestForm({
        holderName: "",
        bankAccount: "",
        ifscCode: "",
        bankName: "",
        amount: "",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <SafeAreaView className="bg-[#e0f5ff] py-2">
      <ScrollView className="h-full">
        <View className="bg-[#BBE9FF] min-h-[10vh] justify-center mb-6 mx-6 p-4 rounded-lg items-center">
          <Text className="text-[#0F67B1] font-pbold">
            !!Withdraw Fund Notice!!
          </Text>
          <Text className="text-[#0F67B1] font-pbold">
            Minimum Withdrawal Rs. 500
          </Text>
        </View>
        <View className="bg-[#BBE9FF] min-h-[20vh] justify-center px-4 py-6 mx-6 rounded-lg">
          <View className="my-1">
            <Text className="ml-1 font-psemibold text-md">Account Holder Name</Text>
            <InputBox
              icon={"person"}
              placeholder={"Enter Account Holder Name"}
              customStyles={""}
              handleChangeText={(e) => setRequestForm({ ...requestForm, holderName: e })}
              value={requestForm.holderName}
            />
          </View>
          <View className="my-1">
            <Text className="ml-1 font-psemibold text-md">Bank Account Number</Text>
            <InputBox
              icon={"card"}
              placeholder={"Enter Bank Account Number"}
              customStyles={""}
              handleChangeText={(e) => setRequestForm({ ...requestForm, bankAccount: e })}
              value={requestForm.bankAccount}
              keyboardTypeValue={"numeric"}
            />
          </View>
          <View className="my-1">
            <Text className="ml-1 font-psemibold text-md">IFSC Code</Text>
            <InputBox
              icon={"key"} // 'key' is valid
              placeholder={"Enter IFSC Code"}
              customStyles={""}
              handleChangeText={(e) => setRequestForm({ ...requestForm, ifscCode: e })}
              value={requestForm.ifscCode}
            />
          </View>
          <View className="my-1">
            <Text className="ml-1 font-psemibold text-md">Bank Name</Text>
            <InputBox
              icon={"business"}
              placeholder={"Enter Bank Name"}
              customStyles={""}
              handleChangeText={(e) => setRequestForm({ ...requestForm, bankName: e })}
              value={requestForm.bankName}
            />
          </View>
          <View className="my-1">
            <Text className="ml-1 font-psemibold text-md">Enter Points</Text>
            <InputBox
              icon={"diamond"}
              placeholder={"Enter Points (300 - 50000)"}
              customStyles={""}
              handleChangeText={(e) => {
                if (!/^\d*$/.test(e)) {
                  return Alert.alert("Message", "Input must contain only digits.");
                }
                setRequestForm({ ...requestForm, amount: e });
              }}
              value={requestForm.amount}
              keyboardTypeValue={"numeric"}
            />
          </View>
          <CustomButton
            text={isSubmitting ? "Submitting..." : "Request Withdrawal"}
            textStyles={"text-white"}
            customStyles={"bg-[#219C90] mt-4"}
            onPress={submitRequest}
            disabled={isSubmitting}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#219C90" style="light" />
    </SafeAreaView>
  );
};

export default WithdrawPoints;
