import React, { useState } from "react";
import "./CurrentWeather.css";

const CurrentWeather = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    setError("");
    setWeather(null);
    try {
      const res = await fetch(`http://localhost:5000/api/weather?city=${city}`);
      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setWeather(data);
        await fetch("http://localhost:5000/api/history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ city }),
        });
        onSearch();
      }
    } catch {
      setError("Something went wrong!");
    }
  };

  return (
    <div className="weather-container">
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Check Weather</button>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-details">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Feels Like: {weather.main.feels_like}°C</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default CurrentWeather;
