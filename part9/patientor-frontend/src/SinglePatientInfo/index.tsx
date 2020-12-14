import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Gender, Patient } from "../types";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { Icon } from "semantic-ui-react";

const SinglePatientInfo = () => {
  const { id } = useParams();
  const [{ patientsFull }, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient | null | undefined>(null);
  useEffect(() => {
    const fetchPatient = () => {
      console.log("effect");
      const patientInStore = Object.values(patientsFull).find(
        (x) => x.id === id
      );
      if (!patientInStore) {
        axios.get(`${apiBaseUrl}/patients/${id}`).then(({ data }) => {
          if (!data.error) {
            dispatch({ type: "ADD_PATIENT_FULL", payload: data });
            setPatient(data);
          }
        });
      } else {
        setPatient(patientInStore);
      }
    };
    fetchPatient();
  }, [dispatch, id, patientsFull]);
  if (!patient) {
    return null;
  }

  const getGenderIcon = (gender: Gender): any => {
    switch (gender) {
      case "male":
        return "mars";
      case "female":
        return "venus";
      case "other":
        return "neutral";
      default:
        return null;
    }
  };

  return (
    <div>
      <div>
        <h2>
          {patient.name} <Icon name={getGenderIcon(patient.gender)} />
        </h2>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
      </div>
    </div>
  );
};

export default SinglePatientInfo;
