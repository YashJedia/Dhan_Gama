import {
  View,
  Text,
  ScrollView,
  Image,
  StatusBar,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputBox from "@/components/InputBox";
import CustomButton from "@/components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "@/store/thunk/profileThunk";

const Profile = () => {
  const [editable, setEditable] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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
  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(getProfile());
    setRefreshing(false);
  };

  const submitProfile = async () => {
    setEditable(false);

    try {
      await dispatch(updateProfile(form));
      Alert.alert("Message", "Profile updated successfully");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Error updating profile.");
    } finally {
      await dispatch(getProfile());
    }
  };

  return (
    <SafeAreaView className="bg-[#e0f5ff]">
      <ScrollView
        className="h-full"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* <View className="bg-[#BBE9FF] min-h-[20vh] justify-center items-center px-4 py-6 my-6 mx-6 rounded-lg">
          <View className="rounded-full ">
            <Image
              source={userImage}
              resizeMode="contain"
              className="w-[100px] h-[100px] rounded-full"
            />
          </View>
          <Text className="mt-6 text-xl">{profile?.user_mobile}</Text>
        </View> */}

        <View className="bg-[#BBE9FF] min-h-[20vh] justify-center px-4 py-6 my-6 mx-6 rounded-lg">
          {/* <View className="my-2">
            <Text className="ml-2 font-pregular">Username</Text>
            <InputBox
              icon={"person"}
              placeholder={
                profile?.user_username
                  ? profile?.user_username
                  : "not available"
              }
              customInputStyles={editable ? "font-psemibold" : "font-pregular"}
              editable={editable}
            />
          </View> */}
          <View className="my-2">
            <Text className="ml-2 font-pregular">Email</Text>
            <InputBox
              icon={"mail"}
              placeholder={
                profile?.user_email ? profile?.user_email : "not available"
              }
              value={form.email || ""}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              customInputStyles={
                editable
                  ? "text-black font-regular"
                  : "text-gray-400 font-regular"
              }
              customStyles={editable && "border-1 border-black"}
              editable={editable}
            />
          </View>

          <View className="my-2">
            <Text className="ml-2 font-pregular">Mobile</Text>
            <InputBox
              icon={"call"}
              placeholder={
                profile?.user_mobile ? profile?.user_mobile : "not available"
              }
              value={form.mobile || ""}
              handleChangeText={(e) => {
                if (!/^\d*$/.test(e)) {
                  return Alert.alert(
                    "Message",
                    "Input must contain only digits."
                  );
                }
                if (e.length > 10) {
                  return Alert.alert("Message", "Only 10 digits are allowed.");
                }
                setForm({ ...form, mobile: e });
              }}
              customInputStyles={
                editable
                  ? "text-black font-regular"
                  : "text-gray-400 font-regular"
              }
              customStyles={editable && "border-1 border-black"}
              editable={editable}
              keyboardTypeValue={"numeric"}
            />
          </View>

          <View className="my-2">
            <Text className="ml-2 font-pregular">Bank Account Holder Name</Text>
            <InputBox
              icon={"person"}
              placeholder={
                profile?.bank_account_holder_name
                  ? profile?.bank_account_holder_name
                  : "not available"
              }
              value={form.bank_account_holder_name || ""}
              handleChangeText={(e) => {
                if (/[^a-zA-Z\s]/g.test(e)) {
                  return Alert.alert(
                    "Message",
                    "Input must contain only letters."
                  );
                }
                setForm({ ...form, bank_account_holder_name: e });
              }}
              customInputStyles={
                editable
                  ? "text-black font-regular"
                  : "text-gray-400 font-regular"
              }
              customStyles={editable && "border-1 border-black"}
              editable={editable}
            />
          </View>

          {/* <View className="my-2">
            <Text className="ml-2 font-pregular">Account Number</Text>
            <InputBox
              icon={"journal"}
              placeholder={
                profile?.bank_account_no
                  ? profile?.bank_account_no
                  : "not available"
              }
              value={form.bank_account_no || ""}
              handleChangeText={(e) => {
                if (!/^\d*$/.test(e)) {
                  return Alert.alert(
                    "Message",
                    "Input must contain only digits."
                  );
                }
                setForm({ ...form, bank_account_no: e });
              }}
              customInputStyles={
                editable
                  ? "text-black font-regular"
                  : "text-gray-400 font-regular"
              }
              customStyles={editable && "border-1 border-black"}
              editable={editable}
              keyboardTypeValue={"numeric"}
            />
          </View>

          <View className="my-2">
            <Text className="ml-2 font-pregular">IFSC Code</Text>
            <InputBox
              icon={"key"}
              placeholder={
                profile?.bank_ifsc ? profile?.bank_ifsc : "not available"
              }
              value={form.bank_ifsc || ""}
              handleChangeText={(e) => setForm({ ...form, bank_ifsc: e })}
              customInputStyles={
                editable
                  ? "text-black font-regular"
                  : "text-gray-400 font-regular"
              }
              customStyles={editable && "border-1 border-black"}
              editable={editable}
            />
          </View>

          <View className="my-2">
            <Text className="ml-2 font-pregular">Bank Name</Text>
            <InputBox
              icon={"business"}
              placeholder={
                profile?.bank_name ? profile?.bank_name : "not available"
              }
              value={form.bank_name || ""}
              handleChangeText={(e) => {
                if (/[^a-zA-Z\s]/g.test(e)) {
                  return Alert.alert(
                    "Message",
                    "Input must contain only letters."
                  );
                }

                setForm({ ...form, bank_name: e });
              }}
              customInputStyles={
                editable
                  ? "text-black font-regular"
                  : "text-gray-400 font-regular"
              }
              customStyles={editable && "border-1 border-black"}
              editable={editable}
            />
          </View>

          <View className="my-2">
            <Text className="ml-2 font-pregular">Google Pay Number</Text>
            <InputBox
              icon={"wallet"}
              placeholder={
                profile?.google_pay_no
                  ? profile?.google_pay_no
                  : "not available"
              }
              value={form.google_pay_no || ""}
              handleChangeText={(e) => {
                if (!/^\d*$/.test(e)) {
                  return Alert.alert(
                    "Message",
                    "Input must contain only digits."
                  );
                }
                if (e.length > 10) {
                  return Alert.alert("Message", "Only 10 digits are allowed.");
                }
                setForm({ ...form, google_pay_no: e });
              }}
              customInputStyles={
                editable
                  ? "text-black font-regular"
                  : "text-gray-400 font-regular"
              }
              customStyles={editable && "border-1 border-black"}
              editable={editable}
              keyboardTypeValue={"numeric"}
            />
          </View>

          <View className="my-2">
            <Text className="ml-2 font-pregular">Paytm Number</Text>
            <InputBox
              icon={"wallet"}
              placeholder={
                profile?.paytm_no ? profile?.paytm_no : "not available"
              }
              value={form.paytm_no || ""}
              handleChangeText={(e) => {
                if (!/^\d*$/.test(e)) {
                  return Alert.alert(
                    "Message",
                    "Input must contain only digits."
                  );
                }
                if (e.length > 10) {
                  return Alert.alert("Message", "Only 10 digits are allowed.");
                }
                setForm({ ...form, paytm_no: e });
              }}
              customInputStyles={
                editable
                  ? "text-black font-regular"
                  : "text-gray-400 font-regular"
              }
              customStyles={editable && "border-1 border-black"}
              editable={editable}
              keyboardTypeValue={"numeric"}
            />
          </View>

          <View className="my-2">
            <Text className="ml-2 font-pregular">PhonePe Number</Text>
            <InputBox
              icon={"wallet"}
              placeholder={
                profile?.phone_pe_no ? profile?.phone_pe_no : "not available"
              }
              value={form.phone_pe_no || ""}
              handleChangeText={(e) => {
                if (!/^\d*$/.test(e)) {
                  return Alert.alert(
                    "Message",
                    "Input must contain only digits."
                  );
                }
                if (e.length > 10) {
                  return Alert.alert("Message", "Only 10 digits are allowed.");
                }
                setForm({ ...form, phone_pe_no: e });
              }}
              customInputStyles={
                editable
                  ? "text-black font-regular"
                  : "text-gray-400 font-regular"
              }
              customStyles={editable && "border-1 border-black"}
              editable={editable}
              keyboardTypeValue={"numeric"}
            />
          </View> */}
        </View>
        {/* <View className="items-center"> */}
        {editable ? (
          <CustomButton
            text={"Submit Profile"}
            textStyles={"text-white"}
            customStyles={"bg-[#219C90] mx-11 mb-5"}
            onPress={submitProfile}
          />
        ) : (
          <CustomButton
            text={"Edit Profile"}
            textStyles={"text-white"}
            customStyles={"bg-[#C80036] mx-11 mb-5"}
            onPress={() => setEditable(true)}
          />
        )}

        {/* </View> */}
      </ScrollView>
      <StatusBar backgroundColor="#219C90" style="light" />
    </SafeAreaView>
  );
};

export default Profile;
