import React, { useEffect, useState } from "react";

export const Country = ({ country, showAll }) => {
  const [displayMore, setDisplayMore] = useState(false);

  useEffect(() => {
    if (showAll) {
      setDisplayMore(true);
    }
  }, []);

  const handleShowMore = () => {
    setDisplayMore(!displayMore);
  };

  return (
    <div>
      {displayMore === true ? (
        <div>
          <h1>{country.name.common}</h1>
          <p>capital {country.capital}</p>
          <p>area {country.area}</p>
          <p style={{ fontWeight: "bold" }}>languages:</p>
          <ul>
            {Object.values(country.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img src={country.flags.png} />
          <br />
          <button onClick={handleShowMore}>hide</button>
        </div>
      ) : (
        <p>
          {country.name.common}{" "}
          <button onClick={handleShowMore}>show more</button>
        </p>
      )}
    </div>
  );
};
