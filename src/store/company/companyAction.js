import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APIURL } from "../../utils/constants";
import { toast } from "react-hot-toast";
import { getToken } from "../../helpers/getToken";
import { apiOfflineError } from "../apiOfflineError";

export const getCompany = createAsyncThunk(
  "Get a Company",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${APIURL}/company`);
      return res.data.data[0];
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      } else {
        toast.error(apiOfflineError());
        return rejectWithValue(apiOfflineError());
      }
    }
  },
);
export const addCompany = createAsyncThunk(
  "Add a Company",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${APIURL}/company`, values, getToken());
      toast.success("Company created sucessfully.", { duration: 2500 });
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

export const updateCompany = createAsyncThunk(
  "Update a Company",
  async (item, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${APIURL}/company/${item.id}`,
        item.formData,
        getToken(),
      );
      toast.success("Company updated sucessfully.", { duration: 2500 });
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
