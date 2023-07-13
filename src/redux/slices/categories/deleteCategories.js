import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../common";

const initialState = {
  category: [],
  error: "",
  loading: false,
};

export const categoryDelete = createAsyncThunk("category/categoryDelete", async (ids) => {
  // const clubId = JSON.parse(localStorage.getItem("club")).data.id;
  // const token = JSON.parse(localStorage.getItem("admin")).accessToken;
  const res = await axios.delete(
    `${BASE_URL}/category/`,
    { category: { ...ids } },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
});

const categoryDeleteSlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(categoryDelete.pending, (state) => {
      state.loading = true;
      state.category = [];
      state.error = "";
    });
    builder.addCase(categoryDelete.fulfilled, (state, action) => {
      state.category = action.payload.data;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(categoryDelete.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.category = [];
    });
  },
});

export default categoryDeleteSlice;
