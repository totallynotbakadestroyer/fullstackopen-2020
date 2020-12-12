import patientsData from "../../data/patients";
import { PatientEntry } from "../types";

const getEntries = () => {
  return patientsData;
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
};
