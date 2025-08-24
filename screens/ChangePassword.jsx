import {
  View,
  Text,
  ScrollView,
  Image,
  StatusBar,
  Alert,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputBox from "../components/InputBox";
import CustomButton from "../components/CustomButton";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import constants from "@/utils/constants";
import { useSelector } from "react-redux";

const ChangePassword = ({ navigation }) => {
  const [changePassForm, setChangePassForm] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hideOldPassword, setHideOldPassword] = useState(true);
  const [hideNewPassword, setHideNewPassword] = useState(true);
  const { settingData } = useSelector((state) => state.setting);
  const handlePasswordChange = async () => {
    const userId = await AsyncStorage.getItem("userId");
    setIsSubmitting(true);
    try {
      const { data } = await axios.post(
        `api/update-user-password/${userId}`,
        {
          oldPassword: changePassForm.oldPassword,
          password: changePassForm.password,
          confirm_password: changePassForm.confirmPassword,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      Alert.alert("Message", data.message);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
      setChangePassForm({
        oldPassword: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  const openWhatsApp = () => {
    let phoneNumber;
    if (settingData?.mobile.substring(0, 1) === "+") {
      phoneNumber = settingData?.mobile.substring(1);
    }

    const message = "Hello!";

    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        Linking.openURL(url);
        // if (supported) {
        // } else {
        //   alert("WhatsApp is not installed on this device");
        // }
      })
      .catch((err) => console.error("Error opening WhatsApp", err));
  };

  return (
    <SafeAreaView className="bg-[#e0f5ff]">
      <ScrollView className="h-full">
        <View className="items-center mt-6">
          <Image
            source={constants.mainLogo}
            resizeMode="contain"
            className="w-[120px] h-[120px]"
          />
        </View>
        <View className="bg-[#BBE9FF] min-h-[20vh] justify-center px-4 py-6 my-6 mx-6 rounded-lg">
          <InputBox
            icon={"key"}
            placeholder={"Old Password"}
            endIcon={hideOldPassword ? "eye-off" : "eye"}
            customStyles={"m-2"}
            value={changePassForm.oldPassword}
            handleChangeText={(e) =>
              setChangePassForm({ ...changePassForm, oldPassword: e })
            }
            handleEndButtonPress={() => setHideOldPassword(!hideOldPassword)}
            secureEntry={hideOldPassword}
          />
          <InputBox
            icon={"lock-closed"}
            placeholder={"Enter Password"}
            endIcon={hideNewPassword ? "eye-off" : "eye"}
            customStyles={"m-2"}
            value={changePassForm.password}
            handleChangeText={(e) =>
              setChangePassForm({ ...changePassForm, password: e })
            }
            handleEndButtonPress={() => setHideNewPassword(!hideNewPassword)}
            secureEntry={hideNewPassword}
          />
          <InputBox
            icon={"lock-closed"}
            placeholder={"Confirm Password"}
            endIcon={hideNewPassword ? "eye-off" : "eye"}
            customStyles={"m-2"}
            value={changePassForm.confirmPassword}
            handleChangeText={(e) =>
              setChangePassForm({ ...changePassForm, confirmPassword: e })
            }
            handleEndButtonPress={() => setHideNewPassword(!hideNewPassword)}
            secureEntry={hideNewPassword}
          />

          <CustomButton
            text={"Submit"}
            textStyles={"text-white"}
            customStyles={"bg-[#219C90] mt-6 "}
            onPress={handlePasswordChange}
            isloading={isSubmitting}
          />
        </View>
        <View className="items-center">
          <Text className="text-lg">Any Enquiry, Please contact on </Text>
          <View className="flex-row items-center">
            <Ionicons
              name="logo-whatsapp"
              size={20}
              className=""
              style={{ color: "blue" }}
            />
            <TouchableOpacity activeOpacity={0.9} onPress={openWhatsApp}>
              <Text className="text-lg ml-1 text-blue-600">
                {settingData?.mobile}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#219C90" style="light" />
    </SafeAreaView>
  );
};

export default ChangePassword;
