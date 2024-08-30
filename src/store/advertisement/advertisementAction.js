import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { APIURL } from "../../utils/constants";
import { getToken } from "../../helpers/getToken";
import toast from "react-hot-toast";

export const fetchAllAdvertisement = createAsyncThunk(
  "Fetch All Advertisements",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${APIURL}/advertisement`);
      return res.data.data;
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

export const getAdvertisementById = createAsyncThunk(
  "Get Advertisements By Id",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${APIURL}/advertisement/detail/${values}`);
      return res.data.data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      } else {
        // console.log(error.message);
        return rejectWithValue(
          "There is a problem with the server. Please try refreshing the page.",
        );
      }
    }
  },
);

export const updateAdvertisement = createAsyncThunk(
  "Update Advertisement",
  async (values, { rejectWithValue }) => {
    console.log(typeof values.rate);
    try {
      const res = await axios.put(
        `${APIURL}/advertisement/${values.id}`,
        { rate: values.rate },
        getToken(),
      );
      toast.success("Update successful.", { duration: 2500 });
      // console.log(res.data);
      return res.data.data;
    } catch (error) {
      if (error.response && error.response.data.error) {
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
