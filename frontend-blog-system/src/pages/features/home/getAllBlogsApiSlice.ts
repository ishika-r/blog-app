import { API_TAIL, REDUCERS } from "@/pages/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const reducer = REDUCERS.ALL_BLOGS_API_SLICE;
const BASE_URL: any = process.env.NEXT_PUBLIC_BLOG_API_URL;
const api_tail = API_TAIL.CREATE_BLOG;

export const allBlogs: any = createAsyncThunk(reducer, async (query: any) => {
  try {
    const response = await axios.get(`${BASE_URL}${api_tail}`, {
      params: query,
    });
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
});
const getAllBlogsApiSlice = createSlice({
  name: "allBlogsApi",
  initialState: {
    pending: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(allBlogs.fulfilled, (state, action) => {
        state.pending = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(allBlogs.rejected, (state, action) => {
        state.pending = false;
        state.data = null;
        state.error = action.payload;
      })
      .addCase(allBlogs.pending, (state) => {
        state.pending = true;
      });
  },
});

export const {} = getAllBlogsApiSlice.actions;
export default getAllBlogsApiSlice.reducer;
