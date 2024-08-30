import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIURL } from "../../utils/constants";
import axios from "axios";

export const fetchAllTransactions = createAsyncThunk(
  "Fetch All Transactions",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${APIURL}/transaction/history`);
      return res.data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        console.log(error.response);
        return rejectWithValue(error.response.data.error);
      } else {
        // console.log(error);
        return rejectWithValue(
          "There is a problem with the server. Please try refreshing the page.",
        );
      }
    }
  },
);

export const fetchTransactionsByClientId = createAsyncThunk(
  "Fetch Transactions By Client Id",
  async ({ selectedClient, dateRange }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${APIURL}/transaction/history/${selectedClient.toString()}`,
        dateRange,
      );
      return res.data.data;
    } catch (error) {
      if (error) {
        console.log(error.response);
        return rejectWithValue(error.response.data.error);
      }
    }
  },
);

export const addTransaction = createAsyncThunk(
  "Add Transaction",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${APIURL}/transaction`, values);
      return res.data.data;
    } catch (error) {
      if (error) {
        console.log(error.response);
        return rejectWithValue(error.response.data.error);
      }
    }
  },
);
