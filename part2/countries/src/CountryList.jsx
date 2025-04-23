const CountryList = ({ countries, handleShow }) => {
    if (countries.length > 10) {
      return <p>Too many matches. Please be more specific.</p>;
    } else if (countries.length > 1) {
      return (
        <ul>
          {countries.map((country) => (
            <li key={country.name.common}>
              {country.name.common}{" "}
              <button onClick={() => handleShow(country.name.common)}>Show</button>
            </li>
          ))}
        </ul>
      );
    } else if (countries.length === 1) {
      const country = countries[0];
      return (
        <div>
          <h1>{country.name.common}</h1>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area} km²</p>
          <p>Languages: {Object.values(country.languages).join(", ")}</p>
          <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width="200" />
        </div>
      );
    }
    return null;
  };
  export {CountryList}