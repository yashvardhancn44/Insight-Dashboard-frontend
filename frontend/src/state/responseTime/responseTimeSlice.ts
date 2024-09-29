import { createSlice } from "@reduxjs/toolkit";

interface TabState {
  value: string;
}

const initialState: TabState = {
  value: "date",
};

const responseTimeSlice = createSlice({
  name: "responseTabBtn",
  initialState,
  reducers: {
    switchToDate: (state) => {
      state.value = "date";
    },
    switchToWeek: (state) => {
      state.value = "week";
    },
  },
});

export const { switchToDate, switchToWeek } = responseTimeSlice.actions;

export default responseTimeSlice.reducer;
