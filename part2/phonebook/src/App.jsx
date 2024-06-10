import { useEffect, useState } from "react";
import { Filter } from "./components/Filter";
import { Form } from "./components/Form";
import { Persons } from "./components/Persons";
import { fetchPersons } from "./services/fetchPersons";
import { addPerson } from "./services/addPerson";
import { deletePerson } from "./services/deletePerson";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [, setFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(null);
  const personsLink = "http://localhost:3001/persons";

  useEffect(() => {
    fetchPersons(personsLink).then((res) => setPersons(res.data));
  }, []);

  const handleNameInput = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberInput = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterInput = (e) => {
    setFilter(e.target.value);

    if (e.target.value !== "") {
      setFilteredPersons(
        persons.filter((person) => {
          return person.name
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
        })
      );
    } else {
      setFilteredPersons(null);
    }
  };

  const handleAddPerson = (e) => {
    e.preventDefault();

    const checkExistingName = persons.filter(
      (person) => person.name === newName
    );
    if (checkExistingName.length > 0) {
      return alert(`${newName} is already added to phonebook`);
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };
    addPerson(personsLink, newPerson).then((res) =>
      setPersons([...persons, res.data])
    );
  };

  const handleDeletePerson = (e) => {
    if (confirm(`Delete ${e.target.name}?`)) {
      try {
        deletePerson(personsLink, e.target.id).then((res) => {
          setPersons(persons.filter((person) => {
            return person.id !== res.data.id;
          }));
        });
      } catch (error) {
        console.log(`Failed to delete contact: ${error}`);
      }
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterInput={handleFilterInput} />
      <Form
        handleNameInput={handleNameInput}
        handleNumberInput={handleNumberInput}
        handleAddPerson={handleAddPerson}
      />
      <Persons
        persons={persons}
        filteredPersons={filteredPersons}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
