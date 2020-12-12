import patientsData from "../../data/patients";
import { NewPatientEntry, PatientEntry } from "../types";
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

const getNonSensitiveEntries = (): Omit<PatientEntry, "ssn">[] => {
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
  addPatient
};
