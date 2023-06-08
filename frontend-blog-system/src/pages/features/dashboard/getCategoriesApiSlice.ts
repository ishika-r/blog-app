import { API_TAIL, REDUCERS } from "@/pages/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const reducer = REDUCERS.GET_CATEGORIES_API_SLICE;
const BASE_URL: any = process.env.NEXT_PUBLIC_BLOG_API_URL;
const api_tail = API_TAIL.GET_CATEGORIES;
export const allCategories: any = createAsyncThunk(reducer, async () => {
  try {
    const response = await axios.get(`${BASE_URL}${api_tail}`);
    // console.log("categories", response);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
});
const getCategoriesApiSlice = createSlice({
  name: "getCategoriesApi",
  initialState: {
    pending: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allCategories.fulfilled, (state, action) => {
        state.pending = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(allCategories.rejected, (state, action) => {
        state.pending = false;
        state.data = null;
        state.error = action.payload;
      })
      .addCase(allCategories.pending, (state) => {
        state.pending = true;
      });
  },
});

export const {} = getCategoriesApiSlice.actions;
export default getCategoriesApiSlice.reducer;
