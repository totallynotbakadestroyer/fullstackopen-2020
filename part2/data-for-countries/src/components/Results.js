import React from "react";
import Weather from "./Weather.js";

const Country = ({ country }) => {
  return (
    <div>
      <div>
        <h1>{country.name}</h1>
      </div>
      <div>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
      </div>
      <div>
        <h2>languages</h2>
        <ul>
          {country.languages.map((x) => (
            <li key={x.name}>{x.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <img width={200} src={country.flag} alt={`${country.name} flag`} />
      </div>
      <div>
        <Weather countryName={country.name} />
      </div>
    </div>
  );
};

const Results = ({ countriesToShow, handleSelect }) => {
  switch (true) {
    case countriesToShow.length === 0:
      return <div>Nothing is found</div>;
    case countriesToShow.length > 1 && countriesToShow.length < 10:
      return (
        <div>
          {countriesToShow.map((x) => (
            <div key={x.name}>
              {x.name}
              <button onClick={() => handleSelect(x.name)}>show</button>
            </div>
          ))}
        </div>
      );
    case countriesToShow.length > 10:
      return <div>Too many matches, specify another filter</div>;
    case countriesToShow.length === 1:
      return <Country country={countriesToShow[0]} />;
    default:
      return <div>Error</div>;
  }
};
export default Results;
