import express from "express"
import patientsService from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res) => {
  return res.send(patientsService.getAllNonSensitivePatientData())
})

export default router;