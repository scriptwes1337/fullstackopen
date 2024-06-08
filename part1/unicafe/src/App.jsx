import { useState } from "react";

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text={"good"} value={good} />
          <StatisticLine text={"neutral"} value={neutral} />
          <StatisticLine text={"bad"} value={bad} />
          <StatisticLine text={"all"} value={all} />
          <StatisticLine text={"average"} value={average} />
          <StatisticLine text={"positive"} value={positive + "%"} />
        </tbody>
      </table>
    </>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Button = ({ buttonName, handleVote }) => {
  return (
    <>
      <button onClick={() => handleVote(buttonName)}>{buttonName}</button>
    </>
  );
};

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

  let all = good + neutral + bad;
  let average = (good - bad) / (good + neutral + bad);
  let positive = (good / (good + neutral + bad)) * 100;

  return (
    <>
      <h1>give feedback</h1>
      <Button buttonName={"good"} handleVote={handleVote} />
      <Button buttonName={"neutral"} handleVote={handleVote} />
      <Button buttonName={"bad"} handleVote={handleVote} />
      {good === 0 && neutral === 0 && bad === 0 ? (
        <p>No feedback given</p>
      ) : (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          all={all}
          average={average}
          positive={positive}
        />
      )}
    </>
  );
}

export default App;
