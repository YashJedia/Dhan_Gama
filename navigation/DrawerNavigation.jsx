import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../screens/Home";
import AdminHomeMessage from "../screens/AdminHomeMessage";
import Profile from "../screens/Profile";
import MyWallet from "../screens/MyWallet";
import AddPoints from "../screens/AddPoints";
import BankDetails from "../screens/BankDetails";
import WinHistory from "../screens/WinHistory";
import BidHistory from "../screens/BidHistory";
import HowToPlay from "../screens/HowToPlay";
import Notice from "../screens/Notice";
import ContactUs from "../screens/ContactUs";
import ChangePassword from "../screens/ChangePassword";
import CustomDrawerContent from "./CustomDrawerContent";
import { Feather, Ionicons } from "@expo/vector-icons";
import HeaderButton from "../components/HeaderButton";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getProfile } from "@/store/thunk/profileThunk";
import Login from "@/screens/Login";
import Notifications from "@/screens/Notifications";
import GameScreen from "@/screens/GameScreen";
import SingleGame from "@/screens/SingleGame";
import JodiGame from "@/screens/JodiGame";
import SinglePanelGame from "@/screens/SinglePanelGame";
import DoublePanelGame from "@/screens/DoublePanelGame";
import TriplePanelGame from "@/screens/TriplePanelGame";
import HalfSangamGame from "@/screens/HalfSangamGame";
import FullSangamGame from "@/screens/FullSangamGame";
import AddFundsTransactions from "@/screens/AddFundsTransactions";
import PayoutTransactions from "@/screens/PayoutTransactions";
import WithdrawPoints from "../screens/WithdrawPoints";
import Transactions from "../screens/Transactions";
import SelectGame from "../screens/SelectGame";
import GameRates from "../screens/GameRates";
import usePushNotifications from "@/utils/usePushNotifications";
import axios from "axios";

const DrawerNavigation = () => {
  const [userStatus, setUserStatus] = useState("");
  const { expoPushToken, notification } = usePushNotifications();
  const userId = AsyncStorage.getItem("userId");
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);
  useEffect(() => {
    async function userAuth() {
      await dispatch(getProfile());
      const status = await AsyncStorage.getItem("userStatus");
      setUserStatus(status);
    }
    userAuth();
  }, []);

  useEffect(() => {
    const sendExpoToken = async () => {
      const userId = await AsyncStorage.getItem("userId");
      const tokenString = expoPushToken?.data;
      const start = tokenString.indexOf("[") + 1;
      const end = tokenString.indexOf("]");
      const extractedValue = tokenString.substring(start, end);
      try {
        const { data } = await axios.post(
          `api/updatetoken/${userId}`,
          {
            user_id: userId,
            user_token: extractedValue,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
      } catch (error) {
        console.log(error);
      }
    };
    if (userStatus != "DISABLED" && userStatus != "false") {
      if (expoPushToken?.data && userId) {
        sendExpoToken();
      }
    }
  }, [expoPushToken?.data, userId]);

  const screenOptions = ({ navigation, route }) => ({
    headerStyle: { backgroundColor: "#219C90" },
    headerTintColor: "#fff",
    headerTitle: route.name === "Home" ? "DHAN GAMA" : route.name,
    headerShown: route.name !== "Login",
    headerTitleStyle: { fontWeight: "bold" },
    headerLeft: () => {
      if (
        route.name === "Game Screen" ||
        route.name === "Single Game" ||
        route.name === "Jodi Game" ||
        route.name === "Single Panel Game" ||
        route.name === "Double Panel Game" ||
        route.name === "Triple Panel Game" ||
        route.name === "Half Sangam Game" ||
        route.name === "Full Sangam Game" ||
        route.name === "Add Funds Transactions" ||
        route.name === "Payout Transactions" ||
        route.name === "Select Game"
      ) {
        return (
          <TouchableOpacity
            className="flex justify-center items-center ml-2"
            activeOpacity={0.9}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          // <HeaderButton
          //   iconName={"arrow-back"}
          //   onPress={() => navigation.goBack()}
          // />
        );
      } else {
        return (
          <TouchableOpacity
            className="flex justify-center items-center ml-2"
            activeOpacity={0.9}
            onPress={() => navigation.openDrawer()}
          >
            <Feather name="menu" size={24} color="white" />
          </TouchableOpacity>
          // <HeaderButton
          //   iconName={"menu"}
          //   onPress={() => navigation.openDrawer()}
          // />
        );
      }
    },
    headerRight: () => {
      if (userStatus == "DISABLED" || userStatus == "false") {
        return null;
      } else if (
        (route.name === "Home" ||
          route.name === "Add Points" ||
          route.name === "Withdraw Points" ||
          route.name === "Game Screen") &&
        userStatus.length
      ) {
        return (
          <View className="flex-row">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Notifications")}
              className="flex-row items-center"
            >
              <Ionicons name="notifications" size={24} color="#fff" />
              {/* <Text className="ml-1 text-[20px] text-white">20</Text> */}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("My Wallet")}
              className="m-2 flex-row items-center"
            >
              <Ionicons name="diamond" size={24} color="#fff" />
              <Text className="ml-1 text-[20px] text-white">
                {Math.floor(profile?.user_wallet * 100) / 100}
              </Text>
            </TouchableOpacity>
          </View>
        );
      } else {
        return null;
      }
    },
  });

  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={screenOptions}
    >
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="My Wallet" component={MyWallet} />
      <Drawer.Screen name="Add Points" component={AddPoints} />
      <Drawer.Screen name="Withdraw Points" component={WithdrawPoints} />
  <Drawer.Screen name="Admin Home Message" component={AdminHomeMessage} />
      {/* <Drawer.Screen name="Bank Details" component={BankDetails} /> */}
      {/* <Drawer.Screen name="Win History" component={WinHistory} /> */}
      <Drawer.Screen name="My Bids" component={BidHistory} />
      <Drawer.Screen name="How to Play" component={HowToPlay} />
      <Drawer.Screen name="Game Rates" component={GameRates} />
      <Drawer.Screen name="Notice" component={Notice} />
      <Drawer.Screen name="Contact Us" component={ContactUs} />
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="Change Password" component={ChangePassword} />
      <Drawer.Screen name="Notifications" component={Notifications} />
      {/* <Drawer.Screen name="GameType" component={GameType} /> */}
      <Drawer.Screen name="Game Screen" component={GameScreen} />
      <Drawer.Screen name="Single Game" component={SingleGame} />
      <Drawer.Screen name="Jodi Game" component={JodiGame} />
      <Drawer.Screen name="Single Panel Game" component={SinglePanelGame} />
      <Drawer.Screen name="Double Panel Game" component={DoublePanelGame} />
      <Drawer.Screen name="Triple Panel Game" component={TriplePanelGame} />
      <Drawer.Screen name="Half Sangam Game" component={HalfSangamGame} />
      <Drawer.Screen name="Full Sangam Game" component={FullSangamGame} />
      <Drawer.Screen name="Transactions" component={Transactions} />
      <Drawer.Screen name="Select Game" component={SelectGame} />
      <Drawer.Screen
        name="Add Funds Transactions"
        component={AddFundsTransactions}
      />
      <Drawer.Screen
        name="Payout Transactions"
        component={PayoutTransactions}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
