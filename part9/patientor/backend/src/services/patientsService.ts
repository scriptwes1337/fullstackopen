import patientData from "../../data/patientsData";
import { NonSensitivePatientData, Patient } from "../types";

const getAllPatients = (): Patient[] => {
  return patientData;
};

const getAllNonSensitivePatientData = (): NonSensitivePatientData[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getAllPatients,
  getAllNonSensitivePatientData,
};
