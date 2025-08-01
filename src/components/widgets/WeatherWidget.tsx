import React, { useState, useEffect } from "react";
import WeatherWidgetSettings from "./WeatherWidgetSettings";

interface WeatherData {
  temp: number;
  description: string;
}

interface WeatherWidgetProps {
  city: string;
  onCityChange: (newCity: string) => void; // Callback to update city in parent
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  city,
  onCityChange,
}) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>("");
  const [showSettings, setShowSettings] = useState(false);
  const [inputCity, setInputCity] = useState(city);

  useEffect(() => {
    if (!city) return;
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e43de6f699ca2633a21f6517ae74d8b0&units=imperial`
        );
        if (!res.ok) throw new Error("City not found");
        const data = await res.json();
        setWeather({
          temp: data.main.temp,
          description: data.weather[0].description,
        });
        setError("");
      } catch {
        setError("Could not load weather data.");
        setWeather(null);
      }
    };
    fetchWeather();
  }, [city]);

  const handleSave = () => {
    if (inputCity.trim()) {
      onCityChange(inputCity.trim());
      setShowSettings(false);
    }
  };

  return (
    <div className="bg-white dark:bg-sky-800 rounded-2xl shadow p-4 relative">
      <div className="absolute top-2 right-2">
        <button
          className="text-sm semibold hover:underline mb-2"
          onClick={() => setShowSettings(!showSettings)}
        >
          {showSettings ? "Close Settings" : "Change City"}
        </button>
      </div>

      {showSettings ? (
        <div className="mt-6 space-y-2">
          <input
            type="text"
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
            placeholder="Enter a city"
            className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onCityChange(inputCity);
              }
            }}
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            onClick={handleSave}
          >
            Save City
          </button>
        </div>
      ) : error ? (
        <div className="text-red-500 mt-6">{error}</div>
      ) : !weather ? (
        <div className="mt-6">Loading...</div>
      ) : (
        <>
          <div className="rounded-2x1 p-4 dark:border-blue-700 max-w-xs">
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-200">
              Weather-{city}
            </h2>
          </div>
          <p className="text-4xl font-bold mb-2 dark:text-gray-200">
            {Math.round(weather.temp)}°F
          </p>
          <p className="capitalize">{weather.description}</p>
        </>
      )}
    </div>
  );
};

export default WeatherWidget;
