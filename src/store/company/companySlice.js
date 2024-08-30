import { createSlice } from "@reduxjs/toolkit";
import { getCompany, addCompany, updateCompany } from "./companyAction";

const initialState = {
  loading: false,
  error: null,
  success: false,
  company: {},
};

const productSlice = createSlice({
  name: "company",
  initialState: initialState,
  reducers: {
    clearFields: (state) => {
      state.success = false;
      state.loading = false;
      state.error = null;
    },
    clearCompanyData: (state) => {
      state.company = {};
    },
  },
  extraReducers: {
    [getCompany.fulfilled]: (state, { payload }) => {
      state.company = payload;
      state.error = null;

      state.loading = false;
    },
    [getCompany.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getCompany.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    // add company
    [addCompany.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
    },
    [addCompany.pending]: (state) => {
      state.error = null;
      state.loading = true;
    },
    [addCompany.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    // update company
    [updateCompany.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
    },
    [updateCompany.pending]: (state) => {
      state.error = null;
      state.loading = true;
    },
    [updateCompany.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
  },
});

export default productSlice.reducer;
export const { clearFields, clearCompanyData } = productSlice.actions;
