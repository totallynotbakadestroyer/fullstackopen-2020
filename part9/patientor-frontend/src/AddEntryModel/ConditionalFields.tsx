import { Field } from "formik";
import React, { Fragment } from "react";
import { EntryType } from "../types";
import {NumberField, TextField} from "../AddPatientModal/FormField";

export const EntryTypeFields: React.FC<{ entryType: EntryType }> = ({ entryType }) => {
  switch (entryType) {
    case EntryType.Hospital:
      return (
        <Fragment>
          <Field component={TextField} name={"discharge.date"} label={"Discharge Date"} />
          <Field component={TextField} name={"discharge.criteria"} label={"Discharge Criteria"} />
        </Fragment>
      );
    case EntryType.HealthCheck:
      return (
        <Fragment>
          <Field
            label="healthCheckRating"
            name="healthCheckRating"
            component={NumberField}
            min={0}
            max={3}
          />
        </Fragment>
      );
    case EntryType.OccupationalHealthcare:
      return (
        <Fragment>
          <Field component={TextField} name={"employerName"} label={"Employer Name"} />
          <Field component={TextField} name={"sickLeave.startDate"} label={"Sick Leave Start Date"} />
          <Field component={TextField} name={"sickLeave.endDate"} label={"Sick Leave End Date"} />
        </Fragment>
      );
    default:
      return null;
  }
};

export default EntryTypeFields;
