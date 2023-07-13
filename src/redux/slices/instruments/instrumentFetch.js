import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import BASE_URL from "../../common";

const initialState = {
  instrument: [],
  searchArr: [],
  id: "",
  search: "",
  error: "",
  loading: false,
};

export const instrumentFetch = createAsyncThunk("instrument/instrumentFetch", async () => {
  const token = JSON.parse(localStorage.getItem("admin")).accessToken;
  const res = await axios.get(`${BASE_URL}/instruments/`);
  return res.data;
});

const instrumentFetchSlice = createSlice({
  name: "instrument",
  initialState,
  reducers: {
    searchTitle: (state, action) => {
      const filteredInstruments = state.instrument.filter((item) =>
        item.attributes.instrument_name.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        searchArr: action.payload === "" ? [] : filteredInstruments,
      };
    },
    search: (state, action) => ({
      ...state,
      search: action.payload,
    }),

    setId: (state, action) => ({
      ...state,
      id: action.payload,
    })
  
  },
  extraReducers: (builder) => {
    builder.addCase(instrumentFetch.pending, (state) => {
      state.loading = true;
      state.instrument = [];
      state.error = "";
    });
    builder.addCase(instrumentFetch.fulfilled, (state, action) => {
      state.instrument = action.payload.data;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(instrumentFetch.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.instrument = [];
    });
  },
});

const { actions, reducer } = instrumentFetchSlice;

export const { searchTitle, search, setId } = actions;

export default reducer;
