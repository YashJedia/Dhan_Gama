import { createSlice } from "@reduxjs/toolkit";
import { homeDetails } from "../thunk/homeThunk";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    homeData: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.homeData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(homeDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(homeDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.homeData = action.payload.data.data;
      })
      .addCase(homeDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = homeSlice.actions;
export default homeSlice.reducer;
