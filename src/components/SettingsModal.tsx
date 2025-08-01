import React from "react";

type WidgetKeys =
  | "Weather"
  | "GitHubCommits"
  | "Pomodoro"
  | "Tasks"
  | "Quote"
  | "DevNews"
  | "SystemStats"
  | "Calendar"
  | "ProductivityScore"
  | "NowPlaying";

interface SettingsModalProps {
  widgetsVisible: Record<WidgetKeys, boolean>;
  toggleWidgetVisibility: (widget: WidgetKeys) => void;
  weatherCity: string;
  setWeatherCity: (city: string) => void;
  pomodoroLength: number;
  setPomodoroLength: (length: number) => void;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  widgetsVisible,
  toggleWidgetVisibility,
  weatherCity,
  setWeatherCity,
  pomodoroLength,
  setPomodoroLength,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Settings</h2>

        <div className="space-y-3">
          {Object.entries(widgetsVisible).map(([key, value]) => (
            <label key={key} className="flex justify-between items-center">
              <span className="capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </span>
              <input
                type="checkbox"
                checked={value}
                onChange={() => toggleWidgetVisibility(key as WidgetKeys)}
              />
            </label>
          ))}

          <label className="block mt-4">
            <span className="text-sm font-medium">Weather City</span>
            <input
              type="text"
              value={weatherCity}
              onChange={(e) => setWeatherCity(e.target.value)}
              placeholder="Enter city"
              className="mt-1 w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
            />
          </label>

          <label className="block mt-4">
            <span className="text-sm font-medium">
              Pomodoro Length (minutes)
            </span>
            <input
              type="number"
              min={1}
              value={pomodoroLength}
              onChange={(e) => setPomodoroLength(Number(e.target.value))}
              className="mt-1 w-full p-2 rounded border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
            />
          </label>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
