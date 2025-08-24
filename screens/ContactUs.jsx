import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import constants from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setting } from "@/store/thunk/settingThunk";

const ContactUs = () => {
  const { settingData } = useSelector((state) => state.setting);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSetting = async () => {
      await dispatch(setting());
    };
    fetchSetting();
  }, []);

  // uncomment for telegram
  const openTelegram = () => {
    const username = "livematkathem"; // Replace with the target Telegram username

    const url = `tg://resolve?domain=${username}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        Linking.openURL(url);
        // if (supported) {
        // } else {
        //   alert("Telegram is not installed on this device");
        // }
      })
      .catch((err) => console.error("Error opening Telegram", err));
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

  const makePhoneCall = () => {
    const phoneNumber = settingData?.mobile; // Replace with the target phone number

    const url = `tel:${phoneNumber}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        Linking.openURL(url);
        // if (supported) {
        // } else {
        //   alert("Phone call feature is not supported on this device");
        // }
      })
      .catch((err) => console.error("Error making phone call", err));
  };

  return (
    <SafeAreaView className="bg-[#e0f5ff] h-screen py-6">
      <View className="bg-[#BBE9FF] px-4 py-4 mx-6 rounded-lg">
        <TouchableOpacity
          className="flex-row items-center m-2 bg-[#3FA2F6] rounded-lg p-1"
          activeOpacity={0.7}
          onPress={makePhoneCall}
        >
          <Image source={constants.callIcon} className="w-12 h-12 mr-1" />
          <View>
            <Text className="text-white font-pregular">Call</Text>
            <Text className="text-white font-pregular">
              {settingData?.mobile}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center m-2 bg-[#3FA2F6] rounded-lg p-1"
          activeOpacity={0.7}
          onPress={openWhatsApp}
        >
          <Image source={constants.whatsappIcon} className="w-12 h-12 mr-1" />
          <View>
            <Text className="text-white font-pregular">Whatsapp</Text>
            <Text className="text-white font-pregular">
              {settingData?.mobile}
            </Text>
          </View>
        </TouchableOpacity>

        {/* telegram */}
        <TouchableOpacity
          className="flex-row items-center m-2 bg-[#3FA2F6] rounded-lg p-1"
          activeOpacity={0.7}
          onPress={openTelegram}
        >
          <Image source={constants.telegramIcon} className="w-12 h-12 mr-1" />
          <View>
            <Text className="text-white font-pregular">Telegram</Text>
            <Text className="text-white font-pregular">livematkathem</Text>
          </View>
        </TouchableOpacity>

        {/* <View className="flex-row items-center m-2 bg-[#3FA2F6] rounded-lg p-1">
          <Image source={constants.walletIcon2} className="w-12 h-12 mr-1" />
          <View className="">
            <Text className="text-white font-pregular">Withdrawl Proof</Text>
            <Text className="text-white font-pregular">
              Download Apfdsfdsfsdfdsffdsfdsfdsfdsdsfdsfdp
            </Text>
          </View>
        </View> */}
      </View>
      <StatusBar backgroundColor="#219C90" style="light" />
    </SafeAreaView>
  );
};

export default ContactUs;
