import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "redux/common";

const initialState = {
  admin: {},
  error: "",
  loading: false,
};

export const adminLogin = createAsyncThunk("admin/adminLogin", async (user) => {
  const res = await axios.post(`${BASE_URL}/auth/users/login`, { user });

  if (res.data.accessToken) {
    localStorage.setItem("admin", JSON.stringify(res.data));
  }
  return res.data;
});

const adminLoginSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(adminLogin.pending, (state) => {
      state.loading = true;
      state.admin = {};
      state.error = "";
    });
    builder.addCase(adminLogin.fulfilled, (state, action) => {
      state.admin = action.payload.data;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(adminLogin.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.admin = {};
    });
  },
});

export default adminLoginSlice;
