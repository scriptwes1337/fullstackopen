import axios from "axios";
import { useEffect, useState } from "react";
import { Filter } from "./components/Filter";
import { Country } from "./components/Country";

function App() {
  const [countries, setCountries] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState(null);

  const link = "https://studies.cs.helsinki.fi/restcountries/api/all";

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
            <Country country={country} key={country.name.common} showAll={true} />
          ))
        ) : (
          filteredCountries.map((country) => (
            <Country country={country} key={country.name.common} showAll={false}/>
          ))
        )}
      </div>
    </>
  );
}

export default App;
