import { useEffect, useState } from "react";
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import DrawerNavigation from "./DrawerNavigation";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getProfile } from "@/store/thunk/profileThunk";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();
export default function AppNavigation() {
  const [authId, setAuthId] = useState("");
  const { profile } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    async function getUserId() {
      setLoading(true);
      await dispatch(getProfile());
      const userId = await AsyncStorage.getItem("userId");
      setAuthId(userId);
      setLoading(false);

      // const userId = await AsyncStorage.removeItem("userId");
    }
    getUserId();
  }, []);

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;
  if (loading) {
    return (
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 flex-row justify-center items-center">
          <ActivityIndicator
            style={{ transform: [{ scaleX: 3 }, { scaleY: 3 }] }}
            color="#37AFE1"
          />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <NavigationContainer>
      {authId && profile ? <DrawerNavigation /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
