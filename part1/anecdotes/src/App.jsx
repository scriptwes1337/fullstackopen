import { useState } from "react";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    ["If it hurts, do it more often.", 0],
    ["Adding manpower to a late software project makes it later!", 0],
    [
      "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      0,
    ],
    [
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      0,
    ],
    ["Premature optimization is the root of all evil.", 0],
    [
      "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
      0,
    ],
    [
      "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
      0,
    ],
    ["The only way to go fast, is to go well.", 0],
  ]);

  const [selected, setSelected] = useState(0);
  const [randomIndex, setRandomIndex] = useState(0);
  const [mostVoted, setMostVoted] = useState(0);

  const handleRandomAnecdote = () => {
    setRandomIndex(Math.floor(Math.random() * anecdotes.length));
    setSelected(randomIndex);
  };

  const handleVote = () => {
    const copy = [...anecdotes];
    copy[selected][1] += 1;
    setAnecdotes(copy);
    findMostVoted();
  };

  const findMostVoted = () => {
    let mostVotes = 0;
    anecdotes.forEach((item) => {
      if (item[1] > mostVotes) {
        mostVotes = item[1];
        setMostVoted({
          content: item[0],
          votes: item[1],
        });
      }
    });
  };

  return (
    <>
      <h1>Anecote of the day</h1>
      <div>{anecdotes[selected][0]}</div>
      <div>has {anecdotes[selected][1]} votes</div>
      <button onClick={handleRandomAnecdote}>next anecdote</button>
      <button onClick={handleVote}>vote</button>
      {mostVoted === 0 ? null : (
        <>
          <h1>Most voted anecdote</h1>
          <div>{mostVoted.content}</div>
          <div>has {mostVoted.votes} votes</div>
        </>
      )}
    </>
  );
};

export default App;
