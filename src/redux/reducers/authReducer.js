import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: null,
    userMpinData: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setuserMpinData: (state, action) => {
      state.userMpinData = action.payload;
    },
  },
});

export const { setuserMpinData, setUserData } = authSlice.actions;
export default authSlice.reducer;
