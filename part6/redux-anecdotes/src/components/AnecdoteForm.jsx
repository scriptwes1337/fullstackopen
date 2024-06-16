import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdotesReducer";

export const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleAddAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    dispatch(createAnecdote(content));
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
