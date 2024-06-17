import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    addedAnecdoteNotif(state, action) {
      return `you added ${action.payload}`;
    },
    voteAnecdoteNotif(state, action) {
      return `you voted ${action.payload}`;
    },
    resetNotification(state, action) {
      return "";
    },
  },
});

export const { addedAnecdoteNotif, voteAnecdoteNotif, resetNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
