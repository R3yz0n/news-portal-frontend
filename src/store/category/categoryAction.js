import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APIURL } from "../../utils/constants";
import { getToken } from "../../helpers/getToken";
import { apiOfflineError } from "../apiOfflineError";
import toast from "react-hot-toast";

export const fetchAllCategories = createAsyncThunk(
  "Fetch All Categories",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${APIURL}/category`);
      return res.data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(apiOfflineError());
      }
    }
  },
);

export const addCategory = createAsyncThunk(
  "category/add",
  async (categoryData, { rejectWithValue }) => {
    try {
      const data = await axios.post(
        `${APIURL}/category`,
        categoryData,
        getToken(),
      );
      toast.success("Category added successful.", { duration: 2500 });
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

export const fetchSingleCategory = createAsyncThunk(
  "Fetch Single Category",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${APIURL}/category/${id}`);
      return res.data.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(apiOfflineError());
      }
    }
  },
);

export const editCategoryById = createAsyncThunk(
  "category/edit",
  async (item, { rejectWithValue }) => {
    try {
      const data = await axios.put(
        `${APIURL}/category/${item.id}`,
        item.name,
        getToken(),
      );
      toast.success("Category updated successful.", { duration: 2500 });
      return data.data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(apiOfflineError());
      }
    }
  },
);
