import { API_TAIL, REDUCERS } from "@/pages/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const reducer = REDUCERS.UPDATE_PROFILE_API_SLICE;
const BASE_URL: any = process.env.NEXT_PUBLIC_BLOG_API_URL;
const api_tail = API_TAIL.PROFILE;
const jwtToken = Cookies.get("access_token");

export const updateprofile: any = createAsyncThunk(
  reducer,
  async ({ formData, id }: any) => {
    console.log("formData", formData, "id", id);
    console.log("url", `${BASE_URL}${api_tail}/${id}`);
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
      console.log("respponse from update", response);
      return response;
    } catch (error) {
      console.log("error", error);
    }
  }
);
const updateProfileApiSlice = createSlice({
  name: "updateProfileApi",
  initialState: {
    pending: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateprofile.fulfilled, (state, action) => {
        state.pending = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(updateprofile.rejected, (state, action) => {
        state.pending = false;
        state.data = null;
        state.error = action.payload;
      })
      .addCase(updateprofile.pending, (state) => {
        state.pending = true;
      });
  },
});

export const {} = updateProfileApiSlice.actions;
export default updateProfileApiSlice.reducer;
