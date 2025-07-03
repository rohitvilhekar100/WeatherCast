import React, { useState } from "react";
import CurrentWeather from "./components/CurrentWeather";
import SearchHistory from "./components/SearchHistory";
import "./App.css";

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleSearch = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="app-container">
      <CurrentWeather onSearch={handleSearch} />
      <SearchHistory refresh={refresh} />
    </div>
  );
}

export default App;

// import React from "react";
// import CurrentWeather from "./components/CurrentWeather";

// function App() {
//   return (
//     <div>
//       <CurrentWeather />
//     </div>
//   );
// }

// export default App;
