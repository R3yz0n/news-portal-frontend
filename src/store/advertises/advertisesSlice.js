import { createSlice } from "@reduxjs/toolkit";

import {
  createAnAdvertises,
  fetchAllAdvertises,
  fetchAllAdvertisesOfClient,
  getAdvertiseById,
  payForAdvertise,
  updateAdvertises,
} from "../advertises/advertisesAction";

const initialState = {
  loading: false,
  error: null,
  success: false,
  advertisesByClient: {},
  advertisesById: {},
  clientData: [],
  total: 0,
};

const advertisesSlice = createSlice({
  name: "advertises",
  initialState: initialState,
  reducers: {
    clearFields: (state) => {
      state.success = false;
      state.loading = false;
      state.error = null;
    },

    clearAdvertisesData: (state) => {
      state.advertisesByClient = {};
      state.advertisesByClient = {};
      state.clientData = [];
      state.total = 0;
    },
  },
  extraReducers: {
    [createAnAdvertises.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.loading = false;
    },
    [createAnAdvertises.pending]: (state) => {
      state.error = null;
      state.loading = true;
    },
    [createAnAdvertises.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    [updateAdvertises.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.loading = false;
    },
    [updateAdvertises.pending]: (state) => {
      state.error = null;
      state.loading = true;
    },
    [updateAdvertises.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    [fetchAllAdvertises.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.clientData = payload.data;
      state.total = payload.totaldata;
      state.loading = false;
    },
    [fetchAllAdvertises.pending]: (state) => {
      state.error = null;
      state.loading = true;
    },
    [fetchAllAdvertises.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    [fetchAllAdvertisesOfClient.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.advertisesByClient = payload;
      state.loading = false;
    },
    [fetchAllAdvertisesOfClient.pending]: (state) => {
      state.error = null;
      state.loading = true;
    },
    [fetchAllAdvertisesOfClient.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    [payForAdvertise.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.loading = false;
    },
    [payForAdvertise.pending]: (state) => {
      state.error = null;
      state.loading = true;
    },
    [payForAdvertise.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    [getAdvertiseById.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.loading = false;
      state.advertisesById = payload;
    },
    [getAdvertiseById.pending]: (state) => {
      state.error = null;
      state.loading = true;
    },
    [getAdvertiseById.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export default advertisesSlice.reducer;
export const { clearFields, clearAdvertisesData } = advertisesSlice.actions;
