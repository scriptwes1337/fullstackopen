import { TotalProps } from "../types";

export const Total = (props: TotalProps) => {
  const { totalExercises } = props;

  return <p>Number of exercises {totalExercises}</p>;
};
