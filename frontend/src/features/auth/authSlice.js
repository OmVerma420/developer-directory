// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/axios";
import { toast } from "react-hot-toast";

const savedUser = JSON.parse(localStorage.getItem("user")) || null;
const savedToken = localStorage.getItem("accessToken") || null;

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      // Backend returns: { statusCode, data: { user, accessToken }, message }
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/register", formData);
      // We don't need data here, just show success
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  }
);

// Optional: backend logout (to clear cookie)
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/auth/logout");
      return true;
    } catch (err) {
      // Even if this fails, we'll still clear local state
      return rejectWithValue("Failed to logout from server");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: savedUser,
    accessToken: savedToken,
    loading: false,
    error: null,
  },
  reducers: {
    // Local-only logout (can be used directly if you don't want to call API)
    logout(state) {
      state.user = null;
      state.accessToken = null;
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      toast.success("Logged out");
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("accessToken", action.payload.accessToken);

        toast.success("Login successful!");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        toast.success("Registered successfully!");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // LOGOUT (server + client)
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        toast.success("Logged out");
      })
      .addCase(logoutUser.rejected, (state) => {
        // still clear local state even if server logout fails
        state.user = null;
        state.accessToken = null;
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        toast.success("Logged out");
      });
  },
});

export const { logout } = authSlice.actions; // you can use either logout or logoutUser
export default authSlice.reducer;
