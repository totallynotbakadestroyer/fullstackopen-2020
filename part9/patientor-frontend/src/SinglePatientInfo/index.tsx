import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import {
  assertNever,
  Entry,
  EntryType,
  Gender,
  NewEntry,
  Patient,
} from "../types";
import { useParams } from "react-router-dom";
import { addPatientFull, useStateValue } from "../state";
import { Button, Icon, SemanticICONS } from "semantic-ui-react";
import HealthCheck from "../components/HealthCheck";
import Hospital from "../components/HospitalEntry";
import OccupationalHealthcare from "../components/OccupationalHealthcare";
import AddEntryModal from "../AddEntryModel";

const SinglePatientInfo = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const { id } = useParams();
  const [{ patientsFull }, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient | null | undefined>(null);
  const [error, setError] = useState<string>("");
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

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  };

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addPatientFull(updatedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

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
        <Button onClick={() => openModal()}>Add</Button>
      </div>
      <AddEntryModal
        error={error}
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewEntry}
      />
    </div>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case EntryType.HealthCheck:
      return <HealthCheck entry={entry} />;
    case EntryType.Hospital:
      return <Hospital entry={entry} />;
    case EntryType.OccupationalHealthcare:
      return <OccupationalHealthcare entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default SinglePatientInfo;
