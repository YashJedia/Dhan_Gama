import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "@/store/thunk/profileThunk";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import axios from "axios";
import { baseUrl } from "@/utils/common";

const MyWallet = ({ navigation }) => {
  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [isQrFetching, setIsQrFetching] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(getProfile());
    setRefreshing(false);
  };

  const downloadAndSaveImage = async () => {
    setIsQrFetching(true);
    try {
      if (!status?.granted) {
        const permission = await requestPermission();
        if (!permission.granted) {
          Alert.alert(
            "Permission Denied",
            "You need to allow access to save files."
          );
          return;
        }
      }

      const { data } = await axios.get("api/get-qr-code", {
        withCredentials: true,
      });
      const qrImage = baseUrl() + data?.qr_code_image?.substring(1);

      // Download the image to a temporary directory
      const fileUri = FileSystem.documentDirectory + "qr-code.jpg";
      const { uri } = await FileSystem.downloadAsync(qrImage, fileUri);

      // Save the image to the Downloads folder
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);

      Alert.alert("Success", "Image saved to Downloads folder.");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to download and save the image.");
    } finally {
      setIsQrFetching(false);
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
        <View className="bg-[#BBE9FF] min-h-[10vh] justify-center my-6 mx-6 p-4 rounded-lg">
          <Text className="text-[#0F67B1] font-pbold">Available Points</Text>
          <View className="flex-row space-x-1">
            <Ionicons name="diamond" size={24} color="#000" />
            <Text className="text-[#0F67B1] font-pbold text-[15px]">
              {profile?.user_wallet}
            </Text>
          </View>
        </View>
        <View className="flex-col bg-[#BBE9FF] justify-center px-4 py-6 mx-6 rounded-lg space-y-4">
          <TouchableOpacity
            className="flex-row justify-center items-center bg-blue-400 rounded-full p-3"
            activeOpacity={0.9}
            onPress={() => navigation.navigate("Add Points")}
          >
            <MaterialCommunityIcons
              name="wallet-plus"
              size={28}
              color="white"
            />
            <Text className="text-xl text-white font-psemibold ml-2">
              Add Points
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row justify-center items-center bg-blue-400 rounded-full p-3"
            activeOpacity={0.9}
            disabled={isQrFetching}
            onPress={() => downloadAndSaveImage()}
          >
            <AntDesign name="qrcode" size={24} color="white" />
            <Text className="text-xl text-white font-psemibold ml-2">
              Download QR
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#219C90" style="light" />
    </SafeAreaView>
  );
};

export default MyWallet;
