import React from "react";
import { useStateValue } from "../state";
import { Formik, Form, Field } from "formik";
import {
  DiagnosisSelection,
  Option,
  SelectField,
  TextField,
} from "../AddPatientModal/FormField";
import { EntryType, NewEntry } from "../types";
import { Button, Grid } from "semantic-ui-react";
import EntryTypeFields from "./ConditionalFields";

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

const entryOptions: Option[] = [
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.HealthCheck, label: "Health Check" },
  { value: EntryType.OccupationalHealthcare, label: "Occupational Healthcare" },
];

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: EntryType.Hospital as never,
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        employerName: "",
        discharge: {
          date: "",
          criteria: "",
        },
        sickLeave: {
          startDate: "",
          endDate: "",
        },
        healthCheckRating: 0,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const error = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = error;
        }
        if (!values.description) {
          errors.description = error;
        }
        if (!values.date) {
          errors.date = error;
        }
        if (!values.specialist) {
          errors.occupation = error;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <SelectField name={"type"} label={"Type"} options={entryOptions} />
            <EntryTypeFields entryType={values.type} />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
