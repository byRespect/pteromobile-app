import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    loading: true,
    error: "",
  },
  reducers: {
    setAuth: (state, action) => {
      const { user, loading, error } = action.payload;
      state.user = user;
      state.loading = loading;
      state.error = error;
    },
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
