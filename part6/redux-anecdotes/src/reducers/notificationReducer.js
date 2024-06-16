import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    addedAnecdote(state, action) {
      return `you added ${action.payload}`;
    },
    voteAnecdote(state, action) {
      return `you voted ${action.payload}`;
    },
    resetNotification(state, action) {
      return "";
    },
  },
});

export const { addedAnecdote, voteAnecdote, resetNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
