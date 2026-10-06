import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AssignmentStatusFilter } from "../assignments/types";

interface FilterState {
  status: AssignmentStatusFilter;
}

const initialState: FilterState = { status: "all" };

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setStatusFilter(state, action: PayloadAction<AssignmentStatusFilter>) {
      state.status = action.payload;
    },
  },
});

export const { setStatusFilter } = filterSlice.actions;
export default filterSlice.reducer;