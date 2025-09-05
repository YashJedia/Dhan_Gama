import {
  View,
  Text,
  StatusBar,
  Image,
  ScrollView,
  Animated,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import HomePageImage from "@/assets/images/home-page.jpg";
import MarketStatusCard from "@/components/MarketStatusCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import { homeDetails } from "@/store/thunk/homeThunk";
// import { gameTypes } from "@/store/thunk/gameTypeThunk";
import constants from "@/utils/constants";
import CustomButton from "@/components/CustomButton";
import googlePayIcon from "@/assets/icons/google-pay-icon.png";
import bankIcon from "@/assets/icons/bank-icon.png";
import { setting } from "@/store/thunk/settingThunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import convertTime from "@/utils/convertTime";
import * as Linking from "expo-linking";
const { width } = Dimensions.get("window");

const Home = ({ navigation }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [userStatus, setUserStatus] = useState("");
  const { homeData } = useSelector((state) => state.home);
  const { settingData } = useSelector((state) => state.setting);
  // Get the current date and time
  const currentDate = new Date();

  // Extract hours, minutes, and seconds
  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const seconds = currentDate.getSeconds().toString().padStart(2, "0");

  // Format the current time as HH:mm:ss
  const currentTime = `${hours}:${minutes}:${seconds}`;
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        // await dispatch(gameTypes());
        await dispatch(homeDetails());
        await dispatch(setting());
        const status = await AsyncStorage.getItem("userStatus");
        setUserStatus(status);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHomeData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(homeDetails());
    setRefreshing(false);
  };

  useEffect(() => {
    const animate = () => {
      scrollX.setValue(0);
      Animated.timing(scrollX, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      }).start(() => animate());
    };

    animate();
  }, [scrollX]);

  const translateX = scrollX.interpolate({
    inputRange: [0, 1],
    outputRange: [width, -width],
  });

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
        //   console.log(supported);
        //   alert("Phone call feature is not supported on this device");
        // }
      })
      .catch((err) => console.error("Error making phone call", err));
  };

  if (!userStatus?.length) {
    return (
      <SafeAreaView className="">
        <View className="bg-[#e0f5ff] h-full">
          <View className="bg-[#219C90] w-full justify-center px-1 rounded-b-xl pb-2">
            {/* start */}
            <View className="overflow-hidden pb-2"></View>
            <View className="flex-row justify-evenly items-center">
              <View className="flex-col items-center">
                  <TouchableOpacity
                    className="flex-col justify-center items-center border border-yellow-300 py-1 rounded-lg w-28 mb-1"
                    onPress={() => navigation.navigate("AddPoints")}
                    activeOpacity={0.8}
                  >
                    <Text className="text-white text-base font-psemibold mx-2">Add Point</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="flex-col justify-center items-center border border-yellow-300 py-1 rounded-lg w-28"
                    onPress={makePhoneCall}
                    activeOpacity={0.7}
                  >
                    <Image
                      source={constants.callIcon}
                      className="w-8 h-8"
                      resizeMode="contain"
                    />
                    <Text className="text-white text-base font-psemibold mx-2">Call Us</Text>
                  </TouchableOpacity>
                </View>

              <View className="flex-col items-center">
                  <TouchableOpacity
                    className="flex-col justify-center items-center border border-yellow-300 py-1 rounded-lg w-28 mb-1"
                    onPress={() => navigation.navigate("WithdrawPoints")}
                    activeOpacity={0.8}
                  >
                    <Text className="text-white text-base font-psemibold mx-2">Withdrawal Point</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="flex-col justify-center items-center border border-yellow-300 py-1 rounded-lg w-28"
                    onPress={openWhatsApp}
                    activeOpacity={0.7}
                  >
                    <Image
                      source={constants.whatsappIcon}
                      className="w-8 h-8"
                      resizeMode="contain"
                    />
                    <Text className="text-white text-base font-psemibold mx-2">Whatsapp</Text>
                  </TouchableOpacity>
                </View>
            </View>
          </View>

          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View className="bg-[#219C90] m-2 min-h-screen rounded-xl p-2"></View>
          </ScrollView>
        </View>
        <StatusBar backgroundColor="#219C90" style="light" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="">
      <View className="bg-[#e0f5ff] h-full">
        <View className="bg-[#219C90] w-full justify-center px-1 rounded-b-xl pb-2">
          {/* start */}
          <View className="overflow-hidden pb-2">
            <Animated.View
              className="flex-row justify-center items-center"
              style={{ transform: [{ translateX }] }}
            >
              {userStatus == "DISABLED" || userStatus == "false" ? (
                <Text className="text-white font-pbold text-lg">
                  Welcome to DHAN GAMA ENTERTAINMENT APP!
                </Text>
              ) : (
                <Text className="text-white font-pbold text-xl">
                  Welcome to DHAN GAMA Betting APP!
                </Text>
              )}
            </Animated.View>
          </View>
          <View className="flex-row justify-evenly items-center">
            <View className="flex-col items-center">
              <TouchableOpacity
                className="flex-col justify-center items-center border border-yellow-300 py-2 rounded-lg mx-2 w-36 mb-1"
                onPress={() => navigation.navigate("Add Points")}
                activeOpacity={0.8}
              >
                <Text className="text-white text-lg font-psemibold mx-2">Add Point</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-col justify-center items-center border border-yellow-300 py-2 rounded-lg mx-2 w-36"
                onPress={makePhoneCall}
                activeOpacity={0.7}
              >
                <Image
                  source={constants.callIcon}
                  className="w-10 h-10"
                  resizeMode="contain"
                />
                <Text className="text-white text-lg font-psemibold mx-2">Call Us</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-col items-center">
              <TouchableOpacity
                className="flex-col justify-center items-center border border-yellow-300 py-2 rounded-lg mx-2 w-36 mb-1"
                onPress={() => navigation.navigate("Withdraw Points")}
                activeOpacity={0.8}
              >
                <Text className="text-white text-lg font-psemibold mx-2">Withdraw Point</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-col justify-center items-center border border-yellow-300 py-2 rounded-lg mx-2 w-36"
                onPress={openWhatsApp}
                activeOpacity={0.7}
              >
                <Image
                  source={constants.whatsappIcon}
                  className="w-10 h-10"
                  resizeMode="contain"
                />
                <Text className="text-white text-lg font-psemibold mx-2">Whatsapp</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* end */}
          {/* <View className="flex items-center px-1">
            <Image source={HomePageImage} className="w-full h-44" />
          </View> */}
          {/* <View className="flex flex-wrap flex-row mt-2">
            <View className="w-1/4">
              <CustomButton
                imgSource={callIcon}
                customImageStyles={"w-6 h-6"}
                text={"Call"}
                textStyles={"text-white text-[10px] font-pbold"}
                customStyles={"bg-[#219C90] border-2 border-yellow-300"}
              />
            </View>
            <View className="w-1/4">
              <CustomButton
                imgSource={whatsappIcon}
                customImageStyles={"w-6 h-6"}
                text={"Whatsapp"}
                textStyles={"text-white text-[10px] font-pbold"}
                customStyles={"bg-[#219C90] border-2 border-yellow-300"}
              />
            </View>
            <View className="w-1/4">
              <CustomButton
                imgSource={googlePayIcon}
                customImageStyles={"w-6 h-6"}
                text={"Add Points"}
                textStyles={"text-white text-[10px] font-pbold"}
                customStyles={"bg-[#219C90] border-2 border-yellow-300"}
              />
            </View>
            <View className="w-1/4">
              <CustomButton
                imgSource={bankIcon}
                customImageStyles={"w-6 h-6"}
                text={"Withdraw"}
                textStyles={"text-white text-[10px] font-pbold"}
                customStyles={"bg-[#219C90] border-2 border-yellow-300"}
              />
            </View>
          </View> */}
          {/* games */}
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View className="bg-[#219C90] m-2 min-h-screen rounded-xl p-2">
            {userStatus == "DISABLED" || userStatus == "false" ? (
              <View>
                {homeData?.map((item) => (
                  <View
                    className="flex-row justify-between items-center bg-white rounded-xl p-4 my-1"
                    key={item?.id}
                  >
                    <Text className="font-pbold">{item?.name}</Text>
                    <Text className="font-pbold">{`${item?.open ? item?.open : "***"
                      }-${item?.jodi}-${item?.close ? item?.close : "***"
                      }`}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <View>
                {homeData?.map((item) => (
                  <MarketStatusCard
                    key={item?.id}
                    marketOpenTiming={`Open ${convertTime(item?.open_time)}`}
                    marketCloseTiming={`Close ${convertTime(item?.close_time)}`}
                    marketStatus={
                      currentTime < item?.close_time
                        ? "Market Open"
                        : "Market Closed"
                    }
                    gameName={item?.name}
                    result={`${item?.open ? item?.open : "***"}-${item?.jodi}-${item?.close ? item?.close : "***"
                      }`}
                    marketStatusViewStyles={
                      currentTime < item?.close_time
                        ? "border-green-500"
                        : "border-red-500"
                    }
                    marketStatusTextStyles={
                      currentTime < item?.close_time
                        ? "text-green-500"
                        : "text-red-500"
                    }
                    playIcon={
                      currentTime < item?.close_time
                        ? constants.playIconOpen
                        : constants.playIconClose
                    }
                    onPress={() => {
                      if (currentTime < item?.close_time)
                        navigation.navigate("Select Game");
                      else {
                        Alert.alert("Message", "Market closed.");
                      }
                    }}
                    isDisabled={
                      userStatus == "DISABLED" || userStatus == "false"
                    }
                  />
                ))}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      <StatusBar backgroundColor="#219C90" style="light" />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  animatedContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
