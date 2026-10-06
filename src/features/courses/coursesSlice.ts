import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCourses as fetchMockCourses } from "../../services/api";
import type { Course } from "./types";

interface CoursesState {
  items: Course[];
  loading: boolean;
  error: string | null;
}

const initialState: CoursesState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCourses = createAsyncThunk<Course[]>(
  "courses/fetchCourses",
  async () => fetchMockCourses(),
);

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Không thể tải danh sách khóa học.";
      });
  },
});

export default coursesSlice.reducer;