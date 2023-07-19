import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../common";

const initialState = {
  lab: [],
  error: "",
  loading: false,
};

export const labUpdate = createAsyncThunk("lab/labUpdate", async (lab) => {
  const res = await axios.patch(`${BASE_URL}/labs/${lab[0]}`, {
    lab: lab[1],
  });
  return res.data;
});

const labUpdateSlice = createSlice({
  name: "lab",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(labUpdate.pending, (state) => {
      state.loading = true;
      state.lab = [];
      state.error = "";
    });
    builder.addCase(labUpdate.fulfilled, (state, action) => {
      state.lab = action.payload.data;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(labUpdate.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.lab = [];
    });
  },
});

export default labUpdateSlice;
