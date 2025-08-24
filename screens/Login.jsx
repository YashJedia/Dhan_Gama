import {
  View,
  Text,
  ScrollView,
  Image,
  StatusBar,
  Alert,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import InputBox from "../components/InputBox";
import CustomButton from "../components/CustomButton";
import { Ionicons } from "@expo/vector-icons";
// import { login } from "@/store/thunk/authThunk";
// import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import constants from "@/utils/constants";
import { useSelector } from "react-redux";

const Login = ({ navigation }) => {
  const { settingData } = useSelector((state) => state.setting);

  // const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [hidePassword, setHidePassword] = useState(true);
  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // await dispatch(login(userData));
      const { data } = await axios.post(
        "api/login",
        {
          username: userData.username,
          password: userData.password,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      Alert.alert("Message", data.message);
      // console.log(data);

      if (data?.data?.user_id) {
        await AsyncStorage.setItem("userId", data.data.user_id);
        await AsyncStorage.setItem("userStatus", String(data.data?.isActive));
        // if (data.data?.isActive == false)
        // const s = AsyncStorage.getItem("userStatus");
        // console.log(typeof String(data.data?.isActive));

        navigation.replace("Drawer");
        // navigation.dispatch(
        //   CommonActions.reset({
        //     index: 0,
        //     routes: [{ name: "Drawer" }],
        //   })
        // );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
      setUserData({
        username: "",
        password: "",
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
  if (isSubmitting) {
    return (
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 flex-row justify-center items-center">
          <ActivityIndicator
            style={{ transform: [{ scaleX: 3 }, { scaleY: 3 }] }}
            color="#37AFE1"
          />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

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
            icon={"person"}
            placeholder={"Enter username"}
            value={userData.username}
            customStyles={"m-2"}
            handleChangeText={(e) => setUserData({ ...userData, username: e })}
          />
          <InputBox
            icon={"lock-closed"}
            placeholder={"Enter password"}
            value={userData.password}
            customStyles={"m-2"}
            handleChangeText={(e) => setUserData({ ...userData, password: e })}
            endIcon={hidePassword ? "eye-off" : "eye"}
            handleEndButtonPress={() => setHidePassword(!hidePassword)}
            secureEntry={hidePassword}
          />

          <CustomButton
            text={"Login"}
            textStyles={"text-white"}
            customStyles={"bg-[#399918] mt-6 "}
            onPress={handleSubmit}
            isloading={isSubmitting}
          />
          <View className="items-center mt-4">
            <Text className="underline">Don't have an account?</Text>
          </View>
          <CustomButton
            text={"Register"}
            textStyles={"text-white"}
            customStyles={"bg-[#C80036]"}
            onPress={() => navigation.navigate("Register")}
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
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Login;
