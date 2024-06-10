import axios from "axios";
import { useEffect, useState } from "react";
import { Filter } from "./components/Filter";
import { Country } from "./components/Country";

function App() {
  const [countries, setCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const link = "https://studies.cs.helsinki.fi/restcountries/api/all";
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    axios
      .get(link)
      .then((res) => {
        setCountries(res.data);
        console.log("Countries fetched");
      })
      .catch((error) => {
        console.log("Error fetching countries:", error);
      });
  }, []);

  const handleFilterInput = (e) => {
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    console.log(filteredCountries);
    if (filteredCountries.length === 1) {
      axios
        .get(
          `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${filteredCountries[0].name.common}`
        )
        .then((res) => {
          setWeatherData(res.data);
          console.log(weatherData)
        });
    }
  };

  return (
    <>
      <Filter handleFilterInput={handleFilterInput} />
      <div>
        {countries === null ? (
          <p>fetching data, please wait...</p>
        ) : (
          <h3>Country Search App</h3>
        )}
        {filteredCountries === null ? null : filteredCountries.length > 10 ? (
          <p>Too many countries</p>
        ) : filteredCountries.length === 1 ? (
          filteredCountries.map((country) => (
            <Country
              country={country}
              key={country.name.common}
              weatherData={weatherData}
            />
          ))
        ) : (
          filteredCountries.map((country) => (
            <Country
              country={country}
              key={country.name.common}
            />
          ))
        )}
      </div>
    </>
  );
}

export default App;
