import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* ================= TYPES ================= */

export interface DashboardStats {
  totalIssues: number;
  openVulnerabilities: number;
  resolved: number;
}

interface DashboardState {
  stats: DashboardStats | null;
  loading: boolean;
  error: string | null;
}

/* ================= CONFIG ================= */

// ✅ same name as .env
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/* ================= ASYNC THUNK ================= */

export const fetchDashboardStats = createAsyncThunk<
  DashboardStats,
  void,
  { rejectValue: string }
>("dashboard/fetchStats", async (_, { rejectWithValue }) => {
  try {
    if (!API_BASE_URL) {
      return rejectWithValue("API base URL not configured");
    }

    // client-side safe
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token")
        : null;

    if (!token) {
      return rejectWithValue("Unauthorized");
    }

    const res = await fetch(
      `${API_BASE_URL}/dashboard/stats`, // ✅ no extra /api
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const json = await res.json();

    if (!res.ok) {
      return rejectWithValue(
        json?.message || "Failed to fetch dashboard stats"
      );
    }

    return json.data as DashboardStats;
  } catch {
    return rejectWithValue("Network error");
  }
});

/* ================= SLICE ================= */

const initialState: DashboardState = {
  stats: null,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    resetDashboard(state) {
      state.stats = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Something went wrong";
      });
  },
});

/* ================= EXPORTS ================= */

export const { resetDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
