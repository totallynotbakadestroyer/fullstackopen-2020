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
  if(getAll() === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
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
