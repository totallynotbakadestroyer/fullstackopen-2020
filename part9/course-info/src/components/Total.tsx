import React from "react";
import { CoursePart } from "../Types";

const Total: React.FC<{ courseParts: Array<CoursePart> }> = ({
  courseParts,
}) => {
  const totalExercises = () => {
    return courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);
  };
  return <p>Number of exercises {totalExercises()}</p>;
};

export default Total;
