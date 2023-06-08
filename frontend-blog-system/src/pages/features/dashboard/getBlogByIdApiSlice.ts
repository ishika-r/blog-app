import { API_TAIL, REDUCERS } from "@/pages/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const reducer = REDUCERS.GET_BLOG_BY_ID_API;
const BASE_URL: any = process.env.NEXT_PUBLIC_BLOG_API_URL;
const api_tail = API_TAIL.CREATE_BLOG;
const jwtToken = Cookies.get("access_token");
export const getBlog: any = createAsyncThunk(reducer, async (id: any) => {
  try {
    console.log(`${BASE_URL}${api_tail}/${id}`);
    const response = await axios.get(`${BASE_URL}${api_tail}/${id}`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    console.log("get blog data", response.data);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
});
const getBlogByIdApiSlice = createSlice({
  name: "getBlogById",
  initialState: {
    pending: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlog.fulfilled, (state, action) => {
        state.pending = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.pending = false;
        state.data = null;
        state.error = action.payload;
      })
      .addCase(getBlog.pending, (state) => {
        state.pending = true;
      });
  },
});

export const {} = getBlogByIdApiSlice.actions;
export default getBlogByIdApiSlice.reducer;
