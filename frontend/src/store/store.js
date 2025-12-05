// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import developerReducer from "../features/developers/developerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    developers: developerReducer,
  },
});
