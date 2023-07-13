import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../common";

const initialState = {
  lab: [],
  error: "",
  loading: false,
};

export const labFetch = createAsyncThunk("lab/labFetch", async () => {
  const res = await axios.get(
    `${BASE_URL}/labs/`
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );
  return res.data;
});

const labFetchSlice = createSlice({
  name: "lab",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(labFetch.pending, (state) => {
      state.loading = true;
      state.lab = [];
      state.error = "";
    });
    builder.addCase(labFetch.fulfilled, (state, action) => {
      state.lab = action.payload.data;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(labFetch.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.lab = [];
    });
  },
});

export default labFetchSlice;
