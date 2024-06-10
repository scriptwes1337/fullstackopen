import React from "react";

export const Persons = ({persons, filteredPersons}) => {
  return (
    <>
      <h2>Numbers</h2>
      {filteredPersons === null
        ? persons.map((person) => {
            return (
              <div key={person.name}>
                <p>
                  {person.name} {person.number}
                </p>
              </div>
            );
          })
        : filteredPersons.map((person) => {
            return (
              <div key={person.name}>
                <p>
                  {person.name} {person.number}
                </p>
              </div>
            );
          })}
    </>
  );
};
