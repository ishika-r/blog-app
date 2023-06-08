import { API_TAIL, REDUCERS } from "@/pages/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const reducer = REDUCERS.GET_USER_BLOG_API_SLICE;
const BASE_URL: any = process.env.NEXT_PUBLIC_BLOG_API_URL;
const api_tail = API_TAIL.GET_USER_BLOG;
const jwtToken = Cookies.get("access_token");
export const getUserBlog: any = createAsyncThunk(reducer, async (id: any) => {
  try {
    console.log(`${BASE_URL}${api_tail}/${id}`);
    const response = await axios.get(`${BASE_URL}${api_tail}/${id}`);
    // console.log("get user data", response.data.blogs);
    return response.data.blogs;
  } catch (error) {
    console.log("error", error);
  }
});
const getUserBlogApiSlice = createSlice({
  name: "getUserBlogApi",
  initialState: {
    pending: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserBlog.fulfilled, (state, action) => {
        state.pending = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getUserBlog.rejected, (state, action) => {
        state.pending = false;
        state.data = null;
        state.error = action.payload;
      })
      .addCase(getUserBlog.pending, (state) => {
        state.pending = true;
      });
  },
});

export const {} = getUserBlogApiSlice.actions;
export default getUserBlogApiSlice.reducer;
