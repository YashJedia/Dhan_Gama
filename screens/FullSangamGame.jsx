import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import InputBox from "@/components/InputBox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { getProfile } from "@/store/thunk/profileThunk";
import { useDispatch } from "react-redux";
import { sangamValues } from "@/utils/gamePanelValues";
import CustomDropDown from "@/components/CustomDropDown";

const FullSangamGame = ({ route }) => {
  const { gameTypeId, gameId, gameName, bidType } = route.params;
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = today.toLocaleString("default", { month: "short" });
  const year = today.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;
  const [bidForm, setBidForm] = useState({
    openPanel: ["Select Open Panel"],
    closePanel: ["Select Close Panel"],
    amount: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setBidForm({
      openPanel: ["Select Open Panel"],
      closePanel: ["Select Close Panel"],
      amount: [],
    });
  }, []);

  const submitBid = async () => {
    if (
      !bidForm.openPanel[0]?.length ||
      !bidForm.closePanel[0]?.length ||
      !bidForm.amount[0]?.length
    ) {
      Alert.alert("Message", "Please fill all fields.");
      return;
    }
    if (bidForm.amount[0]?.length < 2) {
      Alert.alert("Message", "Minimum Bid Price is 10.");
      return;
    }
    if (
      bidForm.openPanel[0]?.length != 3 ||
      bidForm.closePanel[0]?.length != 3
    ) {
      Alert.alert("Message", "Invalid Bid Value.");
      return;
    }
    setIsSubmitting(true);
    const userId = await AsyncStorage.getItem("userId");

    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("game_type", gameTypeId);
    formData.append("game_id", gameId);
    formData.append("pnt", JSON.stringify(bidForm.amount));
    formData.append("num1", JSON.stringify(bidForm.openPanel));
    formData.append("num2", JSON.stringify(bidForm.closePanel));
    formData.append("bid_types", "open");
    formData.append("total", bidForm.amount[0]);

    try {
      const { data } = await axios.post("api/set_bid_hf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      Alert.alert("Message", data.data.msg);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to place bid.");
    } finally {
      setIsSubmitting(false);
      setBidForm({
        openPanel: ["Select Open Panel"],
        closePanel: ["Select Close Panel"],
        amount: [],
      });
      await dispatch(getProfile());
    }
  };

  const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);

  return (
    <SafeAreaView className="bg-[#e0f5ff] h-screen py-2">
      <ScrollView className="">
        <View className="flex flex-col bg-blue-400 rounded-lg py-2 mb-4 justify-center items-center space-x-1">
          <Text className="text-white font-pbold text-xl">{"Full Sangam"}</Text>
          <Text className="text-white font-pbold text-xl">{gameName}</Text>
          {/* <Text className="text-white font-pbold text-xs">
              (Minimum Price: {gameMinPrice})
            </Text> */}
        </View>
        <View className="bg-[#BBE9FF] px-4 py-6 mx-6 rounded-lg h-[70vh]">
          <View className="my-2">
            <Text className="ml-2 font-pregular">Date</Text>
            <InputBox
              // icon={"call"}
              placeholder={formattedDate}
              // value={form.mobile}
              customInputStyles={"text-black font-bold"}
              // customStyles={editable && "border-1 border-black"}
              editable={false}
            />
          </View>

          <View className="my-2">
            <Text className="ml-2 font-pregular">Enter Open Panel</Text>
            <TouchableOpacity
              className="flex-row bg-white items-center border border-gray-300 rounded-xl p-2"
              activeOpacity={0.9}
              onPress={() => setIsDropdownOpen1(!isDropdownOpen1)}
            >
              <Text className={`text-base ml-2 font-semibold`}>
                {bidForm.openPanel[0]}
              </Text>
            </TouchableOpacity>
            {isDropdownOpen1 && (
              <View className="flex-col absolute bg-white items-start justify-start border border-gray-300 rounded-xl p-2 h-64 w-full top-16 z-10">
                <ScrollView className="w-full">
                  {sangamValues?.map((item) => (
                    <CustomDropDown
                      key={item}
                      handlePress={() => {
                        setBidForm({
                          ...bidForm,
                          openPanel: [String(item)],
                        });
                        setIsDropdownOpen1(false);
                      }}
                      dropDownText={item}
                    />
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
          <View className="my-2">
            <Text className="ml-2 font-pregular">Enter Close Panel</Text>
            <TouchableOpacity
              className="flex-row bg-white items-center border border-gray-300 rounded-xl p-2"
              activeOpacity={0.9}
              onPress={() => setIsDropdownOpen2(!isDropdownOpen2)}
            >
              <Text className={`text-base ml-2 font-semibold`}>
                {bidForm.closePanel[0]}
              </Text>
            </TouchableOpacity>
            {isDropdownOpen2 && (
              <View className="flex-col absolute bg-white items-start justify-start border border-gray-300 rounded-xl p-2 h-64 w-full top-16 z-10">
                <ScrollView className="w-full">
                  {sangamValues?.map((item) => (
                    <CustomDropDown
                      key={item}
                      handlePress={() => {
                        setBidForm({
                          ...bidForm,
                          closePanel: [String(item)],
                        });
                        setIsDropdownOpen2(false);
                      }}
                      dropDownText={item}
                    />
                  ))}
                </ScrollView>
              </View>
            )}
            {/* <InputBox
              // icon={"call"}
              placeholder={"Enter Close Panel"}
              handleChangeText={(e) =>
                setBidForm({ ...bidForm, closePanel: [e] })
              }
              value={bidForm.closePanel[0]}
              // handleChangeText={(e) => setForm({ ...form, mobile: e })}
              // customInputStyles={
              //   editable
              //     ? "text-gray-400 font-regular"
              //     : "text-black font-regular"
              // }
              // customStyles={editable && "border-1 border-black"}
              editable={!isSubmitting}
            /> */}
          </View>
          <View className="my-2">
            <Text className="ml-2 font-pregular">Enter Points</Text>
            <InputBox
              // icon={"call"}
              placeholder={"Enter Points"}
              handleChangeText={(e) => {
                if (!/^\d*$/.test(e)) {
                  return Alert.alert(
                    "Message",
                    "Input must contain only digits."
                  );
                }
                setBidForm({ ...bidForm, amount: [e] });
              }}
              value={bidForm.amount[0] || ""}
              // handleChangeText={(e) => setForm({ ...form, mobile: e })}
              // customInputStyles={
              //   editable
              //     ? "text-gray-400 font-regular"
              //     : "text-black font-regular"
              // }
              // customStyles={editable && "border-1 border-black"}
              editable={!isSubmitting}
              keyboardTypeValue={"numeric"}
            />
          </View>
          <View className="my-2 flex justify-center items-center">
            <CustomButton
              text={"Place Bid"}
              customStyles={"bg-[#3FA2F6] w-full p-2"}
              textStyles={"text-white"}
              isloading={isSubmitting}
              onPress={submitBid}
            />
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#219C90" style="light" />
    </SafeAreaView>
  );
};

export default FullSangamGame;
