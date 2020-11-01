const Statistics = ({ good, neutral, bad }) => {
  const getAll = () => {
    return good + neutral + bad;
  };

  const getAverage = () => {
    return (good - bad) / getAll();
  };

  const getPositivePercent = () => {
    return (100 * good) / getAll();
  };
  return (
    <div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {getAll()}</p>
      <p>average {getAverage()}</p>
      <p>positive {getPositivePercent()} %</p>
    </div>
  );
};

export default Statistics;
