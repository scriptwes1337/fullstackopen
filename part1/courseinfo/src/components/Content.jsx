import React from "react";
import { Part } from "./Part";

export const Content = ({
  course
}) => {
  return (
    <>
      <Part parts={course.parts[0]} />
      <Part parts={course.parts[1]} /> 
      <Part parts={course.parts[2]} />
    </>
  );
};
