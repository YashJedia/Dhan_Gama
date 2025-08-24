import { createSlice } from "@reduxjs/toolkit";
import { fetchTransactions } from "../thunk/addFundsTransactionsThunk";

const transactionsSlice = createSlice({
  name: "addfundstransactions",
  initialState: {
    transactionsData: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.transactionsData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactionsData = action.payload.data.transactions;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = transactionsSlice.actions;
export default transactionsSlice.reducer;
