import { createSlice } from "@reduxjs/toolkit";
import {
  addUser,
  fetchAllUsers,
  fetchSingleUser,
  editUserById,
} from "./userAction";

const initialState = {
  loading: false,
  error: null,
  success: false,
  users: [],
  userById: {},
  total: 0,
};

const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    clearFields: (state) => {
      state.success = false;
      state.loading = false;
      state.error = null;
      state.userById = null;
    },
    clearUserData: (state) => {
      state.users = [];
      state.userById = null;
      state.total = 0;
    },
  },
  extraReducers: {
    [fetchAllUsers.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.users = payload.data;
      state.total = payload.totaldata;
      state.loading = false;
    },
    [fetchAllUsers.pending]: (state) => {
      state.error = null;
      state.loading = true;
    },
    [fetchAllUsers.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    // add user
    [addUser.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.loading = false;
    },
    [addUser.pending]: (state) => {
      state.error = null;
      state.loading = true;
      state.success = false;
    },
    [addUser.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    //get the single  user by id
    [fetchSingleUser.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.loading = false;
      state.userById = payload;
    },
    [fetchSingleUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchSingleUser.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    //update user by id
    [editUserById.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [editUserById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [editUserById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
  },
});

export default userSlice.reducer;
export const { clearFields, clearUserData } = userSlice.actions;
