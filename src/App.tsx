import React, { useState, useEffect } from "react";
import WeatherWidget from "./components/widgets/WeatherWidget";
import GitHubCommitsWidget from "./components/widgets/GitHubCommitsWidget";
import PomodoroWidget from "./components/widgets/PomodoroWidget";
import TaskListWidget from "./components/widgets/TaskListWidget";
import QuoteWidget from "./components/widgets/QuoteWidget";
import DevNewsWidget from "./components/widgets/DevNewsWidget";
import SystemStatsWidget from "./components/widgets/SystemStatsWidget";
import CalendarWidget from "./components/widgets/CalendarWidget";
import ProductivityScore from "./components/ProductivityScore";
import NowPlayingWidget from "./components/widgets/NowPlayingWidget";
import SettingsModal from "./components/SettingsModal";
import ThemeToggle from "./components/ThemeToggle"; // your toggle button component

// Widget keys type
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

function App() {
  // Theme state and syncing with localStorage and <html> class
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Other app state
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [widgetsVisible, setWidgetsVisible] = useState<
    Record<WidgetKeys, boolean>
  >({
    Weather: true,
    GitHubCommits: true,
    Pomodoro: true,
    Tasks: true,
    Quote: true,
    DevNews: true,
    SystemStats: true,
    Calendar: true,
    ProductivityScore: true,
    NowPlaying: true,
  });

  const [weatherCity, setWeatherCity] = useState("New York");
  const [pomodoroLength, setPomodoroLength] = useState(25);
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);

  const toggleWidgetVisibility = (widget: WidgetKeys) => {
    setWidgetsVisible((prev) => ({
      ...prev,
      [widget]: !prev[widget],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-300">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          DevDash – Developer Productivity Dashboard
        </h1>
        <div className="flex items-center space-x-4">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button
            onClick={() => setSettingsOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
          >
            Settings
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {widgetsVisible.Weather && (
          <WeatherWidget city={weatherCity} onCityChange={setWeatherCity} />
        )}
        {widgetsVisible.GitHubCommits && <GitHubCommitsWidget />}
        {widgetsVisible.Pomodoro && (
          <PomodoroWidget
            length={pomodoroLength}
            onComplete={() => setPomodorosCompleted((prev) => prev + 1)}
          />
        )}
        {widgetsVisible.Tasks && (
          <TaskListWidget
            onCompleteTask={() => setTasksCompleted((prev) => prev + 1)}
          />
        )}
        {widgetsVisible.Quote && <QuoteWidget />}
        {widgetsVisible.DevNews && <DevNewsWidget />}
        {widgetsVisible.SystemStats && <SystemStatsWidget />}
        {widgetsVisible.Calendar && <CalendarWidget />}
        {widgetsVisible.ProductivityScore && (
          <ProductivityScore
            tasksCompleted={tasksCompleted}
            pomodorosCompleted={pomodorosCompleted}
          />
        )}
        {widgetsVisible.NowPlaying && <NowPlayingWidget />}
      </div>

      {settingsOpen && (
        <SettingsModal
          widgetsVisible={widgetsVisible}
          toggleWidgetVisibility={toggleWidgetVisibility}
          weatherCity={weatherCity}
          setWeatherCity={setWeatherCity}
          pomodoroLength={pomodoroLength}
          setPomodoroLength={setPomodoroLength}
          onClose={() => setSettingsOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
