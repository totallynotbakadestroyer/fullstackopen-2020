import express from "express";
import patientService from "../services/patientService";
import { toNewEntry, toNewPatientEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientService.getNonSensitiveEntries());
});

router.get("/:id", (req, res) => {
  const patient = patientService.findPatient(req.params.id);
  if (!patient) {
    return res.status(404).json({ error: "patient is not found" });
  }
  return res.json(patient);
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.post("/:id/entries", (req, res) => {
  const patient = patientService.findPatient(req.params.id);
  if (!patient) {
    return res.status(404).json({ error: "user is not found" });
  }
  try {
    const entry = toNewEntry(req.body);
    const updatedPatient = patientService.addEntry(patient, entry);
    return res.json(updatedPatient);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

export default router;
