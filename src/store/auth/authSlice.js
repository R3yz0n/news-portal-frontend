import { createSlice } from "@reduxjs/toolkit";

// initialize token from local storage
const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;
const userId = localStorage.getItem("userId")
  ? localStorage.getItem("userId")
  : null;
const initialState = {
  token,
  userId,
};

const authSlice = createSlice({
  name: "user-auth",
  initialState: initialState,

  reducers: {
    logout: (state) => {
      console.log("here");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      state.token = null;
    },

    login: (state, { payload }) => {
      state.token = payload.token;
      state.userId = payload.user_data.id;
      localStorage.setItem("token", payload.token);
      localStorage.setItem("userId", payload.user_data.id);
    },
  },
});

// export const {}
export default authSlice.reducer;
export const { logout, clearFields, login } = authSlice.actions;
