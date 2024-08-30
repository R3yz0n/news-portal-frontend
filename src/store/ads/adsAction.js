import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APIURL } from "../../utils/constants";

export const fetchAllHomepageAds = createAsyncThunk(
  "Fetch All Homepage Ads",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${APIURL}/ads/homepage`);
      return res.data?.advertises;
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

export const fetchSpecificCategoryAds = createAsyncThunk(
  "Fetch specific category ads",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${APIURL}/ads/category/${values}`);
      return res.data.advertises;
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue("There is the problem with the server");
      }
    }
  },
);
