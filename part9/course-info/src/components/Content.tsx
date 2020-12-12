import React from "react";
import { CoursePart } from "../Types";
import { assertNever } from "../utils";

const Content: React.FC<{ courseParts: Array<CoursePart> }> = ({
  courseParts,
}) => (
  <div>
    {courseParts.map((x: CoursePart) => (
      <SingleCourse key={x.name} course={x} />
    ))}
  </div>
);

const SingleCourse: React.FC<{ course: CoursePart }> = ({ course }) => {
  switch (course.name) {
    case "Fundamentals":
      return (
        <p>
          {course.name} {course.description} {course.exerciseCount}
        </p>
      );
    case "Using props to pass data":
      return (
        <p>
          {course.name} {course.groupProjectCount} {course.exerciseCount}
        </p>
      );
    case "Deeper type usage":
      return (
        <p>
          {course.name} {course.description} {course.exerciseSubmissionLink}{" "}
          {course.exerciseCount}
        </p>
      );
    case "Cool fourth part":
      return (
        <p>
          {course.name} {course.description} {course.exerciseCount}
        </p>
      );
    default:
      return assertNever(course);
  }
};
export default Content;
