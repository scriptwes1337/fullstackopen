import React from "react";
import { Diagnosis, Entry, HealthCheckRating } from "../../types";
import { Card, CardContent, Typography } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

const HealthRatingIcon: React.FC<{ rating: HealthCheckRating }> = ({
  rating,
}) => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return <FavoriteIcon style={{ color: "green" }} />;
    case HealthCheckRating.LowRisk:
      return <FavoriteIcon style={{ color: "yellow" }} />;
    case HealthCheckRating.HighRisk:
      return <FavoriteIcon style={{ color: "orange" }} />;
    case HealthCheckRating.CriticalRisk:
      return <FavoriteIcon style={{ color: "red" }} />;
    default:
      return null;
  }
};

const EntryDetails: React.FC<{ entry: Entry; diagnosesList: Diagnosis[] }> = ({
  entry,
  diagnosesList,
}) => {
  const getDiagnosisName = (code: string) => {
    const diagnosis = diagnosesList.find((d) => d.code === code);
    return diagnosis ? diagnosis.name : code;
  };

  switch (entry.type) {
    case "Hospital":
      return (
        <Card style={{ marginBottom: "10px" }}>
          <CardContent>
            <Typography variant="h6">
              {entry.date} <LocalHospitalIcon />
            </Typography>
            <Typography>{entry.description}</Typography>
            <Typography>Specialist: {entry.specialist}</Typography>
            {entry.diagnosisCodes && (
              <Typography>
                Diagnosis codes:{" "}
                <span>
                  {entry.diagnosisCodes.map((code) => (
                    <div key={code}>
                      <p>
                        {code} - {getDiagnosisName(code)}
                      </p>
                    </div>
                  ))}
                </span>
              </Typography>
            )}
            <Typography>
              Discharge: {entry.discharge?.date}, {entry.discharge?.criteria}
            </Typography>
          </CardContent>
        </Card>
      );
    case "OccupationalHealthcare":
      return (
        <Card style={{ marginBottom: "10px" }}>
          <CardContent>
            <Typography variant="h6">
              {entry.date} <WorkIcon />
            </Typography>
            <Typography>{entry.description}</Typography>
            <Typography>Specialist: {entry.specialist}</Typography>
            <Typography>Employer: {entry.employerName}</Typography>
            {entry.diagnosisCodes && (
              <Typography>
                Diagnosis codes:{" "}
                <span>
                  {entry.diagnosisCodes.map((code) => (
                    <div key={code}>
                      <p>
                        {code} - {getDiagnosisName(code)}
                      </p>
                    </div>
                  ))}
                </span>
              </Typography>
            )}
            {entry.sickLeave && (
              <Typography>
                Sick leave: {entry.sickLeave.startDate} -{" "}
                {entry.sickLeave.endDate}
              </Typography>
            )}
          </CardContent>
        </Card>
      );
    case "HealthCheck":
      return (
        <Card style={{ marginBottom: "10px" }}>
          <CardContent>
            <Typography variant="h6">
              {entry.date} <MedicalServicesIcon />
            </Typography>
            <Typography>{entry.description}</Typography>
            <Typography>Specialist: {entry.specialist}</Typography>
            <HealthRatingIcon rating={entry.healthCheckRating} />
          </CardContent>
        </Card>
      );
    default:
      return null;
  }
};

export default EntryDetails;
