import React from "react";

const SinglePerson = ({ person, deletePerson }) => {
  return (
    <div>
      <p key={person.name}>
        {person.name} {person.number}
        <button onClick={() => deletePerson(person)}>delete</button>
      </p>
    </div>
  );
};

const Persons = ({ personsToShow, deletePerson }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <SinglePerson deletePerson={deletePerson} key={person.id} person={person} />
      ))}
    </div>
  );
};
export default Persons;
