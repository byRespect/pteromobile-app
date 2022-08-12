import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import AuthReducer from "./slices/authSlice";
import AppReducer from "./slices/appSlice";
export default configureStore({
  reducer: {
    app: AppReducer,
    auth: AuthReducer,
  },
  middleware: getDefaultMiddleware({ serializableCheck: false }),
});
