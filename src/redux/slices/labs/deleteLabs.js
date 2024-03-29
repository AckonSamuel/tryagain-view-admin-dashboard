import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../common";

const initialState = {
  lab: [],
  error: "",
  loading: false,
};

export const labDelete = createAsyncThunk("lab/labDelete", async (ids) => {
  const res = await axios.delete(`${BASE_URL}/labs/${ids}`);
  return res.data;
});

const labDeleteSlice = createSlice({
  name: "lab",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(labDelete.pending, (state) => {
      state.loading = true;
      state.lab = [];
      state.error = "";
    });
    builder.addCase(labDelete.fulfilled, (state, action) => {
      state.lab = action.payload.data;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(labDelete.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.lab = [];
    });
  },
});

export default labDeleteSlice;
