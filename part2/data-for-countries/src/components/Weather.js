import axios from "axios";
import React, { useState, useEffect } from "react";
const api_key = process.env.REACT_APP_API_KEY;

const Weather = ({ countryName }) => {
  const [weather, setWeather] = useState({});
  const getWeather = () => {
    axios
      .get("http://api.weatherstack.com/current", {
        crossDomains: true,
        params: {
          access_key: api_key,
          query: countryName,
        },
      })
      .then((response) => {
        setWeather(response.data.current);
      });
  };
  useEffect(getWeather, [countryName]);
  return (
    <div>
      <h2>weather in {countryName}</h2>
      <p>
        <strong>temperature</strong> {weather.temperature} celsius
      </p>
      <img src={weather.weather_icons} alt={weather.weather_description} />
      <p>
        <strong>wind:</strong> {weather.wind_speed} mph direction{" "}
        {weather.wind_dir}
      </p>
    </div>
  );
};

export default Weather;
