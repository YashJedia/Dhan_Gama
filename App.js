import { Provider } from "react-redux";
import AppNavigation from "./navigation/AppNavigation";
import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./store/slice/profileSlice";
import homeReducer from "./store/slice/homeSlice";
import bidReducer from "./store/slice/bidSlice";
import gameTypeReducer from "./store/slice/gameTypeSlice";
import gamesReducer from "./store/slice/gamesSlice";
import addFundsTransactionsReducer from "./store/slice/addFundsTransactionsSlice";
import payoutTransactionsReducer from "./store/slice/payoutTransactionsSlice";
import notificationsReducer from "./store/slice/notificationsSlice";
import settingReducer from "./store/slice/settingSlice";

import axios from "axios";
import { HomeMessageProvider } from "./context/HomeMessageContext";
import { baseUrl } from "./utils/common";

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    // auth: authReducer,
    home: homeReducer,
    bid: bidReducer,
    gametype: gameTypeReducer,
    games: gamesReducer,
    addfundstransactions: addFundsTransactionsReducer,
    payoutTransactions: payoutTransactionsReducer,
    notifications: notificationsReducer,
    setting: settingReducer,
  },
});

axios.defaults.baseURL = baseUrl();

export default function App() {
  return (
    <Provider store={store}>
      <HomeMessageProvider>
        <AppNavigation />
      </HomeMessageProvider>
    </Provider>
  );
}
