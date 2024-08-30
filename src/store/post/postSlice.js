import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllPosts,
  getPostsByCategory,
  getPostsById,
  getPostsForHomePage,
  addPost,
  updatePost,
  deletePostById,
} from "./postAction";

const initialState = {
  loading: false,
  error: null,
  success: false,
  posts: [],
  postById: {},
  postByCategory: [],
  headlineNews: [],
  latestNews: [],
  homePagePost: [],
  isWait: false,
  total: 0,
};

const postSlice = createSlice({
  name: "posts",
  initialState: initialState,

  reducers: {
    clearFields: (state) => {
      state.success = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: {
    //by category
    [getPostsByCategory.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.loading = false;

      state.postByCategory = payload;
    },
    [getPostsByCategory.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getPostsByCategory.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    //for home page
    [getPostsForHomePage.fulfilled]: (state, { payload }) => {
      state.homePagePost = payload.post;
      state.headlineNews = payload.headline_news;
      state.latestNews = payload.taja_samachar;
      state.error = null;
      state.loading = false;
    },
    [getPostsForHomePage.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getPostsForHomePage.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    // by id
    [getPostsById.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.loading = false;
      state.postById = payload;
    },
    [getPostsById.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getPostsById.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    // for dashboard
    [fetchAllPosts.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.posts = payload.data;
      state.total = payload.totaldata;
      state.loading = false;
    },
    [fetchAllPosts.pending]: (state) => {
      state.error = null;
      state.loading = true;
    },
    [fetchAllPosts.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    // add post
    [addPost.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.loading = false;
    },
    [addPost.pending]: (state) => {
      state.error = null;
      state.loading = true;
    },
    [addPost.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    //update post by id
    [updatePost.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [updatePost.fulfilled]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [updatePost.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    [deletePostById.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [deletePostById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
    },
    [deletePostById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default postSlice.reducer;
export const { clearOrderData, clearFields } = postSlice.actions;
