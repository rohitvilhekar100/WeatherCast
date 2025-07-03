import React from "react";

export default function ForecastWeather() {
  const dummyForecast = [
    { day: "Mon", temp: "29°C", condition: "Sunny" },
    { day: "Tue", temp: "27°C", condition: "Cloudy" },
    { day: "Wed", temp: "25°C", condition: "Rain" },
  ];

  return (
    <div className="bg-white bg-opacity-70 rounded-xl p-6 w-full max-w-md shadow-lg">
      <h2 className="text-xl font-semibold mb-4">3-Day Forecast</h2>
      <div className="grid grid-cols-3 gap-4">
        {dummyForecast.map((item, index) => (
          <div
            key={index}
            className="bg-blue-100 rounded-lg p-3 text-center shadow-sm"
          >
            <p className="font-semibold">{item.day}</p>
            <p className="text-lg">{item.temp}</p>
            <p className="text-sm text-gray-700">{item.condition}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
