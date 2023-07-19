import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../common";

const initialState = {
  category: [],
  error: "",
  loading: false,
};

export const categoryFetch = createAsyncThunk("category/categoryFetch", async () => {
  const res = await axios.get(`${BASE_URL}/categories/`);
  return res.data;
});

const categoryFetchSlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(categoryFetch.pending, (state) => {
      state.loading = true;
      state.category = [];
      state.error = "";
    });
    builder.addCase(categoryFetch.fulfilled, (state, action) => {
      state.category = action.payload.data;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(categoryFetch.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.category = [];
    });
  },
});

export default categoryFetchSlice;
