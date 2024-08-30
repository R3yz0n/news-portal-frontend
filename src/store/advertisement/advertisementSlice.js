import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllAdvertisement,
  getAdvertisementById,
  updateAdvertisement,
} from "./advertisementAction";

const initialState = {
  loading: false,
  error: null,
  success: false,
  advertisements: [],
  advertisementById: {},
};

const advertisementSlice = createSlice({
  name: "advertisement",
  initialState: initialState,
  reducers: {
    clearFields: (state) => {
      state.success = false;
      state.loading = false;
      state.error = null;
    },

    clearAdvertisementData: (state) => {
      state.advertisements = [];
      state.advertisementById = {};
    },
  },
  extraReducers: {
    [fetchAllAdvertisement.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.advertisements = payload;
      state.loading = false;
    },
    [fetchAllAdvertisement.pending]: (state) => {
      state.error = null;
      state.loading = true;
    },
    [fetchAllAdvertisement.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    [getAdvertisementById.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.advertisementById = payload;
      state.loading = false;
    },
    [getAdvertisementById.pending]: (state) => {
      state.error = null;
      state.loading = true;
    },
    [getAdvertisementById.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    [updateAdvertisement.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.loading = false;
    },
    [updateAdvertisement.pending]: (state) => {
      state.error = null;
      state.loading = true;
    },
    [updateAdvertisement.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export default advertisementSlice.reducer;
export const { clearFields, clearAdvertisementData } =
  advertisementSlice.actions;
