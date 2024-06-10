import React from 'react'

export const Filter = ({handleFilterInput}) => {
  return (
    <div>
      filter shown with <input onChange={handleFilterInput} />
    </div>
  );
}
