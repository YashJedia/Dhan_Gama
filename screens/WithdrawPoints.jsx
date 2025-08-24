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
    amount: "",
    paymentMethod: "",
  });
  const dispatch = useDispatch();
  const submitRequest = async () => {
    setIsSubmitting(true);
    const userId = await AsyncStorage.getItem("userId");
    let formData = new FormData();
    formData.append("user_id", userId);
    formData.append("amount", requestForm.amount);
    formData.append("payment_method", requestForm.paymentMethod);

    try {
      const { data } = await axios.post(
        "api/withdraw-payment-request",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      Alert.alert("Message", data.message);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to add request.");
    } finally {
      setRequestForm({
        amount: "",
        paymentMethod: "",
      });
      setIsSubmitting(false);
      await dispatch(getProfile());
    }
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
            <Text className="ml-1 font-psemibold text-md">Payment Method</Text>
            <InputBox
              icon={"journal"}
              placeholder={"Enter Payment Method"}
              customStyles={""}
              handleChangeText={(e) => {
                if (/[^a-zA-Z\s]/g.test(e)) {
                  return Alert.alert(
                    "Message",
                    "Input must contain only letters."
                  );
                }
                setRequestForm({ ...requestForm, paymentMethod: e });
              }}
              value={requestForm.paymentMethod || ""}
            />
          </View>
          <View className="my-1">
            <Text className="ml-1 font-psemibold text-md">Points</Text>
            <InputBox
              icon={"diamond"}
              placeholder={"Enter Points"}
              customStyles={""}
              handleChangeText={(e) => {
                if (!/^\d*$/.test(e)) {
                  return Alert.alert(
                    "Message",
                    "Input must contain only digits."
                  );
                }
                setRequestForm({ ...requestForm, amount: e });
              }}
              value={requestForm.amount || ""}
              keyboardTypeValue={"numeric"}
            />
          </View>

          {/* <CustomButton text={"Upload Image"} onPress={uploadImage} /> */}
          <CustomButton
            text={"Submit"}
            textStyles={"text-white"}
            customStyles={"bg-[#219C90] mt-4"}
            onPress={submitRequest}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#219C90" style="light" />
    </SafeAreaView>
  );
};

export default WithdrawPoints;
