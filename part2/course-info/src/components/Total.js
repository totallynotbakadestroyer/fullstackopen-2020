import React from "react";

const Total = ({ parts }) => {
  const totalCount = parts.reduce((x, y) => x + y.exercises, 0);
  return (
    <p>
      <strong>total of {totalCount} exercises</strong>
    </p>
  );
};

export default Total;
