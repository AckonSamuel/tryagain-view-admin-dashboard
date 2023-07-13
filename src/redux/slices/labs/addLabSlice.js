import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../common";

const initialState = {
  lab: [],
  error: "",
  loading: false,
};

export const labCreate = createAsyncThunk("lab/labCreate", async (lab) => {
  const res = await axios.post(
    `${BASE_URL}/labs/`,
    { lab: { ...lab } }
    // {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // }
  );
  return res.data;
});

const labCreateSlice = createSlice({
  name: "lab",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(labCreate.pending, (state) => {
      state.loading = true;
      state.lab = [];
      state.error = "";
    });
    builder.addCase(labCreate.fulfilled, (state, action) => {
      state.lab = action.payload.data;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(labCreate.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.lab = [];
    });
  },
});

const { reducer } = labCreateSlice;

export default reducer;
