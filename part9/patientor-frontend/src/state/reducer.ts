import { State } from "./state";
import { DiagnoseEntry, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT_FULL";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSES";
      payload: DiagnoseEntry[];
    };

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients,
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient,
  };
};

export const addPatientFull = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT_FULL",
    payload: patient,
  };
};

export const setDiagnoses = (diagnoses: DiagnoseEntry[]): Action => {
  return {
    type: "SET_DIAGNOSES",
    payload: diagnoses,
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "ADD_PATIENT_FULL":
      return {
        ...state,
        patientsFull: {
          ...state.patientsFull,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_DIAGNOSES":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
            {}
          ),
        },
      };
    default:
      return state;
  }
};
