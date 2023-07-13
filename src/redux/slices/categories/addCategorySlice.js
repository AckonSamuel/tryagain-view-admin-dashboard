import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../common";

const initialState = {
  category: [],
  error: "",
  loading: false,
};

export const categoryCreate = createAsyncThunk("category/categoryCreate", async (category) => {
  const res = await axios.post(
    `${BASE_URL}/categories/`,
    { category: { ...category } }
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );
  return res.data;
});

const categoryCreateSlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(categoryCreate.pending, (state) => {
      state.loading = true;
      state.category = [];
      state.error = "";
    });
    builder.addCase(categoryCreate.fulfilled, (state, action) => {
      state.category = action.payload.data;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(categoryCreate.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.category = [];
    });
  },
});

export default categoryCreateSlice;
