import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signup: {
    name: "",
    mobile_number: "",
    email: "",
    password: "",
    profile: "",
  },
};
const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    addUser: (state: any, action: any) => {
      state.signup.push(action.payload);
    },
    updateUser: (state: any, action: any): any => {
      const { name, value } = action.payload;
      state.signup[name] = value;
    },
    storeProfile: (state, action) => {
      console.log("action payload", action.payload);
      state.signup.profile = action.payload;
    },
    removeProfile: (state: any) => {
      state.signup.profile = "";
    },
  },
});
export const { addUser, updateUser, storeProfile, removeProfile } =
  signupSlice.actions;
export default signupSlice.reducer;
