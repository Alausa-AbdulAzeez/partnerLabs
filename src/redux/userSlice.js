import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isFetching: false,
  isError: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.isError = false;
      state.currentUser = null;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.isError = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isError = true;
      state.isFetching = false;
      state.currentUser = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loginFailure, loginStart, loginSuccess } = userSlice.actions;

export default userSlice.reducer;
