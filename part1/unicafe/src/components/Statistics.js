const Statistic = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
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
    <div>
      <Statistic text={"good"} value={good} />
      <Statistic text={"neutral"} value={neutral} />
      <Statistic text={"bad"} value={bad} />
      <Statistic text={"all"} value={getAll()} />
      <Statistic text={"average"} value={getAverage()} />
      <Statistic text={"positive"} value={getPositivePercent()} />
    </div>
  );
};

export default Statistics;
