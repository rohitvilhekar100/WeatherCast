import React, { useState } from "react";
import CurrentWeather from "./components/CurrentWeather";
import SearchHistory from "./components/SearchHistory";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleSearch = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="app-container">
      <h1 className="title">🌤️ WeatherCast</h1>
      <CurrentWeather onSearch={handleSearch} />
      <SearchHistory refresh={refresh} />
    </div>
  );
}

export default App;
