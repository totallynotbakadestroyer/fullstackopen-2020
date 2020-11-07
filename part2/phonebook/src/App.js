import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/PersonsService";
import Notification from "./components/Notification.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [notification, setNotification] = useState({});

  const fetchPersons = () => {
    personsService.getAll().then((response) => setPersons(response));
  };

  const addName = (event) => {
    event.preventDefault();
    const person = { name: newName, number: newNumber };
    if (persons.some((e) => e.name === newName && e.number === newNumber)) {
      alert(`${newName} is already added to phonebook`);
    } else if (persons.some((e) => e.name === newName)) {
      updatePerson(persons.find((e) => e.name === newName).id, person);
    } else {
      setNewName("");
      setNewNumber("");
      personsService
        .newPerson(person)
        .then((response) => {
          generateNotification(
            `${person.name} has been successfully added to phonebook`,
            "success"
          );
          setPersons(persons.concat(response));
        })
        .catch(() => {
          generateNotification(
            `Information of ${person.name} has already been removed from server`,
            "error"
          );
          setPersons(persons.filter((e) => e.name !== person.name));
        });
    }
  };

  const generateNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const updatePerson = (id, person) => {
    if (
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      setNewName("");
      setNewNumber("");
      personsService
        .updatePerson(id, person)
        .then((response) => {
          const personsCopy = [...persons];
          console.log(response);
          personsCopy[
            personsCopy.findIndex((e) => e.name === response.name)
          ] = response;
          generateNotification(
            `Information of ${person.name} has been successfully updated`,
            "success"
          );
          setPersons(personsCopy);
        })
        .catch(() => {
          generateNotification(
            `Information of ${person.name} has already been removed from server`,
            "error"
          );
          setPersons(persons.filter((e) => e.name !== person.name));
        });
    }
  };

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personsService
        .deletePerson(person)
        .then(() => {
          generateNotification(
            `Information of ${person.name} has been successfully deleted`,
            "success"
          );
          setPersons(persons.filter((x) => x.id !== person.id));
        })
        .catch(() => {
          generateNotification(
            `Information of ${person.name} has already been removed from server`,
            "error"
          );
          setPersons(persons.filter((e) => e.name !== person.name));
        });
    }
  };

  useEffect(fetchPersons, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilterName(event.target.value);
  };

  const personsToShow = filterName
    ? persons.filter((person) =>
        person.name.toLowerCase().startsWith(filterName.toLowerCase())
      )
    : persons;

  return (
    <div>
      <div>
        <h2>Phonebook</h2>
        <Notification notification={notification} />
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
      <Persons deletePerson={deletePerson} personsToShow={personsToShow} />
    </div>
  );
};

export default App;
