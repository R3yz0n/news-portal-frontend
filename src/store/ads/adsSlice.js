import { createSlice } from "@reduxjs/toolkit";
import { fetchAllHomepageAds, fetchSpecificCategoryAds } from "./adsAction";

const initialState = {
  loading: false,
  error: null,
  success: false,
  popupAds: [],
  sidebarAds: [],
  topbarAds: [],
  endCategoryAds: [],
  postDetailAds: [],
  specificCategoryAds: [],
};

const adsSlice = createSlice({
  name: "ads",
  initialState: initialState,
  reducers: {
    clearFields: (state) => {
      state.success = false;
      state.loading = false;
      state.error = null;
    },

    clearAdsData: (state) => {
      state.popupAds = [];
      state.sidebarAds = [];
      state.endCategoryAds = [];
    },
  },
  extraReducers: {
    [fetchAllHomepageAds.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.loading = false;
      payload?.forEach((ad) => {
        const { ads_type, items } = ad;
        switch (ads_type) {
          case "popup":
            state.popupAds = items;
            break;
          case "right_sidebar":
            state.sidebarAds = items;
            break;
          case "topbar_ad":
            state.topbarAds = items;
            break;
          case "end_category_ad":
            state.endCategoryAds = items;
            break;
          case "post_detail_ad":
            state.postDetailAds = items;
            break;

          default:
            break;
        }
      });
    },
    [fetchAllHomepageAds.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchAllHomepageAds.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    [fetchSpecificCategoryAds.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.loading = false;
      state.specificCategoryAds = payload;
    },
  },
});

export const { clearFields, clearAdsData } = adsSlice.actions;
export default adsSlice.reducer;
