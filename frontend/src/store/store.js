import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import developerReducer from "../features/developers/developerSlice";
import themeReducer from "../features/theme/themeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    developers: developerReducer,
    theme: themeReducer, // ⭐ ADD THIS
  },
});
