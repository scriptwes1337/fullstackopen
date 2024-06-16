import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload;
      const anecdoteToUpdate = state.find((anecdote) => anecdote.id === id);
      if (anecdoteToUpdate) {
        const updatedAnecdote = {
          ...anecdoteToUpdate,
          votes: anecdoteToUpdate.votes + 1,
        };
        return state
          .map((anecdote) => (anecdote.id === id ? updatedAnecdote : anecdote))
          .sort((a, b) => b.votes - a.votes);
      }
    },
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { vote, createAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
