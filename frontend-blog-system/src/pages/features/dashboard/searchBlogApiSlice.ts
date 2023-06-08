import { API_TAIL, REDUCERS } from "@/pages/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const reducer = REDUCERS.SEARCH_BLOG_API_SLICE;
const BASE_URL: any = process.env.NEXT_PUBLIC_BLOG_API_URL;
const api_tail = API_TAIL.SEARCH_BLOG;
const jwtToken = Cookies.get("access_token");
export const searchBlog: any = createAsyncThunk(reducer, async (query: any) => {
  try {
    const response = await axios.get(`${BASE_URL}${api_tail}/${query}`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    // console.log("Search data", response.data);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
});

const searchBlogApiSlice = createSlice({
  name: "searchBlogApi",
  initialState: {
    pending: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchBlog.fulfilled, (state, action) => {
        state.pending = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(searchBlog.rejected, (state, action) => {
        state.pending = false;
        state.data = null;
        state.error = action.payload;
      })
      .addCase(searchBlog.pending, (state) => {
        state.pending = true;
      });
  },
});

export const {} = searchBlogApiSlice.actions;
export default searchBlogApiSlice.reducer;
