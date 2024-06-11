import { useEffect, useState } from "react";
import { Filter } from "./components/Filter";
import { Form } from "./components/Form";
import { Persons } from "./components/Persons";
import { fetchPersons } from "./services/fetchPersons";
import { addPerson } from "./services/addPerson";
import { deletePerson } from "./services/deletePerson";
import { updatePerson } from "./services/updatePerson";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(null);
  const personsLink = "/api/persons";
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    fetchPersons(personsLink)
      .then((res) => setPersons(res.data))
      .catch((error) => {
        setErrorMsg(`Failed to fetch persons: ${error.message}`);
        setInterval(() => {
          setErrorMsg(null);
        }, 5000);
      });
  }, []);

  const handleNameInput = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberInput = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterInput = (e) => {
    if (e.target.value !== "") {
      setFilteredPersons(
        persons.filter((person) =>
          person.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
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

    const newPerson = {
      name: newName,
      number: newNumber
    };

    if (checkExistingName.length > 0) {
      if (
        confirm(
          `${checkExistingName[0].name} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        const existingPerson = persons.find(
          (person) => person.name === newName
        );

        const updatedPerson = {
          name: existingPerson.name,
          number: newNumber,
          _id: existingPerson._id,
        };

        updatePerson(`${personsLink}/${existingPerson._id}`, updatedPerson)
          .then(() => {
            fetchPersons(personsLink)
              .then((res) => {
                setPersons(res.data);
                setSuccessMsg(`Updated ${newName} successfully`);
                setInterval(() => {
                  setSuccessMsg(null);
                }, 5000);
              })
              .catch((error) => {
                setErrorMsg(`Failed to fetch persons: ${error.message}`);
                setInterval(() => {
                  setErrorMsg(null);
                }, 5000);
              });
          })
          .catch((error) => {
            setErrorMsg(
              `${error.message}: ${newName} has already been removed from the server`
            );
            setInterval(() => {
              setErrorMsg(null);
            }, 5000);
          });
      }
    } else {
      addPerson(personsLink, newPerson)
        .then((res) => {
          fetchPersons(personsLink).then((res) => setPersons(res.data));
          setSuccessMsg(`Added ${newName} successfully`);
          setInterval(() => {
            setSuccessMsg(null);
          }, 5000);
        })
        .catch((error) => {
          console.log(error)
          setErrorMsg(`Failed to add ${newName}: ${error.response.data.error}`);
          setInterval(() => {
            setErrorMsg(null);
          }, 5000);
        });
    }
  };

  const handleDeletePerson = (e) => {
    if (confirm(`Delete ${e.target.name}?`)) {
      deletePerson(personsLink, e.target.id)
        .then(() => {
          fetchPersons(personsLink).then((res) => setPersons(res.data));
          setSuccessMsg(`Deleted ${e.target.name} successfully`);
          setInterval(() => {
            setSuccessMsg(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMsg(`Failed to delete ${e.target.name}: ${error.message}`);
          setInterval(() => {
            setErrorMsg(null);
          }, 5000);
        });
    }
  };

  return (
    <div>
      {successMsg === null ? null : (
        <p
          style={{
            color: "green",
            fontSize: "1.5rem",
            backgroundColor: "lightgrey",
            border: "solid 3px darkgreen",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          {successMsg}
        </p>
      )}
      {errorMsg === null ? null : (
        <p
          style={{
            color: "red",
            fontSize: "1.5rem",
            backgroundColor: "lightgrey",
            border: "solid 3px darkred",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          {errorMsg}
        </p>
      )}
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
