import React from "react";

export const Filter = ({ handleFilterInput }) => {
  return (
    <div>
      <label htmlFor="findCountriesInput">find countries</label>
      <input
        type="text"
        name="findCountriesInput"
        id="findCountriesInput"
        onChange={handleFilterInput}
      />
    </div>
  );
};
