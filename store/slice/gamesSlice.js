import { createSlice } from "@reduxjs/toolkit";
import { fetchGames } from "../thunk/gamesThunk";
const gamesDataSlice = createSlice({
  name: "games",
  initialState: {
    gamesData: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.gamesData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.loading = false;
        state.gamesData = action.payload.data.games;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = gamesDataSlice.actions;
export default gamesDataSlice.reducer;
