import React, { useState, useEffect } from "react";

interface PomodoroWidgetProps {
  length: number;
  onComplete?: () => void;
}

const PomodoroWidget: React.FC<PomodoroWidgetProps> = ({
  length,
  onComplete,
}) => {
  // Trigger onComplete when timer finishes
  const handleComplete = () => {
    if (onComplete) onComplete();
  };
  const [secondsLeft, setSecondsLeft] = useState(length * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setSecondsLeft(length * 60);
  }, [length]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isRunning) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="bg-white dark:bg-orange-800 rounded-2xl shadow p-4">
      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-200">
        Pomodoro Timer
      </h2>
      <div className="text-3xl font-mono mb-4">{formatTime(secondsLeft)}</div>
      <button
        onClick={() => setIsRunning((prev) => !prev)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
      >
        {isRunning ? "Pause" : "Start"}
      </button>
    </div>
  );
};

export default PomodoroWidget;
