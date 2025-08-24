import { createSlice } from "@reduxjs/toolkit";
import { userBids } from "../thunk/bidThunk";

const bidSlice = createSlice({
  name: "bid",
  initialState: {
    bidData: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.bidData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userBids.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userBids.fulfilled, (state, action) => {
        state.loading = false;
        state.bidData = action.payload.data.bids;
      })
      .addCase(userBids.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = bidSlice.actions;
export default bidSlice.reducer;
