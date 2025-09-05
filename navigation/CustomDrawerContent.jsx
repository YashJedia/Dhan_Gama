import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  NativeModules,
  Alert,
} from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import userImage from "../assets/images/profile.png";
import CustomDrawerItem from "../components/CustomDrawerItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "@/store/slice/profileSlice";
import { logout as homeLogout } from "@/store/slice/homeSlice";
import { CommonActions } from "@react-navigation/native";
import constants from "../utils/constants";
function CustomDrawerContent(props) {
  const { index, routes } = props.state;
  const currentRoute = routes[index].name;
  const { profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [userStatus, setUserStatus] = useState("");

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const status = await AsyncStorage.getItem("userStatus");
        setUserStatus(status);
        // console.log(status);
      } catch (error) {
        console.log(error);
        Alert.alert("Error", "An error occured");
      }
    };
    fetchUserStatus();
  }, []);

  const handleLogout = async () => {
    await dispatch(logout());
    await dispatch(homeLogout());
    await AsyncStorage.removeItem("userId");
    await AsyncStorage.removeItem("userStatus");
    props.navigation.replace("Login");
    // navigation.replace("Drawer");
    // props.navigation.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [{ name: "Login" }],
    //   })
    // );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#219C90]">
      <DrawerContentScrollView showsVerticalScrollIndicator={false} {...props}>
        <View className="">
          <View className="flex-row bg-[#219C90] items-center px-4 pt-8 pb-8">
            <View className="rounded-full border-black mr-4">
              <Image source={userImage} className="w-20 h-20 rounded-full" />
            </View>
            <View className="">
              <Text className="text-lg font-pbold text-white">
                {profile?.user_username}
              </Text>
              <Text className="text-white">{profile?.user_email}</Text>
              <Text className="text-white">{profile?.user_mobile}</Text>
            </View>
          </View>

          {userStatus == "false" || userStatus == "DISABLED" ? (
            <View className="bg-[#E0E0E0] pt-2">
              <CustomDrawerItem
              
                itemName="Admin"
                itemImage={constants.profileIcon}
                currentRoute={currentRoute}
                onPress={() => {
                  // Get homeMessage and setHomeMessage from Home screen
                  const homeScreen = props.navigation.dangerouslyGetState().routes.find(r => r.name === 'Home');
                  let homeMessage = "Welcome to DHAN GAMA ENTERTAINMENT APP!";
                  let setHomeMessage = null;
                  if (homeScreen && homeScreen.params) {
                    homeMessage = homeScreen.params.homeMessage || homeMessage;
                    setHomeMessage = homeScreen.params.setHomeMessage || null;
                  }
                  props.navigation.navigate("Admin Home Message", { homeMessage, setHomeMessage });
                }}
              />
              <CustomDrawerItem
                itemName="Home"
                itemImage={constants.homeIcon}
                currentRoute={currentRoute}
                onPress={() => {
                  props.navigation.navigate("Home");
                }}
              />

              <CustomDrawerItem
                itemName="Contact Us"
                itemImage={constants.contactUsIcon}
                currentRoute={currentRoute}
                onPress={() => {
                  props.navigation.navigate("Contact Us");
                }}
              />
              <CustomDrawerItem
                itemName="Share"
                itemImage={constants.shareIcon}
                currentRoute={currentRoute}
              />
              <CustomDrawerItem
                itemName="Rating"
                itemImage={constants.ratingIcon}
                currentRoute={currentRoute}
              />
              <CustomDrawerItem
                itemName="Change Password"
                itemImage={constants.changePasswordIcon}
                currentRoute={currentRoute}
                onPress={() => {
                  props.navigation.navigate("Change Password");
                }}
              />
              <CustomDrawerItem
                itemName="Logout"
                itemImage={constants.logoutIcon}
                currentRoute={currentRoute}
                onPress={handleLogout}
              />
            </View>
          ) : (
            <View className="bg-[#E0E0E0] pt-2">
              <CustomDrawerItem
                itemName="Home"
                itemImage={constants.homeIcon}
                currentRoute={currentRoute}
                onPress={() => {
                  props.navigation.navigate("Home");
                }}
              />
              <CustomDrawerItem
                itemName="Profile"
                itemImage={constants.profileIcon}
                currentRoute={currentRoute}
                onPress={() => {
                  props.navigation.navigate("Profile");
                }}
              />
              <CustomDrawerItem
                itemName="Admin"
                itemImage={constants.profileIcon}
                currentRoute={currentRoute}
                onPress={() => {
                  props.navigation.navigate("Admin Home Message");
                }}
              />
              <CustomDrawerItem
                itemName="My Wallet"
                itemImage={constants.walletIcon}
                currentRoute={currentRoute}
                onPress={() => {
                  props.navigation.navigate("My Wallet");
                }}
              />
              <CustomDrawerItem
                itemName="Add Points"
                itemImage={constants.addPointsIcon}
                currentRoute={currentRoute}
                onPress={() => {
                  props.navigation.navigate("Add Points");
                }}
              />
              <CustomDrawerItem
                itemName="Withdraw Points"
                itemImage={constants.withdrawPointsIcon}
                currentRoute={currentRoute}
                onPress={() => {
                  props.navigation.navigate("Withdraw Points");
                }}
              />
              <CustomDrawerItem
                itemName="Transactions"
                itemImage={constants.transactionsIcon}
                currentRoute={currentRoute}
                onPress={() => {
                  props.navigation.navigate("Transactions");
                }}
              />
              <CustomDrawerItem
                itemName="My Bids"
                itemImage={constants.bidHistoryIcon}
                currentRoute={currentRoute}
                onPress={() => {
                  props.navigation.navigate("My Bids");
                }}
              />
              <CustomDrawerItem
                itemName="How to Play"
                itemImage={constants.howToPlayIcon}
                currentRoute={currentRoute}
                onPress={() => {
                  props.navigation.navigate("How to Play");
                }}
              />
              <CustomDrawerItem
                itemName="Game Rates"
                itemImage={constants.gameRatesIcon}
                currentRoute={currentRoute}
                onPress={() => {
                  props.navigation.navigate("Game Rates");
                }}
              />
              <CustomDrawerItem
                itemName="Notice"
                itemImage={constants.noticeIcon}
                currentRoute={currentRoute}
                onPress={() => {
                  props.navigation.navigate("Notice");
                }}
              />
              <CustomDrawerItem
                itemName="Contact Us"
                itemImage={constants.contactUsIcon}
                currentRoute={currentRoute}
                onPress={() => {
                  props.navigation.navigate("Contact Us");
                }}
              />
              <CustomDrawerItem
                itemName="Share"
                itemImage={constants.shareIcon}
                currentRoute={currentRoute}
              />
              <CustomDrawerItem
                itemName="Rating"
                itemImage={constants.ratingIcon}
                currentRoute={currentRoute}
              />
              <CustomDrawerItem
                itemName="Change Password"
                itemImage={constants.changePasswordIcon}
                currentRoute={currentRoute}
                onPress={() => {
                  props.navigation.navigate("Change Password");
                }}
              />
              <CustomDrawerItem
                itemName="Logout"
                itemImage={constants.logoutIcon}
                currentRoute={currentRoute}
                onPress={handleLogout}
              />
            </View>
          )}
        </View>
        <StatusBar backgroundColor="#219C90" />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}

export default CustomDrawerContent;
