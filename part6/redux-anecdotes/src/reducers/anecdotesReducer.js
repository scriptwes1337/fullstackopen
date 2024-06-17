import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

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
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes))
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const { vote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
