import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth.store";
import issueReducer from "./issue.store";
import dashboardReducer from "./dashboard/dashboardSlice"; // ✅ ADD THIS

export const store = configureStore({
  reducer: {
    auth: authReducer,
    issues: issueReducer,
    dashboard: dashboardReducer, // ✅ ADD THIS
  },
});

/* ================= TYPES ================= */

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
