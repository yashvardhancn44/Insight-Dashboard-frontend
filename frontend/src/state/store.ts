import { configureStore } from "@reduxjs/toolkit";
import responseTimeSlice from "./responseTime/responseTimeSlice";

export const store = configureStore({
  reducer: {
    responseTabBtn: responseTimeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
