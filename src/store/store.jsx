import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./category/categorySlice";
import postSlice from "./post/postSlice";
import authSlice from "./auth/authSlice";
import companySlice from "./company/companySlice";
import userSlice from "./user/userSlice";
import advertisementSlice from "./advertisement/advertisementSlice";
import ClientSlice from "./client/ClientSlice";
import advertisesSlice from "./advertises/advertisesSlice";
import transactionSlice from "./transaction/transactionSlice";
import adsSlice from "./ads/adsSlice";

const store = configureStore({
  reducer: {
    category: categorySlice,
    post: postSlice,
    auth: authSlice,
    user: userSlice,
    client: ClientSlice,
    company: companySlice,
    advertisement: advertisementSlice,
    advertises: advertisesSlice,
    transaction: transactionSlice,
    ads: adsSlice,
  },
});

export default store;
