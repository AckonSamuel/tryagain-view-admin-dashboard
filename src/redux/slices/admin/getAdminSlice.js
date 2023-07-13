import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../common";

const initialState = {
  admin: {},
  error: "",
  loading: false,
};

export const getAdmin = createAsyncThunk("admin/getAdmin", async () => {
  const token = JSON.parse(localStorage.getItem("admin")).accessToken;
  const res = await axios.get(`${BASE_URL}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
});

const getAdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAdmin.pending, (state) => {
      state.loading = true;
      state.admin = {};
      state.error = "";
    });
    builder.addCase(getAdmin.fulfilled, (state, action) => {
      state.admin = action.payload.data;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(getAdmin.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.admin = {};
    });
  },
});

export default getAdminSlice;
