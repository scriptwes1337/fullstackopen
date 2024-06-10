import React from "react";

export const Persons = ({ persons, filteredPersons, handleDeletePerson }) => {
  return (
    <>
      <h2>Numbers</h2>
      {filteredPersons === null
        ? persons.map((person) => {
            return (
              <div key={person.name}>
                <p>
                  {person.name} {person.number}
                  <button
                    name={person.name}
                    id={person.id}
                    onClick={handleDeletePerson}
                  >
                    delete
                  </button>
                </p>
              </div>
            );
          })
        : filteredPersons.map((person) => {
            return (
              <div key={person.name}>
                <p>
                  {person.name} {person.number}
                  <button
                    name={person.name}
                    id={person.id}
                    onClick={handleDeletePerson}
                  >
                    delete
                  </button>
                </p>
              </div>
            );
          })}
    </>
  );
};
