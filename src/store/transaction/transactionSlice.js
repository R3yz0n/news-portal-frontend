import { createSlice } from "@reduxjs/toolkit";
import {
  addTransaction,
  fetchAllTransactions,
  fetchTransactionsByClientId,
} from "./transactionAction";

const initialState = {
  loading: false,
  error: null,
  transactions: [],
  transactionsByClientId: [],
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState: initialState,
  reducers: {
    clearFields: (state) => {
      state.loading = false;
      state.error = null;
    },

    clearTransactionData: (state) => {
      state.transactions = [];
      state.transactionsByClientId = [];
    },
  },
  extraReducers: {
    [fetchAllTransactions.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.transactions = payload;
      state.loading = false;
    },
    [fetchAllTransactions.pending]: (state) => {
      state.error = null;
      state.loading = true;
      state.success = false;
    },
    [fetchAllTransactions.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
      state.success = false;
    },
    [fetchTransactionsByClientId.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.transactions = payload;
      state.loading = false;
    },
    [fetchTransactionsByClientId.pending]: (state) => {
      state.error = null;
      state.loading = true;
      state.success = false;
    },
    [fetchTransactionsByClientId.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
      state.success = false;
    },
    [addTransaction.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.transactions = payload;
      state.loading = false;
    },
    [addTransaction.pending]: (state) => {
      state.error = null;
      state.loading = true;
      state.success = false;
    },
    [addTransaction.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
      state.success = false;
    },
  },
});

export const { clearFields, clearTransactionData } = transactionSlice.actions;
export default transactionSlice.reducer;
