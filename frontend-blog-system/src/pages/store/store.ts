import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import signupReducer from "../features/signup/signupSlice";
import signupApiReducer from "../features/signup/signupApiSlice";
import signinApiReducer from "../features/signin/signinApiSlice";
import profiledataReducer from "../features/dashboard/profiledataSlice";
import updateProfileApiReducer from "../features/dashboard/updateProfileApiSlice";
import blogReducer from "../features/dashboard/blogSlice";
import createBlogApiReducer from "../features/dashboard/createBlogApiSlice";
import getUserBlogApiReducer from "../features/dashboard/getUserBlogApiSlice";
import deleteBlogApiReducer from "../features/dashboard/deleteBlogApiSlice";
import getBlogByIdApiReducer from "../features/dashboard/getBlogByIdApiSlice";
import updateBlogApiReducer from "../features/dashboard/updateBlogApiSlice";
import searchBlogApiReducer from "../features/dashboard/searchBlogApiSlice";
import getAllBlogsApiReducer from "../features/home/getAllBlogsApiSlice";
import getCategoriesApiSlice from "../features/dashboard/getCategoriesApiSlice";
import getSingleCategoryApiSlice from "../features/home/getSingleCategoryApiSlice";
import getSingleBlogApiSlice from "../features/home/getSingleBlogApiSlice";

export const store = configureStore({
  reducer: {
    signup: signupReducer,
    signupApi: signupApiReducer,
    signinApi: signinApiReducer,
    profileApi: profiledataReducer,
    updateProfileApi: updateProfileApiReducer,
    blog: blogReducer,
    createBlog: createBlogApiReducer,
    getUserBlog: getUserBlogApiReducer,
    deleteBlog: deleteBlogApiReducer,
    getBlogById: getBlogByIdApiReducer,
    updateBlog: updateBlogApiReducer,
    searchBlogApi: searchBlogApiReducer,
    allBlogs: getAllBlogsApiReducer,
    allCategories: getCategoriesApiSlice,
    singleCategory: getSingleCategoryApiSlice,
    singleBlog: getSingleBlogApiSlice,
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
