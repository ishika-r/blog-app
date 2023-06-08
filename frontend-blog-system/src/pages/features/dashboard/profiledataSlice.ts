import { API_TAIL, REDUCERS } from "@/pages/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const reducer = REDUCERS.PROFILE_API_SLICE;
const BASE_URL: any = process.env.NEXT_PUBLIC_BLOG_API_URL;
const api_tail = API_TAIL.PROFILE;
const jwtToken = Cookies.get("access_token");
export const profileUser: any = createAsyncThunk(reducer, async (id: any) => {
  try {
    const response = await axios.get(`${BASE_URL}${api_tail}/${id}`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    });
    // console.log("get user data", response.data);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
});

const profiledataSlice = createSlice({
  name: "profileApi",
  initialState: {
    pending: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(profileUser.fulfilled, (state, action) => {
        state.pending = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(profileUser.rejected, (state, action) => {
        state.pending = false;
        state.data = null;
        state.error = action.payload;
      })
      .addCase(profileUser.pending, (state) => {
        state.pending = true;
      });
  },
});

export const {} = profiledataSlice.actions;
export default profiledataSlice.reducer;
