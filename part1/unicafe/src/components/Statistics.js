import React from "react";

const Statistic = ({ text, value }) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const getAll = () => {
    return good + neutral + bad;
  };

  const getAverage = () => {
    return (good - bad) / getAll();
  };

  const getPositivePercent = () => {
    return `${(100 * good) / getAll()} %`;
  };
  if (getAll() === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <table>
      <Statistic text={"good"} value={good} />
      <Statistic text={"neutral"} value={neutral} />
      <Statistic text={"bad"} value={bad} />
      <Statistic text={"all"} value={getAll()} />
      <Statistic text={"average"} value={getAverage()} />
      <Statistic text={"positive"} value={getPositivePercent()} />
    </table>
  );
};

export default Statistics;
