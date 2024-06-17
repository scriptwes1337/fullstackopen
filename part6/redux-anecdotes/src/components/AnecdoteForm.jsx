import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdotesReducer";
import {
  addedAnecdoteNotif,
  resetNotification,
} from "../reducers/notificationReducer";

export const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleAddAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    dispatch(createAnecdote(content))
    dispatch(addedAnecdoteNotif(content));
    setTimeout(() => {
      dispatch(resetNotification());
    }, 5000);
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleAddAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};
