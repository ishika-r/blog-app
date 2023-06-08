import { API_TAIL, REDUCERS } from "@/pages/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const reducer = REDUCERS.CREATE_BLOG_API_SLICE;
const BASE_URL: any = process.env.NEXT_PUBLIC_BLOG_API_URL;
const api_tail = API_TAIL.CREATE_BLOG;
const jwtToken = Cookies.get("access_token");
console.log("jwt token", jwtToken);
export const createBlog: any = createAsyncThunk(
  reducer,
  async (formData: any) => {
    try {
      const response = await axios.post(`${BASE_URL}${api_tail}`, formData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(`Bearer ${jwtToken}`);
      console.log("response", response.data.message);
      if (response.status === 201) {
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
  }
);
const createBlogApiSlice = createSlice({
  name: "createBlogApi",
  initialState: {
    pending: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBlog.fulfilled, (state, action) => {
        state.pending = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.pending = false;
        state.data = null;
        state.error = action.payload;
      })
      .addCase(createBlog.pending, (state) => {
        state.pending = true;
      });
  },
});

export const {} = createBlogApiSlice.actions;
export default createBlogApiSlice.reducer;
