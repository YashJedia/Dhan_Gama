import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputBox from "@/components/InputBox";
import CustomButton from "@/components/CustomButton";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { baseUrl } from "@/utils/common";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import requestStoragePermission from "@/utils/androidPermission";
import axios from "axios";
const AddPoints = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [isQrFetching, setIsQrFetching] = useState(false);
  const [requestForm, setRequestForm] = useState({
    amount: "",
    paymentMethod: "",
    username: "",
    transactionId: "",
  });
  const [imageType, setImageType] = useState("");
  const pickImage = async () => {
    // Ask for permission to access the gallery
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
      Alert.alert("Permissions", "Permission to access gallery is required!");
      return;
    }

    // Pick an image from the gallery
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setSelectedImage(pickerResult.assets[0].uri);
    }
    setImageType(pickerResult.assets[0].mimeType.substring(6));
  };

  const submitRequest = async () => {
    setIsSubmitting(true);
    const userId = await AsyncStorage.getItem("userId");
    let formData = new FormData();
    if (selectedImage)
      formData.append("image", {
        uri: selectedImage,
        type:
          imageType === "jpeg"
            ? "image/jpeg"
            : imageType === "png"
            ? "image/png"
            : imageType === "jpg" && "image/jpg",
        name: uuid.v4() + "." + imageType,
      });

    formData.append("user_id", userId);
    formData.append("amount", requestForm.amount);
    formData.append("payment_method", requestForm.paymentMethod);
    formData.append("name", requestForm.username);
    formData.append("txnId", requestForm.transactionId);

    try {
      const response = await axios.post("api/add-payment-request", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      Alert.alert("Message", response.data.message);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to add request.");
    } finally {
      setRequestForm({
        amount: "",
        paymentMethod: "",
        username: "",
        transactionId: "",
      });
      setSelectedImage(null);
      setIsSubmitting(false);
    }

    // try {
    //   const response = await axios.post("YOUR_UPLOAD_URL", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });
    //   console.log("Upload success:", response.data);
    // } catch (error) {
    //   console.error("Upload failed:", error);
    // }
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
    <SafeAreaView className="bg-[#e0f5ff] py-2">
      <ScrollView className="h-full">
        <View className="bg-[#BBE9FF] min-h-[10vh] justify-center mb-6 mx-6 p-4 rounded-lg items-center">
          <Text className="text-[#0F67B1] font-pbold">!!Add Fund Notice!!</Text>
          <Text className="text-[#0F67B1] font-pbold">
            Minimum Deposit Rs. 1000
          </Text>
          <TouchableOpacity
            className="flex-row justify-center items-center bg-blue-400 rounded-full p-3"
            activeOpacity={0.9}
            disabled={isQrFetching}
            onPress={() => {
              downloadAndSaveImage();
            }}
          >
            <AntDesign name="qrcode" size={24} color="white" />
            <Text className="text-xl text-white font-psemibold ml-2">
              Download QR
            </Text>
          </TouchableOpacity>
        </View>
        <View className="bg-[#BBE9FF] min-h-[20vh] justify-center px-4 py-6 mx-6 rounded-lg">
          <View className="my-2">
            <Text className="ml-1 font-psemibold text-md">Name</Text>
            <InputBox
              icon={"person"}
              placeholder={"Enter Your Name"}
              customStyles={""}
              handleChangeText={(e) => {
                if (/[^a-zA-Z\s]/g.test(e)) {
                  return Alert.alert(
                    "Message",
                    "Input must contain only letters."
                  );
                }
                setRequestForm({ ...requestForm, username: e });
              }}
              value={requestForm.username || ""}
            />
          </View>
          <View className="my-2">
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
          <View className="my-2">
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
          <View className="my-2">
            <Text className="ml-1 font-psemibold text-md">UTR</Text>
            <InputBox
              icon={"receipt"}
              placeholder={"Enter UTR"}
              customStyles={""}
              handleChangeText={(e) =>
                setRequestForm({ ...requestForm, transactionId: e })
              }
              value={requestForm.transactionId || ""}
            />
          </View>
          <View className="my-2">
            <TouchableOpacity
              onPress={pickImage}
              className="flex flex-row bg-blue-400 rounded-lg p-1 py-1 justify-center items-center"
              activeOpacity={0.8}
            >
              <Text className="text-white text-lg font-psemibold text-center">
                Upload Screenshot
              </Text>
            </TouchableOpacity>
          </View>

          {selectedImage && (
            <View className="flex flex-col justify-center items-center w-full my-4 space-y-3">
              <Image
                source={{ uri: selectedImage }}
                resizeMode="contain"
                className="w-full h-[150px]"
              />
              <TouchableOpacity
                onPress={() => setSelectedImage(null)}
                className="flex flex-row bg-red-500 rounded-lg px-3 py-1 justify-center items-center"
                activeOpacity={0.8}
              >
                <Text className="text-white text-md font-psemibold text-center">
                  Remove Screenshot
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* <CustomButton text={"Upload Image"} onPress={uploadImage} /> */}
          <CustomButton
            text={"Submit"}
            textStyles={"text-white"}
            customStyles={"bg-[#219C90] mt-6 "}
            onPress={submitRequest}
            isloading={isSubmitting}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#219C90" style="light" />
    </SafeAreaView>
  );
};

export default AddPoints;
