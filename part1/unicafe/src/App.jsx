import { useState } from "react";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleVote = (vote) => {
    switch (vote) {
      case "good":
        return setGood((prevState) => prevState + 1);
      case "neutral":
        return setNeutral((prevState) => prevState + 1);
      case "bad":
        return setBad((prevState) => prevState + 1);
    }
  };

  return (
    <>
      <h1>give feedback</h1>
      <button onClick={() => handleVote("good")}>good</button>
      <button onClick={() => handleVote("neutral")}>neutral</button>
      <button onClick={() => handleVote("bad")}>bad</button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </>
  );
}

export default App;
