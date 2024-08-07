import data from "../../data/patientsData";
import patientData from "../../data/patientsData";
import { Gender, NonSensitivePatientData, Patient } from "../types";

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

const addPatient = (
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: string,
  occupation: string
): Patient => {
  let patientGender: Gender;

  if (gender.toLowerCase() === "male") {
    patientGender = Gender.Male;
  } else if (gender.toLowerCase() === "female") {
    patientGender = Gender.Female;
  } else {
    patientGender = Gender.Other;
  }

  const newPatient: Patient = {
    id,
    name,
    dateOfBirth,
    ssn,
    gender: patientGender,
    occupation,
  };

  data.push(newPatient);
  return newPatient;
};

export default {
  getAllPatients,
  getAllNonSensitivePatientData,
  addPatient,
};
