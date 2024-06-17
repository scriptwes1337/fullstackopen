import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    notificationMessage(state, action) {
      return action.payload;
    },
    clearNotification(state, action) {
      return "";
    },
  },
});

export const { notificationMessage, clearNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;

export const setNotification = (message, timeout) => {
  return async (dispatch) => {
    dispatch(notificationMessage(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, timeout * 1000);
  };
};
