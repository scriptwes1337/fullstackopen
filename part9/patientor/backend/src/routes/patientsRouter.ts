import express from "express";
import patientsService from "../services/patientsService";
import { v4 as uuidv4 } from "uuid";
import { isString } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  return res.send(patientsService.getAllNonSensitivePatientData());
});

router.post("/", (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const id = uuidv4();

  if (
    !(
      isString(name) ||
      isString(dateOfBirth) ||
      isString(ssn) ||
      isString(gender) ||
      isString(occupation)
    )
  ) {
    throw new Error("Invalid patient details.");
  }

  const newPatient = patientsService.addPatient(id, name, dateOfBirth, ssn, gender, occupation);

  return res.status(200).json(newPatient)
});

export default router;
