import { useState, useEffect } from "react";

interface WeatherWidgetSettingsProps {
  city: string;
  setCity: (city: string) => void;
}

const WeatherWidgetSettings: React.FC<WeatherWidgetSettingsProps> = ({
  city,
  setCity,
}) => {
  const [inputCity, setInputCity] = useState(city);

  useEffect(() => {
    setInputCity(city); // Sync when city prop changes
  }, [city]);

  return (
    <div>
      <label className="block text-sm font-medium mb-1">City</label>
      <input
        type="text"
        value={inputCity}
        onChange={(e) => setInputCity(e.target.value)}
        placeholder="Enter city"
        className="w-full px-3 py-2 border border-gray-300 rounded placeholder-gray-400"
      />
      <button
        onClick={() => {
          if (inputCity.trim()) {
            setCity(inputCity.trim());
          }
        }}
        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Save
      </button>
    </div>
  );
};

export default WeatherWidgetSettings;
