import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../common";

const initialState = {
  instrument: [],
  error: "",
  loading: false,
};

export const instrumentUpdate = createAsyncThunk(
  "instrument/instrumentUpdate",
  async (instrument) => {
    const res = await axios.patch(`${BASE_URL}/instruments/${instrument[0]}`, {
      instrument: instrument[1],
    });
    return res.data;
  }
);

const instrumentUpdateSlice = createSlice({
  name: "instrument",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(instrumentUpdate.pending, (state) => {
      state.loading = true;
      state.instrument = [];
      state.error = "";
    });
    builder.addCase(instrumentUpdate.fulfilled, (state, action) => {
      state.instrument = action.payload.data;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(instrumentUpdate.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.instrument = [];
    });
  },
});

export default instrumentUpdateSlice;
