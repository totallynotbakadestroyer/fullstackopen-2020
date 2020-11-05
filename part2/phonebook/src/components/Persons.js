import React from "react";

const SinglePerson = ({ person }) => {
  return (
    <div>
      <p key={person.name}>
        {person.name} {person.number}
      </p>
    </div>
  );
};

const Persons = ({ personsToShow }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <SinglePerson person={person} />
      ))}
    </div>
  );
};
export default Persons;
