import type { Assignment } from "./types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchAssignments as fetchMockAssignments } from "../../services/api";

// gọi API giả lập để lấy danh sach bài tập
export const fetchAssignments = createAsyncThunk<Assignment[]>(
  "assignments/fetchAssignments",
    async () => fetchMockAssignments(),
);


interface AssignmentsState {
    assignments: Assignment[];
    loading: boolean;
    filter: "all" | "incomplete" | "completed" | "overdue";
    error: string | null;
}

const initialState: AssignmentsState = {
    assignments: [],
    loading: false,
    filter: "all",
    error: null,
};

const assignmentsSlice = createSlice({
    name : "assignments",
    initialState,
    reducers: {
        addAssignment :(state, action : PayloadAction<Assignment>) => {
            state.assignments.push(action.payload);
        },
        toggleComplete: (state, action: PayloadAction<string>) => {
            const assignment = state.assignments.find(a => a.id === action.payload);
            if (assignment) {
                assignment.completed = !assignment.completed;
            }
        },
        deleteAssignment: (state, action: PayloadAction<string>) => {
            state.assignments = state.assignments.filter(a => a.id !== action.payload);
        },
        setFilter: (
            state,
            action: PayloadAction<"all" | "incomplete" | "completed" | "overdue">
            ) => {
            state.filter = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAssignments.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAssignments.fulfilled, (state, action) => {
                state.loading = false;
                state.assignments = action.payload;
            })
            .addCase(fetchAssignments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Lỗi khi tải dữ liệu";
        });
    },
});

export const { addAssignment, toggleComplete, deleteAssignment, setFilter } =
  assignmentsSlice.actions;

export default assignmentsSlice.reducer;