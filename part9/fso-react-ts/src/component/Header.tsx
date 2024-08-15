import { HeaderProps } from "../types";

export const Header = (props: HeaderProps) => {
  const { courseName } = props;

  return <h1>{courseName}</h1>;
};
