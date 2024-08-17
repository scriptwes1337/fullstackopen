import { DiaryType } from "../types";

export const DiaryRecord = ({ diary }: { diary: Omit<DiaryType, "comment"> }) => {
  return (
    <div>
      <h4>{diary.date}</h4>
      <p>id: {diary.id}</p>
      <p>visibility: {diary.visibility}</p>
      <p>weather: {diary.weather}</p>
    </div>
  );
};
