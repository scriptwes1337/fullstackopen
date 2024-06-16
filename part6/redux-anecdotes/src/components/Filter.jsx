import React from "react";
import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

export const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(filterChange(e.target.value));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      <label htmlFor="filterInput">filter</label>
      <input
        onChange={handleChange}
        type="text"
        name="filterInput"
        id="filterInput"
      />
    </div>
  );
};
