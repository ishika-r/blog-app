import { API_TAIL, REDUCERS } from "@/pages/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const reducer = REDUCERS.GET_SINGLE_BLOG_API_SLICE;
const BASE_URL: any = process.env.NEXT_PUBLIC_BLOG_API_URL;
const api_tail = API_TAIL.GET_SINGLE_BLOG;
export const getSingleBlog: any = createAsyncThunk(reducer, async (id: any) => {
  try {
    console.log(`${BASE_URL}${api_tail}/${id}`);
    const response = await axios.get(`${BASE_URL}${api_tail}/${id}`);
    console.log("get blog data", response.data);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
});
const getSingleBlogApiSlice = createSlice({
  name: "getSingleBlogApi",
  initialState: {
    pending: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSingleBlog.fulfilled, (state, action) => {
        state.pending = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getSingleBlog.rejected, (state, action) => {
        state.pending = false;
        state.data = null;
        state.error = action.payload;
      })
      .addCase(getSingleBlog.pending, (state) => {
        state.pending = true;
      });
  },
});

export const {} = getSingleBlogApiSlice.actions;
export default getSingleBlogApiSlice.reducer;
