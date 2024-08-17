import axios from "axios";
import { DiaryType } from "../types";

export const getAllDiaries = () => {
  return axios
    .get<DiaryType[]>("/api/diaries")
    .then((response) => response.data);
};

export const createDiary = (object: DiaryType) => {
  return axios
    .post<DiaryType>("/api/diaries", object)
    .then((response) => response.data);
};
