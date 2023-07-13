import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "redux/common";

const initialState = {
  admin: {},
  error: "",
  loading: false,
};

export const adminSignUp = createAsyncThunk("admin/adminSignUP", async (user) => {
  const res = await axios.post(`${BASE_URL}/auth/users/signup`, { user });
  if (res.data.accessToken) {
    localStorage.setItem("admin", JSON.stringify(res.data));
  }
  return res.data;
});

const adminRegisterSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(adminSignUp.pending, (state) => {
      state.loading = true;
      state.admin = {};
      state.error = "";
    });
    builder.addCase(adminSignUp.fulfilled, (state, action) => {
      state.admin = action.payload.data;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(adminSignUp.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.admin = {};
    });
  },
});

export default adminRegisterSlice;
