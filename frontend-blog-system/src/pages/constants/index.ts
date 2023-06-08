export const REDUCERS = {
  SIGNUP_API_SLICE: "signupApi/saveUser",
  SIGNIN_API_SLICE: "signinApi/loginUser",
  PROFILE_API_SLICE: "profileApi/profileUser",
  UPDATE_PROFILE_API_SLICE: "updateProfileApi/updateprofile",
  CREATE_BLOG_API_SLICE: "createBlogApi/createBlog",
  GET_USER_BLOG_API_SLICE: "getUserBlogApi/getUserBlog",
  DELETE_BLOG_API: "deleteBlogApi/deleteBlog",
  GET_BLOG_BY_ID_API: "getBlogByIdApi/getBlog",
  UPDATE_BLOG_API_SLICE: "updateBlogApi/updateBlog",
  SEARCH_BLOG_API_SLICE: "searchBlogApi/searchBlog",
  ALL_BLOGS_API_SLICE: "allBlogsApi/allBlogs",
  GET_CATEGORIES_API_SLICE: "getCategoriesApi/allCategories",
  GET_SINGLE_CATEGORY_API_SLICE: "getSingleCategoryApi/singleCategory",
  GET_SINGLE_BLOG_API_SLICE: "getSingleBlogApi/singleBlog",
};

export const API_TAIL = {
  SAVE_USER: "users",
  LOGIN_USER: "auth/login",
  PROFILE: "auth",
  CREATE_BLOG: "blogs",
  GET_USER_BLOG: "auth/blogs",
  SEARCH_BLOG: "blogs/search",
  GET_CATEGORIES: "categories",
  GET_SINGLE_BLOG: "blogs/blog",
};
