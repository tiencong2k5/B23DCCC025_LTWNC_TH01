import { configureStore } from "@reduxjs/toolkit";
import assignmentsReducer from "../features/assignments/assignmentsSlice";
import filterReducer from "../features/filters/filterSlice";
import coursesReducer from "../features/courses/coursesSlice";

export const store = configureStore({
  reducer: {
    assignments: assignmentsReducer,
    filters: filterReducer,
    courses: coursesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
