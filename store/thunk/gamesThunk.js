import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchGames = createAsyncThunk(
  "games/all",
  async (gameId, thunkAPI) => {
    try {
      // const userId = await AsyncStorage.getItem("userId");
      const { data } = await axios.get(`api/games/${gameId}`, {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
