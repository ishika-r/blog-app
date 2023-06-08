import { API_TAIL, REDUCERS } from "@/pages/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const reducer = REDUCERS.DELETE_BLOG_API;
const BASE_URL: any = process.env.NEXT_PUBLIC_BLOG_API_URL;
const api_tail = API_TAIL.CREATE_BLOG;
const jwtToken = Cookies.get("access_token");

export const deleteBlog: any = createAsyncThunk(reducer, async (id: any) => {
  try {
    const response = await axios.delete(`${BASE_URL}${api_tail}/${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    console.log("response", response.data);
    console.log("resposne", response.status);
    if (response.status === 200) {
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    return response;
  } catch (error: any) {
    toast.error(error.response.data.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
});
const deleteBlogApiSlice = createSlice({
  name: "deleteBlogApi",
  initialState: {
    pending: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.pending = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.pending = false;
        state.data = null;
        state.error = action.payload;
      })
      .addCase(deleteBlog.pending, (state) => {
        state.pending = true;
      });
  },
});

export const {} = deleteBlogApiSlice.actions;
export default deleteBlogApiSlice.reducer;
