import React from 'react'

export const Part = ({parts}) => {
  return (
    <>
      <p>
        {parts.name} {parts.exercises}
      </p>
    </>
  );
}
