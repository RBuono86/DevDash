import React from "react";

interface Props {
  widgets: string[];
  toggleWidget: (widget: string) => void;
}

const allWidgets = ["GitHubCommits", "Pomodoro", "Weather", "Tasks", "Quote"];

const HideWidgetsToggle: React.FC<Props> = ({ widgets, toggleWidget }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {allWidgets.map((widget) => (
        <button
          key={widget}
          onClick={() => toggleWidget(widget)}
          className={`px-3 py-1 rounded-lg text-sm font-medium border transition 
            ${
              widgets.includes(widget)
                ? "bg-blue-600 text-white border-blue-700 hover:bg-blue-700"
                : "bg-gray-300 text-gray-700 dark:bg-gray-700 dark:text-white border-gray-400 hover:bg-gray-400"
            }`}
        >
          {widgets.includes(widget) ? `Hide ${widget}` : `Show ${widget}`}
        </button>
      ))}
    </div>
  );
};

export default HideWidgetsToggle;
