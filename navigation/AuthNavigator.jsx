import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import DrawerNavigation from "./DrawerNavigation";
import { useDispatch, useSelector } from "react-redux";
import { setting } from "@/store/thunk/settingThunk";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const dispatch = useDispatch();
  const { settingData } = useSelector((state) => state.setting);
  useEffect(() => {
    async function fetchSetting() {
      await dispatch(setting());
    }
    fetchSetting();
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Drawer" component={DrawerNavigation} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
