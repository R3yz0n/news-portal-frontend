import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllClients,
  addClient,
  fetchSingleClient,
  editClientById,
  fetchClientList,
} from "./clientAction";

const initialState = {
  loading: false,
  error: null,
  success: false,
  clients: [],
  clientById: {},
  total: 0,
  clientList: [],
};

const clientSlice = createSlice({
  name: "clients",
  initialState: initialState,
  reducers: {
    clearFields: (state) => {
      state.success = false;
      state.loading = false;
      state.error = null;
    },
    clearClientData: (state) => {
      state.clients = [];
      state.clientById = {};
      state.total = 0;
      state.clientList = [];
    },
  },
  extraReducers: {
    [fetchAllClients.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.clients = payload.data;
      state.total = payload.totaldata;
      state.loading = false;
    },
    [fetchAllClients.pending]: (state) => {
      state.error = null;
      state.loading = true;
    },
    [fetchAllClients.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    [fetchClientList.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.clientList = payload.data;
      state.loading = false;
    },
    [fetchClientList.pending]: (state) => {
      state.error = null;
      state.loading = true;
    },
    [fetchClientList.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },
    // add client
    [addClient.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.loading = false;
    },
    [addClient.pending]: (state) => {
      state.error = null;
      state.loading = true;
      state.success = false;
    },
    [addClient.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    //get the single  client by id
    [fetchSingleClient.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.loading = false;
      state.clientById = payload;
    },
    [fetchSingleClient.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchSingleClient.rejected]: (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    },

    //update client by id
    [editClientById.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [editClientById.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [editClientById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default clientSlice.reducer;
export const { clearFields, clearClientData } = clientSlice.actions;
