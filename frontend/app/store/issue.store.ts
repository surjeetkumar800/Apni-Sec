import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../lib/api";

/* ================= TYPES ================= */

export type IssueType =
  | "cloud-security"
  | "redteam-assessment"
  | "vapt";

export type IssueStatus =
  | "open"
  | "in-progress"
  | "resolved"
  | "closed";

export interface Issue {
  id: string;
  title: string;
  description: string;
  type: IssueType;
  status: IssueStatus;
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt?: string;
}

/* ================= STATE ================= */

interface IssueState {
  list: Issue[];
  loading: boolean;
  error: string | null;
}

const initialState: IssueState = {
  list: [],
  loading: false,
  error: null,
};

/* ================= ASYNC THUNKS ================= */

/* -------- FETCH ALL ISSUES -------- */
export const fetchIssues = createAsyncThunk<
  Issue[],
  void,
  { rejectValue: string }
>("issues/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const res = await apiRequest("/issues");

    if (!res?.success) {
      return rejectWithValue("Failed to fetch issues");
    }

    return res.data as Issue[];
  } catch (err: any) {
    return rejectWithValue(err.message || "Network error");
  }
});

/* -------- CREATE ISSUE -------- */
export const createIssue = createAsyncThunk<
  Issue,
  {
    title: string;
    description: string;
    type: IssueType;
    priority?: "low" | "medium" | "high";
  },
  { rejectValue: string }
>("issues/create", async (data, { rejectWithValue }) => {
  try {
    const res = await apiRequest("/issues", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!res?.success) {
      return rejectWithValue("Failed to create issue");
    }

    return res.data as Issue;
  } catch (err: any) {
    return rejectWithValue(err.message || "Network error");
  }
});

/* -------- UPDATE ISSUE -------- */
export const updateIssue = createAsyncThunk<
  Issue,
  {
    id: string;
    updates: Partial<Issue>;
  },
  { rejectValue: string }
>("issues/update", async ({ id, updates }, { rejectWithValue }) => {
  try {
    const res = await apiRequest(`/issues/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    });

    if (!res?.success) {
      return rejectWithValue("Failed to update issue");
    }

    return res.data as Issue;
  } catch (err: any) {
    return rejectWithValue(err.message || "Network error");
  }
});

/* -------- DELETE ISSUE -------- */
export const deleteIssue = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("issues/delete", async (id, { rejectWithValue }) => {
  try {
    const res = await apiRequest(`/issues/${id}`, {
      method: "DELETE",
    });

    if (!res?.success) {
      return rejectWithValue("Failed to delete issue");
    }

    return id;
  } catch (err: any) {
    return rejectWithValue(err.message || "Network error");
  }
});

/* ================= SLICE ================= */

const issueSlice = createSlice({
  name: "issues",
  initialState,
  reducers: {
    clearIssueError(state) {
      state.error = null;
    },
    resetIssues(state) {
      state.list = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* ===== FETCH ===== */
      .addCase(fetchIssues.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load issues";
      })

      /* ===== CREATE ===== */
      .addCase(createIssue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createIssue.fulfilled, (state, action) => {
        state.loading = false;
        state.list.unshift(action.payload);
      })
      .addCase(createIssue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create issue";
      })

      /* ===== UPDATE ===== */
      .addCase(updateIssue.fulfilled, (state, action) => {
        state.list = state.list.map((issue) =>
          issue.id === action.payload.id
            ? action.payload
            : issue
        );
      })

      /* ===== DELETE ===== */
      .addCase(deleteIssue.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (issue) => issue.id !== action.payload
        );
      });
  },
});

/* ================= EXPORTS ================= */

export const {
  clearIssueError,
  resetIssues,
} = issueSlice.actions;

export default issueSlice.reducer;
