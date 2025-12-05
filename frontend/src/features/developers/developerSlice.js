// src/features/developers/developerSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api/axios";
import { toast } from "react-hot-toast";

// ------------------------------
// Fetch Developers (List + Filters + Pagination)
// ------------------------------
export const fetchDevelopers = createAsyncThunk(
  "developers/fetchDevelopers",
  async (params, { rejectWithValue }) => {
    try {
      const res = await api.get("/developers", { params });
      return res.data.data; // { developers, total, page, pages }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch developers"
      );
    }
  }
);

// ------------------------------
// Create Developer
// ------------------------------
export const createDeveloper = createAsyncThunk(
  "developers/createDeveloper",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/developers", formData);
      toast.success("Developer added!");
      return res.data.data; // dev object
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to create developer"
      );
    }
  }
);

// ------------------------------
// Delete Developer
// ------------------------------
export const deleteDeveloper = createAsyncThunk(
  "developers/deleteDeveloper",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/developers/${id}`);
      toast.success("Developer deleted");
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete developer"
      );
    }
  }
);

// ------------------------------
// Initial State
// ------------------------------
const initialState = {
  list: [],
  total: 0,
  loading: false,
  error: null,
  filters: {
    search: "",
    role: "",
    sortBy: "experience",
    sortOrder: "desc",
    page: 1,
    limit: 2, // pagination
  },
};

// ------------------------------
// Slice
// ------------------------------
const developerSlice = createSlice({
  name: "developers",
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
  },

  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchDevelopers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDevelopers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.developers || [];
        state.total = action.payload.total || 0;
      })
      .addCase(fetchDevelopers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Error loading developers");
      })

      // CREATE
      .addCase(createDeveloper.fulfilled, (state, action) => {
        // IMPORTANT:
        // Do NOT push to UI directly when using a separate Add Page.
        // Let Developers.jsx refetch the list instead.
      })
      .addCase(createDeveloper.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(action.payload);
      })

      // DELETE
      .addCase(deleteDeveloper.fulfilled, (state, action) => {
        state.list = state.list.filter((dev) => dev._id !== action.payload);
      })
      .addCase(deleteDeveloper.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { setFilters } = developerSlice.actions;
export default developerSlice.reducer;
