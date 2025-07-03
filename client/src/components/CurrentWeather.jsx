import React, { useState } from "react";
import "./CurrentWeather.css";

const CurrentWeather = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const res = await fetch(`http://localhost:5000/api/weather?city=${city}`);
      const data = await res.json();

      if (data.error) {
        setError(data.error);
        setWeather(null);
      } else {
        setWeather(data);
        setError("");
        onSearch(); // 🔁 refresh search history
      }
    } catch {
      setError("Something went wrong!");
      setWeather(null);
    }
  };

  return (
    <div className="weather-container">
      <h1 className="title">⛅ WeatherCast</h1>

      <div className="search-section">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Check Weather</button>
      </div>

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


// import React, { useState, useEffect } from "react";
// import "./CurrentWeather.css";

// const CurrentWeather = () => {
//   const [city, setCity] = useState("");
//   const [weather, setWeather] = useState(null);
//   const [error, setError] = useState("");
//   const [history, setHistory] = useState([]);

//   const fetchWeather = async () => {
//     if (!city) return;

//     try {
//       const response = await fetch(`http://localhost:5000/api/weather?city=${city}`);
//       const data = await response.json();

//       if (data.error) {
//         setError(data.error);
//         setWeather(null);
//       } else {
//         setWeather(data);
//         setError("");

//         await fetch("http://localhost:5000/api/history", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ city: data.name }),
//         });

//         fetchHistory();
//       }
//     } catch {
//       setError("Something went wrong!");
//       setWeather(null);
//     }
//   };

//   const fetchHistory = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/history");
//       const data = await res.json();
//       setHistory(data);
//     } catch {
//       // optional: error handling
//     }
//   };

//   const handleClear = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/history/clear", {
//         method: "DELETE",
//       });
//       if (res.ok) {
//         setHistory([]);
//       }
//     } catch {
//       // optional: error handling
//     }
//   };

//   useEffect(() => {
//     fetchHistory();
//   }, []);

//   return (
//     <div className="weather-container">
//       <h1 className="title">⛅ WeatherCast</h1>

//       <div className="search-section">
//         <input
//           type="text"
//           placeholder="Enter city name"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//         />
//         <button onClick={fetchWeather}>Check Weather</button>
//       </div>

//       {error && <p className="error">{error}</p>}

//       {weather && (
//         <div className="weather-details">
//           <h2>{weather.name}</h2>
//           <p>{weather.weather[0].description}</p>
//           <p>Temperature: {weather.main.temp}°C</p>
//           <p>Humidity: {weather.main.humidity}%</p>
//           <p>Feels Like: {weather.main.feels_like}°C</p>
//           <p>Wind Speed: {weather.wind.speed} m/s</p>
//         </div>
//       )}

//       {history.length > 0 && (
//         <div className="history-section">
//           <h3>🔁 Recent Searches</h3>
//           <ul>
//             {history.map((entry, idx) => (
//               <li key={idx}>
//                 {entry.city} — {new Date(entry.timestamp).toLocaleString()}
//               </li>
//             ))}
//           </ul>
//           <button onClick={handleClear} className="clear-btn">Clear History</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CurrentWeather;
