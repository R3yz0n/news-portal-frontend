import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APIURL } from "../../utils/constants";
import { getToken } from "../../helpers/getToken";
import { apiOfflineError } from "../apiOfflineError";
import toast from "react-hot-toast";

export const fetchAllUsers = createAsyncThunk(
  "Fetch All Users",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${APIURL}/user?page=${values.page}&size=${values.size}&filter=${values.filter}`,
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

export const addUser = createAsyncThunk(
  "user/add",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await axios.post(`${APIURL}/user`, userData, getToken());
      toast.success("User Added sucessfully.", { duration: 2500 });
      return data.data;
    } catch (error) {
      if (error.response && error.response) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(apiOfflineError());
      }
    }
  },
);

export const fetchSingleUser = createAsyncThunk(
  "Fetch Single Category",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${APIURL}/user/details/${id}`);
      return res?.data?.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(apiOfflineError());
      }
    }
  },
);

export const editUserById = createAsyncThunk(
  "user/edit",
  async (values, { rejectWithValue }) => {
    try {
      const data = await axios.put(
        `${APIURL}/user/${values.id}`,
        values.formData,
        getToken(),
      );
      toast.success("User updated sucessfully.", { duration: 2500 });
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
