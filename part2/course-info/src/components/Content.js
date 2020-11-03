import React from "react";

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => {
        return (
          <div key={part.id}>
            <Part part={part} />
          </div>
        );
      })}
    </div>
  );
};

export default Content;
