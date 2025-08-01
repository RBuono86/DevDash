import React from "react";

interface ProductivityScoreProps {
  tasksCompleted: number;
  pomodorosCompleted: number;
}

const ProductivityScore: React.FC<ProductivityScoreProps> = ({
  tasksCompleted,
  pomodorosCompleted,
}) => {
  // Fake score formula
  const score = tasksCompleted * 10 + pomodorosCompleted * 5;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4">
      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-200">
        Productivity Score
      </h2>
      <p className="text-4xl font-bold text-green-400">{score}</p>
    </div>
  );
};

export default ProductivityScore;
