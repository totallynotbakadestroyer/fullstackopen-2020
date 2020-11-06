import React, { useState, useEffect } from "react";
import axios from "axios";
import Results from "./components/Results.js";

const App = () => {
  const [filterRequest, setFilterRequest] = useState("");
  const [countries, setCountries] = useState([]);

  const countriesToShow = filterRequest
    ? countries.filter((x) =>
        x.name.toLowerCase().startsWith(filterRequest.toLowerCase())
      )
    : countries;

  const getCountries = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then((result) => {
      setCountries(result.data);
    });
  };

  useEffect(getCountries, []);

  const handleFilterRequest = (event) => {
    setFilterRequest(event.target.value);
  };

  return (
    <div>
      <label>
        find countries{" "}
        <input value={filterRequest} onChange={handleFilterRequest} />
      </label>
      <Results countriesToShow={countriesToShow} />
    </div>
  );
};

export default App;
