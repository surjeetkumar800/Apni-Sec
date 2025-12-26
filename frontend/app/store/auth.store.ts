import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../lib/auth";

/* ================= TYPES ================= */

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

/* ================= INITIAL STATE ================= */

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

/* ================= ASYNC THUNKS ================= */

export const login = createAsyncThunk<
  { token: string; user: User },
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async (data, { rejectWithValue }) => {
  try {
    const response = await loginUser(data);

    if (!response?.data?.token || !response?.data?.user) {
      return rejectWithValue("Invalid login response");
    }

    return response.data;
  } catch (err: any) {
    return rejectWithValue(err?.message || "Login failed");
  }
});

export const register = createAsyncThunk<
  { token: string; user: User },
  { name: string; email: string; password: string },
  { rejectValue: string }
>("auth/register", async (data, { rejectWithValue }) => {
  try {
    const response = await registerUser(data);

    if (!response?.data?.token || !response?.data?.user) {
      return rejectWithValue("Invalid registration response");
    }

    return response.data;
  } catch (err: any) {
    return rejectWithValue(err?.message || "Registration failed");
  }
});

/* ================= SLICE ================= */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    },

    loadAuthFromStorage(state) {
      if (typeof window === "undefined") return;

      const token = localStorage.getItem("token");
      const userRaw = localStorage.getItem("user");

      if (!token || !userRaw) return;

      try {
        const user: User = JSON.parse(userRaw);

        state.token = token;
        state.user = user;
        state.isAuthenticated = true;
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
      }
    },

    clearAuthError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      /* ========== LOGIN ========== */
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { token, user } = action.payload;

        state.loading = false;
        state.token = token;
        state.user = user;
        state.isAuthenticated = true;

        if (typeof window !== "undefined") {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })

      /* ========== REGISTER ========== */
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        const { token, user } = action.payload;

        state.loading = false;
        state.token = token;
        state.user = user;
        state.isAuthenticated = true;

        if (typeof window !== "undefined") {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      });
  },
});

/* ================= EXPORTS ================= */

export const {
  logout,
  loadAuthFromStorage,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;
