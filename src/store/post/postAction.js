import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APIURL } from "../../utils/constants";
import { toast } from "react-hot-toast";
import { getToken } from "../../helpers/getToken";
import { apiOfflineError } from "../apiOfflineError";

export const fetchAllPosts = createAsyncThunk(
  "Fetch All Posts",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${APIURL}/post?page=${values.page}&size=${values.size}&filter=${values.filter}`,
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

export const getPostsByCategory = createAsyncThunk(
  "Fetch all the posts by category",
  async (slug, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${APIURL}/post/${encodeURI(slug)}`);
      return res.data.data.post;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(apiOfflineError());
      }
    }
  },
);

export const getPostsById = createAsyncThunk(
  "Fetch all a post by id",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${APIURL}/post/detail/${id}`);
      return res.data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        toast.error(apiOfflineError(), { duration: 2500 });
        return rejectWithValue(apiOfflineError());
      }
    }
  },
);

export const getPostsForHomePage = createAsyncThunk(
  "Fetch limited post by category for home page",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${APIURL}/home`);
      return res.data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        // toast.error(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      } else {
        toast.error(error.message);
        return rejectWithValue(apiOfflineError());
      }
    }
  },
);

export const addPost = createAsyncThunk(
  "post/add",
  async (postData, { rejectWithValue }) => {
    try {
      const data = await axios.post(`${APIURL}/post`, postData, getToken());
      toast.success("Post Added sucessfully.", { duration: 2500 });

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

export const updatePost = createAsyncThunk(
  "category/edit",
  async (values, { rejectWithValue }) => {
    try {
      // console.log(values);
      const data = await axios.put(
        `${APIURL}/post/${values.id}`,
        values.formData,
        getToken(),
      );
      toast.success("Post updated sucessfully.", { duration: 2500 });
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

export const deletePostById = createAsyncThunk(
  "post/delete",
  async (id, { rejectWithValue }) => {
    try {
      const data = await axios.delete(`${APIURL}/post/${id}`, getToken());
      toast.success("Post deleted successfully");
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
