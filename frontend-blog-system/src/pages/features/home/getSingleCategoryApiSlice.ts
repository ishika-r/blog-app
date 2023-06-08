import { API_TAIL, REDUCERS } from "@/pages/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const reducer = REDUCERS.GET_SINGLE_CATEGORY_API_SLICE;
const BASE_URL: any = process.env.NEXT_PUBLIC_BLOG_API_URL;
const api_tail = API_TAIL.GET_CATEGORIES;

export const singleCategory: any = createAsyncThunk(
  reducer,
  async (id: any) => {
    try {
      const response = await axios.get(`${BASE_URL}${api_tail}/${id}`);
      console.log("get single category", response);
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  }
);
const getSingleCategoryApiSlice = createSlice({
  name: "getSingleCategoryApi",
  initialState: {
    pending: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(singleCategory.fulfilled, (state, action) => {
        state.pending = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(singleCategory.rejected, (state, action) => {
        state.pending = false;
        state.data = null;
        state.error = action.payload;
      })
      .addCase(singleCategory.pending, (state) => {
        state.pending = true;
      });
  },
});

export const {} = getSingleCategoryApiSlice.actions;
export default getSingleCategoryApiSlice.reducer;
