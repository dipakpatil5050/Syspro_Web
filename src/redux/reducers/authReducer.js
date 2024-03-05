import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: JSON.parse(localStorage.getItem("userData")) || null,
    userMpinData: JSON.parse(localStorage.getItem("userMpinData")) || null,
    LedgerReport: null,
  },

  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
    setuserMpinData: (state, action) => {
      state.userMpinData = action.payload;
      localStorage.setItem("userMpinData", JSON.stringify(action.payload));
    },
    setLedgerReport: (state, action) => {
      state.LedgerReport = action.payload;
    },
  },
});

export const { setuserMpinData, setUserData, setLedgerReport } =
  authSlice.actions;
export default authSlice.reducer;
