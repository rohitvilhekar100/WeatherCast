import React, { useState } from "react";

const WeatherCast = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const res = await fetch(`http://localhost:5000/api/weather?city=${city}`);
      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setWeather(null);
        setForecast(null);
      } else {
        setWeather(data.current);
        setForecast(data.forecast);
        setError("");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
      setWeather(null);
      setForecast(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-100 to-blue-300 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-white my-6 drop-shadow-md">🌤️ WeatherCast</h1>

      <div className="w-full max-w-lg flex flex-col sm:flex-row items-center gap-4 bg-white p-6 rounded-lg shadow-xl">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-semibold"
        >
          Search
        </button>
      </div>

      {error && <p className="text-red-600 mt-4 font-semibold">{error}</p>}

      {(weather || forecast) && (
        <div className="mt-10 w-full max-w-5xl flex flex-col lg:flex-row gap-6">
          {/* Today's Weather */}
          {weather && (
            <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-700 mb-2">Today in {weather.name}</h2>
              <p className="text-lg capitalize text-gray-600">{weather.weather[0].description}</p>
              <p className="text-5xl font-bold text-blue-600 mt-2">{weather.main.temp}°C</p>
              <div className="mt-4 text-gray-600">
                <p>Humidity: {weather.main.humidity}%</p>
                <p>Wind Speed: {weather.wind.speed} m/s</p>
                <p>Pressure: {weather.main.pressure} hPa</p>
              </div>
            </div>
          )}

          {/* 3-Day Forecast */}
          {forecast && forecast.length > 0 && (
            <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-700 mb-4">3-Day Forecast</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {forecast.slice(0, 3).map((day, idx) => (
                  <div key={idx} className="bg-blue-100 rounded-md p-4 text-center shadow-md">
                    <p className="font-semibold text-gray-700">{day.date}</p>
                    <p className="capitalize text-gray-600">{day.description}</p>
                    <p className="text-2xl font-bold text-blue-700">{day.temp}°C</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherCast;
