import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Diagnosis,
  Patient,
  EntryWithoutId,
  HealthCheckRating,
} from "../types";
import patients from "../services/patients";
import diagnoses from "../services/diagnoses";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  ListItemText,
  InputLabel,
  Checkbox,
} from "@mui/material";
import EntryDetails from "./EntryDetails/EntryDetails";

export const IndividualPatient = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnosesList, setDiagnosesList] = useState<Diagnosis[] | null>(null);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");
  const [entryType, setEntryType] = useState<
    "HealthCheck" | "Hospital" | "OccupationalHealthcare"
  >("HealthCheck");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [error, setError] = useState<string | null>(null);

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
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!patient) return;

    let newEntry: EntryWithoutId;

    switch (entryType) {
      case "HealthCheck":
        newEntry = {
          type: "HealthCheck",
          description,
          date,
          specialist,
          healthCheckRating,
        };
        break;
      case "Hospital":
        newEntry = {
          type: "Hospital",
          description,
          date,
          specialist,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
          diagnosisCodes,
        };
        break;
      case "OccupationalHealthcare":
        newEntry = {
          type: "OccupationalHealthcare",
          description,
          date,
          specialist,
          employerName,
          sickLeave:
            sickLeaveStartDate && sickLeaveEndDate
              ? { startDate: sickLeaveStartDate, endDate: sickLeaveEndDate }
              : undefined,
          diagnosisCodes,
        };
        break;
      default:
        return;
    }

    try {
      const updatedPatient = await patients.addEntry(patient.id, newEntry);
      setPatient(updatedPatient);
      setDescription("");
      setDate("");
      setSpecialist("");
      setHealthCheckRating(HealthCheckRating.Healthy);
      setDischargeDate("");
      setDischargeCriteria("");
      setEmployerName("");
      setSickLeaveStartDate("");
      setSickLeaveEndDate("");
      setError(null);
      setDiagnosisCodes([]);
    } catch (error) {
      console.error("Error adding entry", error);
      setError("Failed to add entry. Please check the input values.");
    }
  };

  if (!patient || !diagnosesList) {
    return <div>no patient found.</div>;
  }

  return (
    <div>
      <h3>{patient.name}</h3>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <h4>Entries</h4>
      {patient.entries && patient.entries.length > 0 ? (
        patient.entries.map((entry) => (
          <EntryDetails
            key={entry.id}
            entry={entry}
            diagnosesList={diagnosesList}
          />
        ))
      ) : (
        <p>No entries available.</p>
      )}

      <h4>Add New Entry</h4>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
        />
        <Select
          label="Entry Type"
          fullWidth
          value={entryType}
          onChange={(e) =>
            setEntryType(
              e.target.value as
                | "HealthCheck"
                | "Hospital"
                | "OccupationalHealthcare"
            )
          }
        >
          <MenuItem value="HealthCheck">Health Check</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">
            Occupational Healthcare
          </MenuItem>
        </Select>

        {entryType === "HealthCheck" && (
          <Select
            label="Health Check Rating"
            fullWidth
            value={healthCheckRating}
            onChange={(e) =>
              setHealthCheckRating(e.target.value as HealthCheckRating)
            }
          >
            <MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
            <MenuItem value={HealthCheckRating.LowRisk}>Low Risk</MenuItem>
            <MenuItem value={HealthCheckRating.HighRisk}>High Risk</MenuItem>
            <MenuItem value={HealthCheckRating.CriticalRisk}>
              Critical Risk
            </MenuItem>
          </Select>
        )}

        {entryType === "Hospital" && (
          <>
            <FormControl fullWidth>
              <InputLabel>Diagnosis Codes</InputLabel>
              <Select
                multiple
                value={diagnosisCodes}
                onChange={(e) => setDiagnosisCodes(e.target.value as string[])}
                renderValue={(selected) => selected.join(", ")}
              >
                {diagnosesList.map((diagnosis) => (
                  <MenuItem key={diagnosis.code} value={diagnosis.code}>
                    <Checkbox
                      checked={diagnosisCodes.includes(diagnosis.code)}
                    />
                    <ListItemText primary={diagnosis.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Discharge Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={dischargeDate}
              onChange={(e) => setDischargeDate(e.target.value)}
            />
            <TextField
              label="Discharge Criteria"
              fullWidth
              value={dischargeCriteria}
              onChange={(e) => setDischargeCriteria(e.target.value)}
            />
          </>
        )}

        {entryType === "OccupationalHealthcare" && (
          <>
            <FormControl fullWidth>
              <InputLabel>Diagnosis Codes</InputLabel>
              <Select
                multiple
                value={diagnosisCodes}
                onChange={(e) => setDiagnosisCodes(e.target.value as string[])}
                renderValue={(selected) => selected.join(", ")}
              >
                {diagnosesList.map((diagnosis) => (
                  <MenuItem key={diagnosis.code} value={diagnosis.code}>
                    <Checkbox
                      checked={diagnosisCodes.includes(diagnosis.code)}
                    />
                    <ListItemText primary={diagnosis.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Employer Name"
              fullWidth
              value={employerName}
              onChange={(e) => setEmployerName(e.target.value)}
            />
            <TextField
              label="Sick Leave Start Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={sickLeaveStartDate}
              onChange={(e) => setSickLeaveStartDate(e.target.value)}
            />
            <TextField
              label="Sick Leave End Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={sickLeaveEndDate}
              onChange={(e) => setSickLeaveEndDate(e.target.value)}
            />
          </>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "10px" }}
        >
          Add Entry
        </Button>
      </form>
    </div>
  );
};
