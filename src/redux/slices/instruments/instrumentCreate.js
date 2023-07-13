import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../common";

const initialState = {
  instrument: [],
  id: "",
  error: "",
  loading: false,
};

export const instrumentCreate = createAsyncThunk(
  "instrument/instrumentCreate",
  async (instrument) => {
    const res = await axios.post(`${BASE_URL}/instruments/`, { instrument: { ...instrument } });
    return res.data;
  }
);

const instrumentCreateSlice = createSlice({
  name: "instrument",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(instrumentCreate.pending, (state) => {
      state.loading = true;
      state.instrument = [];
      state.error = "";
    });
    builder.addCase(instrumentCreate.fulfilled, (state, action) => {
      state.instrument = action.payload.data;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(instrumentCreate.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.instrument = [];
    });
  },
});

export default instrumentCreateSlice;
