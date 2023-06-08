import { API_TAIL, REDUCERS } from "@/pages/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
const reducer = REDUCERS.SIGNIN_API_SLICE;
const BASE_URL: any = process.env.NEXT_PUBLIC_BLOG_API_URL;
const api_tail = API_TAIL.LOGIN_USER;
export const loginUser: any = createAsyncThunk(
  reducer,
  async ({ formData, router }: any) => {
    try {
      const response = await axios.post(`${BASE_URL}${api_tail}`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      const jwtTokwn = response.data.access_token;
      console.log("response", response);
      if (response.status === 201) {
        console.log("router", router);
        router.push("/dashboard");
        const expiresInHours = 1;
        const expirationDate = new Date();
        expirationDate.setTime(
          expirationDate.getTime() + expiresInHours * 60 * 60 * 1000
        );
        // console.log("date", expirationDate);
        Cookies.set("access_token", jwtTokwn, { expires: expirationDate });
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

const signinApiSlice = createSlice({
  name: "signinApi",
  initialState: {
    pending: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.pending = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.pending = false;
        state.data = null;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.pending = true;
      });
  },
});

export const {} = signinApiSlice.actions;
export default signinApiSlice.reducer;
