import React, { useState, useEffect } from "react";
import Filter from "./components/Filter.js";
import PersonForm from "./components/PersonForm.js";
import Persons from "./components/Persons.js";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  const fetchPersons = () => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  };

  useEffect(fetchPersons, []);

  const personsToShow = filterName
    ? persons.filter((person) =>
        person.name.toLowerCase().startsWith(filterName.toLowerCase())
      )
    : persons;

  const addName = (event) => {
    event.preventDefault();
    if (persons.some((e) => e.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <div>
      <div>
        <h2>Phonebook</h2>
        <Filter
          handleFilterChange={handleFilterChange}
          filterName={filterName}
        />
      </div>
      <div>
        <h2>add a new</h2>
        <PersonForm
          addName={addName}
          handleNameChange={handleNameChange}
          handlePhoneChange={handlePhoneChange}
          newName={newName}
          newNumber={newNumber}
        />
      </div>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
