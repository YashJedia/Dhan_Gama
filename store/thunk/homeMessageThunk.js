import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchHomeMessage = createAsyncThunk("home/message", async (_, thunkAPI) => {
  try {
    const { data } = await axios.get("api/home_message");
    return data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response?.data || { message: "Network error" });
  }
});
