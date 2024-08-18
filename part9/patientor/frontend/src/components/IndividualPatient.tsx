import { useParams } from "react-router-dom";
import { Gender, Patient } from "../types";
import patients from "../services/patients";
import { useEffect, useState } from "react";
import { Male } from "@mui/icons-material";

export const IndividualPatient = () => {
  const [patient, setPatient] = useState<Patient>({
    id: "NA",
    name: "NA",
    dateOfBirth: "NA",
    ssn: "NA",
    gender: Gender.Male,
    occupation: "NA",
  });

  const id = useParams().id;

  useEffect(() => {
    const fetchPatient = async () => {
      if (typeof id === "string") {
        const requestedPatient: Patient = await patients.getPatientById(id);
        setPatient(requestedPatient);
      }
    };

    fetchPatient();
  }, []);

  return (
    <div>
      <h3>{patient.name}</h3>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  );
};
