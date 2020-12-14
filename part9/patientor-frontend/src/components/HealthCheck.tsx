import { HealthCheckEntry, HealthCheckRating } from "../types";
import { Card, Icon, SemanticCOLORS } from "semantic-ui-react";
import React from "react";

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const getHeartColor = (healthRating: HealthCheckRating): SemanticCOLORS => {
    switch (healthRating) {
      case HealthCheckRating.Healthy:
        return "green";
      case HealthCheckRating.LowRisk:
        return "yellow";
      case HealthCheckRating.HighRisk:
        return "orange";
      case HealthCheckRating.CriticalRisk:
        return "red";
    }
  };
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon size={"large"} name={"user doctor"} />
        </Card.Header>
        <Card.Meta>{entry.description}</Card.Meta>
        <Card.Description>
          <Icon name={"heart"} color={getHeartColor(entry.healthCheckRating)} />
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

export default HealthCheck;
