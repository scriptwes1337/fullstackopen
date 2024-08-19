import data from "../../data/patientsData";
import patientData from "../../data/patientsData";
import { Entry, EntryWithoutId, Gender, NonSensitivePatientData, Patient } from "../types";
import { v4 as uuidv4 } from "uuid";

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
    entries: []
  };

  data.push(newPatient);
  return newPatient;
};

const addEntryToPatient = (patientId: string, entry: EntryWithoutId): Patient => {
  const patient = patientData.find((p) => p.id === patientId);

  if (!patient) {
    throw new Error("Patient not found");
  }

  const newEntry: Entry = {
    id: uuidv4(),
    ...entry,
  };

  patient.entries.push(newEntry);

  return patient;
};

export default {
  getAllPatients,
  getAllNonSensitivePatientData,
  addPatient,
  addEntryToPatient
};
