import toast from "react-hot-toast";
import { getToken } from "../../helpers/getToken";
import { APIURL } from "../../utils/constants";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiOfflineError } from "../apiOfflineError";

export const createAnAdvertises = createAsyncThunk(
  "Create Advertises",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${APIURL}/advertises`, values, getToken());
      toast.success("Advertisement added successful.", { duration: 2500 });
      return res.data.data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(apiOfflineError());
      }
    }
  },
);

export const fetchAllAdvertises = createAsyncThunk(
  "Fetch All Advertises grouped by client",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${APIURL}/advertises/list/get?page=${values.page}&size=${values.size}&filter=${values.filter}`,
        getToken(),
      );
      return res.data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(apiOfflineError());
      }
    }
  },
);

export const fetchAllAdvertisesOfClient = createAsyncThunk(
  "Fetch All Advertises  of client",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${APIURL}/advertises/client/${values}`,
        getToken(),
      );
      return res.data.data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        // console.log(error.response);
        return rejectWithValue(error.response.data.error);
      } else {
        // console.log(error);
        return rejectWithValue(apiOfflineError());
      }
    }
  },
);

export const payForAdvertise = createAsyncThunk(
  "Payment for advertise",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${APIURL}/transaction`, values, getToken());
      toast.success("Payment successful.", { duration: 2500 });
      return res.data.data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        console.log(error.response);
        return rejectWithValue(error.response.data.error);
      } else {
        // console.log(error);
        return rejectWithValue(apiOfflineError());
      }
    }
  },
);

export const getAdvertiseById = createAsyncThunk(
  "Fetch advertises by id",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${APIURL}/advertises/${values}`, getToken());
      return res.data.data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        // console.log(error.response);
        return rejectWithValue(error.response.data.error);
      } else {
        // console.log(error);
        return rejectWithValue(apiOfflineError());
      }
    }
  },
);

export const updateAdvertises = createAsyncThunk(
  "Update advertises by id",
  async (values, { rejectWithValue }) => {
    try {
      const data = await axios.put(
        `${APIURL}/advertises/${values.id}`,
        values.formData,
        getToken(),
      );
      toast.success("Advertises updated sucessfully.", { duration: 2500 });
      return data?.data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(apiOfflineError());
      }
    }
  },
);
