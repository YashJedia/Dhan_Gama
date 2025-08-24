import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, thunkAPI) => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      console.log(userId);

      const { data } = await axios.get(`api/user-profile/${userId}`, {
        withCredentials: true,
      });
      if (data?.data?.profile) {
        await AsyncStorage.setItem(
          "userStatus",
          String(data?.data?.profile?.user_status)
        );
      }

      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (userData, thunkAPI) => {
    const userId = await AsyncStorage.getItem("userId");
    try {
      await axios.post(
        `api/update-profile/${userId}`,
        {
          email: userData.email,
          mobile: userData.mobile,
          bank_account_holder_name: userData.bank_account_holder_name,
          bank_account_no: userData.bank_account_no,
          bank_ifsc: userData.bank_ifsc,
          bank_name: userData.bank_name,
          google_pay_no: userData.google_pay_no,
          paytm_no: userData.paytm_no,
          phone_pe_no: userData.phone_pe_no,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      const { data } = await axios.get(`api/user-profile/${userId}`, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
