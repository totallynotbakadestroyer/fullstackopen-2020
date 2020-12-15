import patientsData from "../../data/patients";
import {
  NewEntry,
  NewPatientEntry,
  PatientEntry,
  PublicPatient,
} from "../types";
import { nanoid } from "nanoid/non-secure";

const getEntries = () => {
  return patientsData;
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: nanoid(),
    ...entry,
  };
  patientsData.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (patient: PatientEntry, entry: NewEntry): PatientEntry => {
  const newEntry = {
    id: nanoid(),
    ...entry,
  };
  patient.entries.push(newEntry);
  return updatePatient(patient);
};

const updatePatient = (patient: PatientEntry): PatientEntry => {
  const index = patientsData.findIndex((x) => x.id === patient.id);
  patientsData[index] = patient;
  return patientsData[index];
};

const findPatient = (id: string): PatientEntry | undefined => {
  return patientsData.find((patient) => patient.id === id);
};

const getNonSensitiveEntries = (): PublicPatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findPatient,
  updatePatient,
  addEntry,
};
