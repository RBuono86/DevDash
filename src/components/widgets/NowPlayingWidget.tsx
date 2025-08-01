import React from "react";

const NowPlayingWidget: React.FC = () => {
  return (
    <div className="bg-white dark:bg-pink-900 p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">
        Now Playing
      </h2>
      <p className="text-gray-600 dark:text-gray-300">
        Nothing playing right now 🎵
      </p>
    </div>
  );
};

export default NowPlayingWidget;
