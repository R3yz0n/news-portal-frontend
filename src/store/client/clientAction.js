import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APIURL } from "../../utils/constants";
import { getToken } from "../../helpers/getToken";
import { apiOfflineError } from "../apiOfflineError";
import toast from "react-hot-toast";

export const fetchAllClients = createAsyncThunk(
  "Fetch All Clients",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${APIURL}/client?page=${values.page}&size=${values.size}&filter=${values.filter}`,
        getToken(),
      );

      return res.data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(apiOfflineError());
      }
    }
  },
);

export const addClient = createAsyncThunk(
  "Add client",
  async (clientData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${APIURL}/client`, clientData, getToken());
      toast.success("Client added successful.", { duration: 2500 });
      return res.data;
    } catch (error) {
      if (error.response && error.response) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(apiOfflineError());
      }
    }
  },
);

export const fetchSingleClient = createAsyncThunk(
  "Fetch Single Client",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${APIURL}/client/detail/${id}`, getToken());
      return res?.data?.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(apiOfflineError());
      }
    }
  },
);

export const editClientById = createAsyncThunk(
  "client/edit",
  async (values, { rejectWithValue }) => {
    try {
      const data = await axios.put(
        `${APIURL}/client/${values.id}`,
        values.values,
        getToken(),
      );
      toast.success("Client updated successful.", { duration: 2500 });
      return data?.data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(apiOfflineError());
      }
    }
  },
);

export const fetchClientList = createAsyncThunk(
  "Fetch client list",
  async (values, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${APIURL}/client/list`, getToken());

      return res.data;
    } catch (error) {
      if (error.response && error.response.data.error) {
        return rejectWithValue(error.response.data.error);
      } else {
        return rejectWithValue(apiOfflineError());
      }
    }
  },
);
