import React, { useState } from "react";

interface Task {
  id: number;
  text: string;
  priority: "Low" | "Medium" | "High";
  completed: boolean;
}

interface TaskListWidgetProps {
  onCompleteTask?: () => void;
}

const TaskListWidget: React.FC<TaskListWidgetProps> = ({ onCompleteTask }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">("Medium");

  const addTask = () => {
    if (!input.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      text: input.trim(),
      priority,
      completed: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    setInput("");
    setPriority("Medium");
  };

  const toggleComplete = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    if (onCompleteTask) onCompleteTask();
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="bg-white dark:bg-teal-800 rounded-2xl shadow p-4 flex flex-col">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-200">
        Task List
      </h2>

      <div className="flex mb-4 gap-2 items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow px-2 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Task["priority"])}
          className="px-2 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button
          onClick={addTask}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2 overflow-auto max-h-60">
        {tasks.map(({ id, text, priority, completed }) => (
          <li
            key={id}
            className={`flex justify-between items-center p-2 rounded border ${
              completed
                ? "bg-green-100 dark:bg-green-700 line-through text-gray-500 dark:text-gray-300"
                : "bg-gray-50 dark:bg-gray-700"
            }`}
          >
            <div className="flex items-center space-x-2">
              <span className="font-medium">{text}</span>
              <span
                className={`px-2 py-0.5 rounded text-xs font-semibold ${
                  priority === "High"
                    ? "bg-red-400 text-white"
                    : priority === "Medium"
                    ? "bg-yellow-400 text-black"
                    : "bg-green-400 text-black"
                }`}
              >
                {priority}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={completed}
                onChange={() => toggleComplete(id)}
                className="w-5 h-5"
                title="Mark as completed"
              />
              <button
                onClick={() => deleteTask(id)}
                className="text-red-600 hover:text-red-800 font-bold text-xl leading-none"
                aria-label="Delete task"
              >
                &times;
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskListWidget;
