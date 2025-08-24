import { createSlice } from "@reduxjs/toolkit";
import { setting } from "../thunk/settingThunk";

const settingSlice = createSlice({
  name: "setting",
  initialState: {
    settingData: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.settingData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setting.fulfilled, (state, action) => {
        state.loading = false;
        state.settingData = action.payload.data.data;
      })
      .addCase(setting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = settingSlice.actions;
export default settingSlice.reducer;
