import { useEffect, useState } from "react";
import { Filter } from "./components/Filter";
import { Form } from "./components/Form";
import { Persons } from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((res) => setPersons(res.data))
  }, [])

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
    };
    setPersons([...persons, newPerson]);
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
      <Persons persons={persons} filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
