import { createSlice } from "@reduxjs/toolkit";
import { gameTypes } from "../thunk/gameTypeThunk";

const gameTypeSlice = createSlice({
  name: "gametype",
  initialState: {
    gameType: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.gameType = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(gameTypes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(gameTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.gameType = action.payload.data.gametypes;
      })
      .addCase(gameTypes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = gameTypeSlice.actions;
export default gameTypeSlice.reducer;
