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
import { Linking } from 'react-native';
// import PayU/UPI intent integration here (see comments below)
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
  const suggestedAmounts = [300, 500, 1000, 2000, 3000, 4000, 5000, 10000];
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const [isQrFetching, setIsQrFetching] = useState(false);
  const [paymentMode, setPaymentMode] = useState('upi'); // 'upi' or 'manual'
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
      setImageType(
        pickerResult.assets[0].mimeType
          ? pickerResult.assets[0].mimeType.substring(6)
          : ''
      );
    }
  };

  const submitRequest = async () => {
    setIsSubmitting(true);
    const userId = await AsyncStorage.getItem("userId");

    if (paymentMode === 'manual') {
      // Manual upload -> send multipart/form-data to backend
      let formData = new FormData();
      if (selectedImage) {
        formData.append('image', {
          uri: selectedImage,
          type:
            imageType === 'jpeg'
              ? 'image/jpeg'
              : imageType === 'png'
              ? 'image/png'
              : imageType === 'jpg' && 'image/jpg',
          name: uuid.v4() + '.' + (imageType || 'jpg'),
        });
      }

      formData.append('user_id', userId);
      formData.append('amount', requestForm.amount);
      formData.append('payment_method', requestForm.paymentMethod);
      formData.append('name', requestForm.username);
      formData.append('txnId', requestForm.transactionId);

      try {
        const response = await axios.post('api/add-payment-request', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });
        Alert.alert('Message', response.data.message || 'Request submitted');
      } catch (error) {
        console.log(error);
        Alert.alert('Error', 'Failed to add request.');
      } finally {
        setRequestForm({
          amount: '',
          paymentMethod: '',
          username: '',
          transactionId: '',
        });
        setSelectedImage(null);
        setIsSubmitting(false);
      }
      return;
    }

    // UPI flow (open UPI intent)
    try {
      // Step 1: Generate UPI deep link
      const upiId = 'your-upi-id@upi'; // TODO: replace with actual UPI id or fetch from backend
      const name = 'Your Business Name';
  // UPI `tr` must be alphanumeric and <= 35 chars. Use a simple timestamp-prefixed id.
  const transactionRef = `TXN${Date.now()}`; // e.g. TXN169645... (numeric suffix)

      // Validate amount
      if (!requestForm.amount || isNaN(Number(requestForm.amount))) {
        setIsSubmitting(false);
        return Alert.alert('Message', 'Please enter a valid amount.');
      }

      const amountFixed = Number(requestForm.amount).toFixed(2); // e.g. 100.00

      // Minimal set of params to maximize compatibility across UPI apps
      const params = new URLSearchParams({
        pa: upiId,
        pn: name,
        am: amountFixed,
        tr: transactionRef,
        tn: 'Add Points',
        cu: 'INR',
      }).toString();

      const upiUrl = `upi://pay?${params}`;
      console.log('UPI URI:', upiUrl);

        const supported = await Linking.canOpenURL(upiUrl);
        if (!supported) {
          Alert.alert('No UPI app', 'No UPI app found on device. Switching to Manual mode.');
          setPaymentMode('manual');
          setIsSubmitting(false);
          return;
        }

        try {
          await Linking.openURL(upiUrl);
          Alert.alert(
            'Payment Initiated',
            'Please complete the payment in your UPI app. After payment, enter the transaction ID and upload a screenshot for admin verification.'
          );
        } catch (err) {
          console.error('Failed to open UPI app:', err);
          Alert.alert('Payment Error', 'Failed to open UPI app. Switching to Manual mode.');
          setPaymentMode('manual');
        }
      } catch (error) {
        console.error('UPI flow error:', error);
        Alert.alert('Error', error.message || 'Failed to start payment. Switching to Manual mode.');
        setPaymentMode('manual');
      } finally {
        setIsSubmitting(false);
    }
  };
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
  // };

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
  // Removed stray closing brace here
  }
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
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 12 }}>
            <TouchableOpacity
              onPress={() => setPaymentMode('upi')}
              style={{
                backgroundColor: paymentMode === 'upi' ? '#0F67B1' : '#e6f2fb',
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 20,
                marginRight: 8,
              }}
            >
              <Text style={{ color: paymentMode === 'upi' ? 'white' : '#0F67B1', fontWeight: '600' }}>UPI</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPaymentMode('manual')}
              style={{
                backgroundColor: paymentMode === 'manual' ? '#0F67B1' : '#e6f2fb',
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 20,
              }}
            >
              <Text style={{ color: paymentMode === 'manual' ? 'white' : '#0F67B1', fontWeight: '600' }}>Manual Upload</Text>
            </TouchableOpacity>
          </View>
          {paymentMode === 'manual' && (
            <>
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
            </>
          )}
          <View className="my-2">
            <Text className="ml-1 font-psemibold text-md">Points</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 8 }}>
              {suggestedAmounts.map((amt) => (
                <TouchableOpacity
                  key={amt}
                  style={{ backgroundColor: '#219C90', borderRadius: 16, padding: 8, margin: 4 }}
                  onPress={() => setRequestForm({ ...requestForm, amount: amt.toString() })}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>{`₹${amt}`}</Text>
                </TouchableOpacity>
              ))}
            </View>
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
                if (parseInt(e) > 10000) {
                  return Alert.alert(
                    "Message",
                    "Maximum allowed amount is 10000."
                  );
                }
                setRequestForm({ ...requestForm, amount: e });
              }}
              value={requestForm.amount || ""}
              keyboardTypeValue={"numeric"}
            />
          </View>

          {/* Screenshot upload section */}
          {paymentMode === 'manual' && (
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

              <View style={{ marginTop: 10 }}>
                <Text className="ml-1 font-psemibold text-md">Upload Payment Screenshot</Text>
                <TouchableOpacity
                  style={{ backgroundColor: '#219C90', borderRadius: 16, padding: 10, marginTop: 8, alignItems: 'center' }}
                  onPress={pickImage}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    {selectedImage ? 'Change Screenshot' : 'Upload Screenshot'}
                  </Text>
                </TouchableOpacity>
                {selectedImage && (
                  <Image
                    source={{ uri: selectedImage }}
                    style={{ width: 120, height: 120, marginTop: 10, borderRadius: 8 }}
                    resizeMode="cover"
                  />
                )}
              </View>
            </View>
          )}
          <CustomButton
            text={paymentMode === 'upi' ? 'Pay' : 'Submit'}
            textStyles={"text-white"}
            customStyles={"bg-[#219C90] mt-6 "}
            onPress={() => {
              // Basic validation
              if (!requestForm.amount || !/^[0-9]+$/.test(requestForm.amount)) {
                return Alert.alert('Message', 'Please enter a valid amount.');
              }
              if (paymentMode === 'manual') {
                if (!requestForm.username) {
                  return Alert.alert('Message', 'Please enter your name.');
                }
                if (!requestForm.paymentMethod) {
                  return Alert.alert('Message', 'Please enter payment method.');
                }
              }
              submitRequest();
            }}
            isloading={isSubmitting}
          />
          {/*
            PayU UPI Integration Steps:
            1. Register for a PayU merchant account and get your credentials (Merchant Key, Salt).
            2. Update your backend to create PayU orders and generate UPI intent URLs.
            3. Use the UPI intent URL to open the user's UPI app from React Native (see above).
            4. After payment, verify status via backend (polling or webhook).
            5. Remove all Razorpay code and dependencies from your project.
            For more info: https://devguide.payu.in/upi-intent/
          */}
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#219C90" style="light" />
    </SafeAreaView>

  );
}
export default AddPoints;
