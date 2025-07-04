import React, { useEffect, useState } from "react";
import "./SearchHistory.css";

const SearchHistory = ({ refresh }) => {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/history");
      const data = await res.json();
      console.log("Fetched history:", data); // Debug log
      setHistory(data);
    } catch {
      console.error("Failed to fetch history");
    }
  };

  const handleClear = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/history/clear", {
        method: "DELETE",
      });
      if (res.ok) {
        setHistory([]);
      }
    } catch {
      console.error("Failed to clear history");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [refresh]);

  return (
    <div className="history-container">
      <h3>🔁 Recent Searches</h3>
      <ul>
        {history.map((item, idx) => (
          <li key={idx}>
            {item.city} — {new Date(item.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
      {history.length > 0 && (
        <button onClick={handleClear}>Clear History</button>
      )}
    </div>
  );
};

export default SearchHistory;

