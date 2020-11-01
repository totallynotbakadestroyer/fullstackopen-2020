import React, { useState } from "react";
import ReactDOM from "react-dom";
import Statistics from "./components/Statistics.js";

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button text={"good"} handleClick={() => setGood(good + 1)} />
        <Button text={"neutral"} handleClick={() => setNeutral(neutral + 1)} />
        <Button text={"bad"} handleClick={() => setBad(bad + 1)} />
      </div>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
