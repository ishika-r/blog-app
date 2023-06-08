import { API_TAIL, REDUCERS } from "@/pages/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const reducer = REDUCERS.SIGNUP_API_SLICE;
const BASE_URL: any = process.env.NEXT_PUBLIC_BLOG_API_URL;
const api_tail = API_TAIL.SAVE_USER;
export const saveUser: any = createAsyncThunk(
  reducer,
  async (formData: any) => {
    try {
      const response = await axios.post(`${BASE_URL}${api_tail}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
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

const signupApiSlice = createSlice({
  name: "signupApi",
  initialState: {
    pending: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveUser.fulfilled, (state, action) => {
        state.pending = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(saveUser.rejected, (state, action) => {
        state.pending = false;
        state.data = null;
        state.error = action.payload;
      })
      .addCase(saveUser.pending, (state) => {
        state.pending = true;
      });
  },
});

export const {} = signupApiSlice.actions;
export default signupApiSlice.reducer;
