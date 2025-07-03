import React, { useEffect, useState } from "react";
import "./SearchHistory.css";

const SearchHistory = ({ refresh }) => {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/history");
      const data = await res.json();
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

// import React, { useEffect, useState } from "react";
// import "./SearchHistory.css";

// const SearchHistory = ({ refresh }) => {
//   const [history, setHistory] = useState([]);

//   const fetchHistory = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/history");
//       const data = await res.json();
//       setHistory(data);
//     } catch (err) {
//       console.error("Failed to fetch history:", err);
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
//     } catch (err) {
//       console.error("Failed to clear history:", err);
//     }
//   };

//   useEffect(() => {
//     fetchHistory();
//   }, [refresh]);

//   return (
//     <div className="history-container">
//       <h3 className="history-title">🔁 Recent Searches</h3>
//       {history.length > 0 ? (
//         <ul className="history-list">
//           {history.map((item, index) => (
//             <li key={index}>
//               {item.city} —{" "}
//               {item.createdAt
//                 ? new Date(item.createdAt).toLocaleString()
//                 : "N/A"}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="no-history">No recent searches</p>
//       )}
//       {history.length > 0 && (
//         <button className="clear-btn" onClick={handleClear}>
//           Clear History
//         </button>
//       )}
//     </div>
//   );
// };

// export default SearchHistory;
