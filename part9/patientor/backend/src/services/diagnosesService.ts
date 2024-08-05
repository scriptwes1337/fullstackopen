import { Diagnosis } from "../types";
import diagnosisData from "../../data/diagnosesData";

const getAllDiagnoses = (): Diagnosis[] => {
  return diagnosisData;
};

export default {
  getAllDiagnoses,
};
