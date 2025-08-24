import { createSlice } from "@reduxjs/toolkit";
import { fetchNotifications } from "../thunk/notificationsThunk";

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    notificationsData: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.notificationsData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notificationsData = action.payload.data.notification;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = notificationsSlice.actions;
export default notificationsSlice.reducer;
