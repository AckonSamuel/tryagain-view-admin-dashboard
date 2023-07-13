import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "redux/common";

const initialState = {
  admin: {},
  error: "",
  loading: false,
};

export const adminLogout = createAsyncThunk("admin/adminLogout", async () => {
  const token = JSON.parse(localStorage.getItem("admin")).accessToken;
  const res = await axios.delete(`${BASE_URL}/auth/users/logout`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.data.status === 200) {
    localStorage.removeItem("admin");
  }

  return res;
});

const adminLogoutSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(adminLogout.pending, (state) => {
      state.loading = true;
      state.admin = {};
      state.error = "";
    });
    builder.addCase(adminLogout.fulfilled, (state, action) => {
      state.admin = action.payload.data;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(adminLogout.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.admin = {};
    });
  },
});

export default adminLogoutSlice;
