import { View, Text, ScrollView, Image, StatusBar } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputBox from "../components/InputBox";
import CustomButton from "../components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "@/store/thunk/profileThunk";

const BankDetails = () => {
  const [editable, setEditable] = useState(false);
  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: profile?.user_email ? profile?.user_email : "",
    mobile: profile?.user_mobile ? profile?.user_mobile : "",
    bank_account_holder_name: profile?.bank_account_holder_name,
    bank_account_no: profile?.bank_account_no,
    bank_ifsc: profile?.bank_ifsc,
    bank_name: profile?.bank_name,
    google_pay_no: profile?.google_pay_no,
    paytm_no: profile?.paytm_no,
    phone_pe_no: profile?.phone_pe_no,
  });

  const submitBankDetails = async () => {
    setEditable(false);

    try {
      await dispatch(updateProfile(form));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView className="bg-[#e0f5ff]">
      <ScrollView className="h-full">
        <View className="bg-[#BBE9FF] min-h-[20vh] justify-center px-4 py-6 my-6 mx-6 rounded-lg">
          <InputBox
            icon={"person"}
            placeholder={"Account Holder Name"}
            customStyles={"py-4 m-2"}
          />
          <InputBox
            icon={"card"}
            placeholder={"Account Number"}
            customStyles={"py-4 m-2"}
          />
          <InputBox
            icon={"card"}
            placeholder={"Confirm Account Number"}
            customStyles={"py-4 m-2"}
          />
          <InputBox
            icon={"key"}
            placeholder={"IFSC code"}
            customStyles={"py-4 m-2"}
          />
          <InputBox
            icon={"business"}
            placeholder={"Bank Name"}
            customStyles={"py-4 m-2"}
          />
          <InputBox
            icon={"location"}
            placeholder={"Branch Address"}
            customStyles={"py-4 m-2"}
          />
          <CustomButton
            text={"Submit"}
            textStyles={"text-white"}
            customStyles={"bg-[#219C90] mt-6 "}
            // onPress={() => navigation.navigate("Register")}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#219C90" style="light" />
    </SafeAreaView>
  );
};

export default BankDetails;
