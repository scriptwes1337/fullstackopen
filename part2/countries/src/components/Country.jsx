import React, { useEffect, useState } from "react";

export const Country = ({ country, weatherData }) => {
  const [displayMore, setDisplayMore] = useState(false);

  useEffect(() => {
    if (weatherData) {
      setDisplayMore(true);
    }
  }, [weatherData]);

  const handleShowMore = () => {
    setDisplayMore(!displayMore);
  };

  return (
    <div>
      {displayMore ? (
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
          {weatherData ? 
          <div>
            <h2>Weather in {country.capital}</h2>
            <p>temperature {weatherData.current.temp_c} Celcius</p>
            <img src={weatherData.current.condition.icon} />
            <p>wind {weatherData.current.wind_kph} kph</p>
          </div> : null}
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
