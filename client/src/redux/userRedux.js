import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    currentUserId: null,
    isFetching: false,
    error: null,
  },
  reducers: {
    requestStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    requestSuccess: (state, action) => {
      const { status, _id } = action.payload;
      state.isFetching = false;
      state.currentUser = status;
      state.currentUserId = _id;
    },
    requestFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    logOut: (state) => {
      state.currentUser = null;
      state.currentUserId = null;
      state.error = null;
    },
    resetError: (state) => {
      state.error = false;
    },
  },
});

export const { requestStart, requestSuccess, requestFailure, logOut, resetError } = userSlice.actions;
export default userSlice.reducer;