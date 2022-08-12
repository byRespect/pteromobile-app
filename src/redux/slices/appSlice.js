import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    AddClientPopup: false,
    appData: [],
    clientData: [],
    socketData: {
      status: false,
      loading: true,
      response: {},
    },
  },
  reducers: {
    SetAppData: (state, action) => {
      state.appData = action.payload;
    },
    InsertClient: (state, action) => {
      state.clientData = [...state.clientData, ...action.payload];
    },
    OpenAddClientPopup: (state) => {
      state.AddClientPopup = !state.AddClientPopup;
    },
    SetSocketData: (state, action) => {
      state.socketData = action.payload;
    },
  },
});

export const { SetAppData, InsertClient, OpenAddClientPopup, SetSocketData } =
  appSlice.actions;
export default appSlice.reducer;
