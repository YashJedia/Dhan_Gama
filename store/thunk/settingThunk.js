import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const setting = createAsyncThunk("setting/all", async (_, thunkAPI) => {
  try {
    const { data } = await axios.get("api/setting", {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
