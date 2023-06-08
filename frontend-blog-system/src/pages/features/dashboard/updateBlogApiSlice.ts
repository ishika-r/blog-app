import { API_TAIL, REDUCERS } from "@/pages/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const reducer = REDUCERS.UPDATE_BLOG_API_SLICE;
const BASE_URL: any = process.env.NEXT_PUBLIC_BLOG_API_URL;
const api_tail = API_TAIL.CREATE_BLOG;
const jwtToken = Cookies.get("access_token");
export const updateBlogapi: any = createAsyncThunk(
  reducer,
  async ({ id, formData, router }: any) => {
    try {
      const response = await axios.patch(
        `${BASE_URL}${api_tail}/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
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
        router.back();
      }
      console.log("get blog data", response.data);
      return response.data;
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
      console.log("error", error);
    }
  }
);
const updateBlogApiSlice = createSlice({
  name: "updateBlogApi",
  initialState: {
    pending: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateBlogapi.fulfilled, (state, action) => {
        state.pending = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(updateBlogapi.rejected, (state, action) => {
        state.pending = false;
        state.data = null;
        state.error = action.payload;
      })
      .addCase(updateBlogapi.pending, (state) => {
        state.pending = true;
      });
  },
});

export const {} = updateBlogApiSlice.actions;
export default updateBlogApiSlice.reducer;
