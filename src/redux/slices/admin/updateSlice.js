import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../common";

const initialState = {
  club: {},
  error: "",
  loading: false,
};

export const clubUpdate = createAsyncThunk("club/clubUpdate", async (club) => {
  const clubId = JSON.parse(localStorage.getItem("club")).data.id;
  const res = await axios.patch(`${BASE_URL}/clubs/${clubId}`, { club });
  return res.data;
});

const clubUpdateSlice = createSlice({
  name: "club",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(clubUpdate.pending, (state) => {
      state.loading = true;
      state.club = {};
      state.error = "";
    });
    builder.addCase(clubUpdate.fulfilled, (state, action) => {
      state.club = action.payload.data;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(clubUpdate.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.club = {};
    });
  },
});

export default clubUpdateSlice;
