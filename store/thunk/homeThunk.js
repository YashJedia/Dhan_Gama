import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const homeDetails = createAsyncThunk("home/all", async (_, thunkAPI) => {
  try {
    const { data } = await axios.get("api/home_api", {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
