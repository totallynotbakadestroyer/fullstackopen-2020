import React from "react";
import { HospitalEntry } from "../types";
import { Card, Icon } from "semantic-ui-react";

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon size={"large"} name={"pills"} />
        </Card.Header>
        <Card.Meta>{entry.description}</Card.Meta>
        <Card.Description>
          Patient was discharged at {entry.discharge.date} <br />
          Reason: {entry.discharge.criteria}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>Doctor: {entry.specialist}</Card.Content>
    </Card>
  );
};

export default Hospital;
