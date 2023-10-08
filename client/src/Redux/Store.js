import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/AuthSlice.js";
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
