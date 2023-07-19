import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../common";

const initialState = {
  category: [],
  error: "",
  loading: false,
};

export const categoryUpdate = createAsyncThunk("category/categoryUpdate", async (category) => {
  const res = await axios.patch(`${BASE_URL}/categories/${category[0]}`, {
    category: category[1],
  });
  return res.data;
});

const categoryUpdateSlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(categoryUpdate.pending, (state) => {
      state.loading = true;
      state.category = [];
      state.error = "";
    });
    builder.addCase(categoryUpdate.fulfilled, (state, action) => {
      state.category = action.payload.data;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(categoryUpdate.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.category = [];
    });
  },
});

export default categoryUpdateSlice;
