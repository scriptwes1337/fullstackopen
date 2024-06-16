import React from "react";
import { vote } from "../reducers/anecdotesReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  resetNotification,
  voteAnecdote,
} from "../reducers/notificationReducer";

export const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter === "") {
      return state.anecdotes;
    } else {
      return state.anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      );
    }
  });
  const dispatch = useDispatch();

  const handleVote = (id) => {
    const votedAnecdote = anecdotes.find((anecdote) => anecdote.id === id);
    dispatch(vote(id));
    dispatch(voteAnecdote(votedAnecdote.content));
    setTimeout(() => {
      dispatch(resetNotification);
    }, 5000);
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};
