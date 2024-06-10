import React from "react";

export const Course = ({ course }) => {
  const totalExercises = course.parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );

  const Header = ({ courseName }) => <h1>{courseName}</h1>;

  const Content = ({ parts }) => (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </>
  );

  const Part = ({ part }) => (
    <p>
      {part.name} {part.exercises}
    </p>
  );

  const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

  return (
    <>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total sum={totalExercises} />
    </>
  );
};
