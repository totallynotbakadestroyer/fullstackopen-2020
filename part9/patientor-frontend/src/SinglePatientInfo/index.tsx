import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { assertNever, Entry, Gender, Patient } from "../types";
import { useParams } from "react-router-dom";
import { addPatientFull, useStateValue } from "../state";
import { Icon, SemanticICONS } from "semantic-ui-react";
import HealthCheck from "../components/HealthCheck";
import Hospital from "../components/HospitalEntry";
import OccupationalHealthcare from "../components/OccupationalHealthcare";

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
            dispatch(addPatientFull(data));
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

  const getGenderIcon = (gender: Gender): SemanticICONS => {
    switch (gender) {
      case Gender.Male:
        return "mars";
      case Gender.Female:
        return "venus";
      case Gender.Other:
        return "neuter";
      default:
        return "question circle";
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
        <h2>entries</h2>
        <div>
          {patient.entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </div>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    case "Hospital":
      return <Hospital entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default SinglePatientInfo;
