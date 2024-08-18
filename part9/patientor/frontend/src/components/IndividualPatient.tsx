import { useParams } from "react-router-dom";
import { Diagnosis, Patient } from "../types";
import patients from "../services/patients";
import diagnoses from "../services/diagnoses";
import { useEffect, useState } from "react";

export const IndividualPatient = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnosesList, setDiagnosesList] = useState<Diagnosis[] | null>(null);

  const id = useParams().id;

  useEffect(() => {
    const fetchPatient = async () => {
      if (typeof id === "string") {
        const requestedPatient: Patient = await patients.getPatientById(id);
        setPatient(requestedPatient);
      }
    };

    const fetchDiagnoses = async () => {
      const retrievedDiagnoses: Diagnosis[] = await diagnoses.getAll();
      setDiagnosesList(retrievedDiagnoses);
    };

    fetchPatient();
    fetchDiagnoses();
  }, []);

  if (!patient || !diagnosesList) {
    return <div>no patient found.</div>;
  }

  return (
    <div>
      <h3>{patient.name}</h3>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
      <h4>entries</h4>
      {patient.entries.map((entry) => {
        return (
          <div key={entry.id}>
            <p>
              {entry.date} {entry.description}
            </p>
            <ul>
              {entry.diagnosisCodes
                ? entry.diagnosisCodes.map((code) => {
                    const diagnosis = diagnosesList.find(
                      (d) => d.code === code
                    );
                    return (
                      <li key={code}>
                        {code}
                        {diagnosis ? diagnosis.name : "Unknown diagnosis"}
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
        );
      })}
    </div>
  );
};
