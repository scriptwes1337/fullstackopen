import { ContentProps } from "../types";
import { Part } from "./Part";

export const Content = (props: ContentProps) => {
  const { courseParts } = props;

  return (
    <div>
      {courseParts.map((_part, index) => {
        return <Part part={courseParts[index]} key={courseParts[0].name} />;
      })}
    </div>
  );
};
