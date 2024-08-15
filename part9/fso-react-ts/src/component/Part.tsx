import { CoursePart } from "../types";

export const Part = ({ part }: { part: CoursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (part.kind) {
    case "basic":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>{part.description}</p>
          <p>Exercises: {part.exerciseCount}</p>
        </div>
      );
    case "group":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>Exercises: {part.exerciseCount}</p>
          <p>Group projects: {part.groupProjectCount}</p>
        </div>
      );
    case "background":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>{part.description}</p>
          <p>Exercises: {part.exerciseCount}</p>
          <p>
            Background material:{" "}
            <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
          </p>
        </div>
      );
    case "special":
      return (
        <div>
          <h3>{part.name}</h3>
          <p>{part.description}</p>
          <p>Exercises: {part.exerciseCount}</p>
          <p>
            Requirements:{" "}
            {part.requirements.map((item) => {
              return (
                <div>{item}</div>
              )
            })}
          </p>
        </div>
      );
    default:
      return assertNever(part);
  }
};
