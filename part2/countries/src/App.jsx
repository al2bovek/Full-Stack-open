import React, { useState } from "react";
import { SearchBar } from "./SearchBar";
import { CountryList } from "./CountryList";
import { fetchCountries } from "./api";
import Weather from "./Weather";
import './App.css';

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleShow = (countryName) => {
    const country = countries.find(c => c.name.common === countryName);
    setSelectedCountry(country);
  };

  const handleSearch = async (query) => {
    if (selectedCountry && !query.includes(selectedCountry.name.common.toLowerCase())) {
      setSelectedCountry(null);
    }

    setQuery(query); 
    if (query === "") {
      setCountries([]);
      setSelectedCountry(null);
      return;
    }
  
    try {
      const results = await fetchCountries(query);
      setCountries(results);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  return (
    <div>
      <div>
        <SearchBar handleSearch={handleSearch} />
        {selectedCountry ? (
          <>
          <div>
            <h1>{selectedCountry.name.common}</h1>
            <p>Capital: {selectedCountry.capital}</p>
            <p>Area: {selectedCountry.area} km²</p>
            <p>Languages: {Object.values(selectedCountry.languages).join(", ")}</p>
            <img src={selectedCountry.flags.svg} alt={`Flag of ${selectedCountry.name.common}`} width="200" />
          </div>
          <Weather capital={selectedCountry.capital} />
          </>
        ) : (
          <>
            <CountryList countries={countries} handleShow={handleShow} />
          </>

        )}

      </div>
     
    </div>
  );
};

export default App;
