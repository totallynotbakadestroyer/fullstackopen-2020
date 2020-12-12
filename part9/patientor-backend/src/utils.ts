import {Gender, NewPatientEntry} from "./types";

const isString = (param: any): param is string => {
  return typeof param === "string" || param instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
  return ["male", "female", "other"].includes(gender);
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or wrong name: " + name);
  }
  return name;
};

const parseDateOfBirth = (date: any): string => {
  if (!date || !isDate(date)) {
    throw new Error("Incorrect or wrong date of birth: " + date);
  }
  return date;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or wrong ssn: " + ssn);
  }
  return ssn;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or wrong gender: " + gender);
  }
  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or wrong occupation: " + occupation);
  }
  return occupation;
};

const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
  };
};

export default toNewPatientEntry;
