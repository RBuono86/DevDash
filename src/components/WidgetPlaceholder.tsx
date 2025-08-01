import React from "react";

export const WidgetPlaceholder = ({ name }: { name: string }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded p-4 min-h-[150px] flex items-center justify-center text-xl font-medium text-gray-700 dark:text-white">
      {name}
    </div>
  );
};
export default WidgetPlaceholder;
