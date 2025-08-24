import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { gameTypes } from "@/store/thunk/gameTypeThunk";
import constants from "@/utils/constants";
import { Ionicons } from "@expo/vector-icons"; // Add this import

const SelectGame = ({ navigation }) => {
  const { gameType } = useSelector((state) => state.gametype);
  const { profile } = useSelector((state) => state.profile); // Add this line
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchGameTypes = async () => {
      try {
        await dispatch(gameTypes());
      } catch (error) {
        console.log(error);
      }
    };
    fetchGameTypes();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("My Wallet")}
          style={{
            marginRight: 12,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="diamond" size={24} color="#fff" />
          <Text
            style={{ marginLeft: 4, fontSize: 20, color: "#fff" }}
          >{`${Math.floor((profile?.user_wallet ?? 0) * 100) / 100}`}</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, profile]);

  return (
    <SafeAreaView className="bg-[#e0f5ff]">
      <ScrollView className="h-full">
        <View className="flex justify-center">
          <View className="flex-row flex-wrap justify-center items-center py-2">
            {gameType?.map((item) => (
              <TouchableOpacity
                key={item?.gt_id}
                className="rounded-full bg-[#219C90] flex-col justify-center items-center w-36 h-36 mx-2 my-3 border border-yellow-400 p-2"
                activeOpacity={0.9}
                onPress={() =>
                  navigation.navigate("Game Screen", {
                    gameTypeId: item?.gt_id,
                    gameTypeName: item?.gt_name,
                    gameTypeMinPrice: item?.gt_min_price,
                    gameTypeRate: item?.gt_rate,
                  })
                }
              >
                <View className="w-14 h-14 mb-1">
                  <Image
                    source={
                      item?.gt_name == "Single"
                        ? constants.singleGameImage
                        : item?.gt_name == "Jodi"
                        ? constants.jodiGameImage
                        : item?.gt_name == "Single Panel"
                        ? constants.singlePanelGameImage
                        : item?.gt_name == "Double Panel"
                        ? constants.doublePanelGameImage
                        : item?.gt_name == "Triple Panel"
                        ? constants.triplePanelGameImage
                        : item?.gt_name == "Half Sangam"
                        ? constants.halfSangamGameImage
                        : item?.gt_name == "Full Sangam" &&
                          constants.fullSangamGameImage
                    }
                    className="w-14 h-14"
                    resizeMode="contain"
                  />
                </View>
                <Text className="text-white text-center font-psemibold text-sm mx-2">
                  {item?.gt_name == "Single"
                    ? "Single Digit"
                    : item?.gt_name == "Jodi"
                    ? "Jodi Digit"
                    : item?.gt_name == "Single Panel"
                    ? "Single Panna"
                    : item?.gt_name == "Double Panel"
                    ? "Double Panna"
                    : item?.gt_name == "Triple Panel"
                    ? "Triple Panna"
                    : item?.gt_name == "Half Sangam"
                    ? "Half Sangam"
                    : item?.gt_name == "Full Sangam" && "Full Sangam"}
                  {/* "gt_min_price": "10",
                      "gt_rate": "100", */}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#219C90" style="light" />
    </SafeAreaView>
  );
};

export default SelectGame;
