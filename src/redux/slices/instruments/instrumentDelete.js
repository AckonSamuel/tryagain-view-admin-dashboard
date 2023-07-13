import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../common";

const initialState = {
  instrument: [],
  error: "",
  loading: false,
};

export const instrumentDelete = createAsyncThunk("instrument/instrumentDelete", async (ids) => {
  const res = await axios.delete(`${BASE_URL}/instruments/${ids}`);

  return res.data;
});

const instrumentDeleteSlice = createSlice({
  name: "instrument",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(instrumentDelete.pending, (state) => {
      state.loading = true;
      state.instrument = [];
      state.error = "";
    });
    builder.addCase(instrumentDelete.fulfilled, (state, action) => {
      state.instrument = action.payload.data;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(instrumentDelete.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.instrument = [];
    });
  },
});

export default instrumentDeleteSlice;
