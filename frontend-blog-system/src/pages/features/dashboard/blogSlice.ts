import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  blog: {
    title: "",
    content: "",
    category: "",
    publish_date: moment(new Date()).format("YYYY-MM-DD"),
    feature_image: "",
    // userId: "",
  },
};
const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    addBlog: (state: any, action: any) => {
      state.blog.push(action.payload);
    },
    updateBlog: (state: any, action: any): any => {
      const { name, value } = action.payload;
      state.blog[name] = value;
    },
    storeFeatureImage: (state, action) => {
      console.log("payload", action.payload);
      state.blog.feature_image = action.payload;
      // state.blog.feature_image = action.payload;
    },
    // removeProfile: (state: any) => {
    //   state.signup.feature_image = "";
    // },
  },
});
export const { addBlog, updateBlog, storeFeatureImage } = blogSlice.actions;
export default blogSlice.reducer;
