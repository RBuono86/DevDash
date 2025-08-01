import React from "react";
import { format } from "date-fns";
import { P } from "framer-motion/dist/types.d-Cjd591yU";

const CalendarWidget: React.FC = () => {
  const today = new Date();
  const day = format(today, "EEEE");
  const date = format(today, "MMMM d, yyyy");

  return (
    <div className="bg-white dark:bg-indigo-800 rounded-2xl shadow p-4">
      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-200">
        📅 Calendar
      </h2>
      <p className="text-4xl font-bold text-gray-900 dark:text-gray-200">
        {format(today, "d")}
      </p>
      <p className="text-lg text-gray-900 dark:text-gray-200">{day}</p>
      <p className="text-sm text-gray-500 dark:text-gray-200">{date}</p>
    </div>
  );
};

export default CalendarWidget;
