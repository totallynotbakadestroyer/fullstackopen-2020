import React from "react";
import { OccupationalHealthcareEntry } from "../types";
import { Card, Icon } from "semantic-ui-react";

const OccupationalHealthcare: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon size={"large"} name={"stethoscope"} />{" "}
          {entry.employerName}
        </Card.Header>
        <Card.Meta>{entry.description}</Card.Meta>
      </Card.Content>
    </Card>
  );
};

export default OccupationalHealthcare;
