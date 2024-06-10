import React from 'react'

export const Form = ({handleNameInput, handleNumberInput, handleAddPerson}) => {
  return (
    <form>
      <div>
        name: <input onChange={handleNameInput} />
      </div>
      <div>
        number: <input onChange={handleNumberInput} />
      </div>
      <div>
        <button type="submit" onClick={handleAddPerson}>
          add
        </button>
      </div>
    </form>
  );
}
