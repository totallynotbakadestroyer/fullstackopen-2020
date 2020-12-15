import {
  DiagnoseEntry,
  Discharge,
  Entry,
  Gender,
  HealthCheckRating,
  NewBaseEntry,
  NewEntry,
  NewPatientEntry,
  SickLeave,
} from "./types";

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isString = (param: any): param is string => {
  return typeof param === "string" || param instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
  return ["male", "female", "other"].includes(gender);
};

const isHealthCheckRating = (
  healthCheckRating: any
): healthCheckRating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(Number(healthCheckRating));
};

const isArrayOfStrings = (array: any[]): boolean => {
  return array.every((item) => {
    return isString(item);
  });
};

const parseDateOfBirth = (date: any): string => {
  if (!date || !isDate(date)) {
    throw new Error("Incorrect or wrong date of birth: " + date);
  }
  return date;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or wrong gender: " + gender);
  }
  return gender;
};

const parseEntries = (entries: Entry[]): Entry[] => {
  if (!entries || !Array.isArray(entries)) {
    throw new Error("Incorrect or wrong entries" + entries);
  }
  return entries;
};

const parseString = (param: any, paramName: string): string => {
  if (!param || !isString(param)) {
    throw new Error(`Incorrect or missing ${paramName}: ${param}`);
  }
  return param;
};

const parseDate = (date: any, paramName: string): string => {
  if (!date || !isDate(date)) {
    throw new Error(`Incorrect or missing ${paramName}: ${date}`);
  }
  return date;
};

const parseDiagnosisCodes = (
  diagnosisCodes: any
): Array<DiagnoseEntry["code"]> => {
  if (
    !diagnosisCodes ||
    !Array.isArray(diagnosisCodes) ||
    !isArrayOfStrings(diagnosisCodes)
  ) {
    throw new Error("Incorrect or wrong diagnoses:" + diagnosisCodes);
  }

  return diagnosisCodes;
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  console.log(healthCheckRating);
  console.log(isHealthCheckRating(healthCheckRating));
  if (!String(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(`Incorrect or missing health rating: ${healthCheckRating}`);
  }
  return healthCheckRating;
};

const parseSickLeave = (sickLeave: any): SickLeave => {
  if (!sickLeave) throw new Error("Missing sick leave");

  return {
    startDate: parseDate(sickLeave.startDate, "sick leave startDate"),
    endDate: parseDate(sickLeave.endDate, "sick leave endDate"),
  };
};

const parseDischarge = (object: any): Discharge => {
  if (!object) throw new Error("Missing discharge");

  return {
    date: parseDate(object.date, "discharge date"),
    criteria: parseString(object.criteria, "discharge criteria"),
  };
};

export const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    name: parseString(object.name, "name"),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseString(object.ssn, "ssn"),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation, "occupation"),
    entries: parseEntries(object.entries),
  };
};

const toNewBaseEntry = (object: any): NewBaseEntry => {
  const newBaseEntry: NewBaseEntry = {
    type: parseString(object.type, "type"),
    description: parseString(object.description, "description"),
    date: parseDate(object.date, "date"),
    specialist: parseString(object.specialist, "specialist"),
  };
  if (object.diagnosisCodes) {
    newBaseEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
  }
  return newBaseEntry;
};

export const toNewEntry = (object: any): NewEntry => {
  const baseEntry = toNewBaseEntry(object) as NewEntry;
  console.log(baseEntry);

  switch (baseEntry.type) {
    case "HealthCheck":
      return {
        ...baseEntry,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    case "OccupationalHealthcare":
      const newEntry = {
        ...baseEntry,
        employerName: parseString(object.employerName, "employer name"),
      };

      if (object.sickLeave) {
        newEntry.sickLeave = parseSickLeave(object.sickLeave);
      }

      return newEntry;
    case "Hospital":
      return { ...baseEntry, discharge: parseDischarge(object.discharge) };
    default:
      return assertNever(baseEntry);
  }
};
