import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllCategories,
  addCategory,
  fetchSingleCategory,
  editCategoryById,
} from "./categoryAction";

const initialState = {
  loading: false,
  error: null,
  success: false,
  categories: [],
  categoryById: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {
    clearFields: (state, { payload }) => {
      state.success = false;
      state.loading = false;
      state.error = null;
      state.categoryById = null;
    },
  },
  extraReducers: {
    [addCategory.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [addCategory.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      //  category added successful
    },
    [addCategory.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },

    [fetchAllCategories.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.categories = payload;
      state.loading = false;
    },
    [fetchAllCategories.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchAllCategories.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    //get the category by id
    [fetchSingleCategory.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchSingleCategory.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.categoryById = payload;
    },
    [fetchSingleCategory.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // update category by id
    [editCategoryById.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [editCategoryById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
    },
    [editCategoryById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});
export default categorySlice.reducer;
export const { clearFields } = categorySlice.actions;
