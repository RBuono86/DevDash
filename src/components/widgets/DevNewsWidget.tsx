import React, { useEffect, useState } from "react";

const newsHeadlines = [
  {
    title: "React 19 Beta Released",
    source: "React Blog",
  },
  {
    title: "Node.js 22 is now available",
    source: "Node.js Foundation",
  },
  {
    title: "TypeScript 5.5 brings new inference features",
    source: "TypeScript Weekly",
  },
  {
    title: "GitHub introduces Copilot Workspace",
    source: "GitHub News",
  },
  {
    title: "Vite 5.0 announced with major performance boosts",
    source: "Frontend Daily",
  },
];

const DevNewsWidget: React.FC = () => {
  const [news, setNews] = useState<{ title: string; source: string }[]>([]);

  useEffect(() => {
    const shuffled = [...newsHeadlines].sort(() => 0.5 - Math.random());
    setNews(shuffled.slice(0, 3)); // Show 3 headlines
  }, []);

  return (
    <div className="bg-indigo-100 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100 rounded-2xl shadow p-4">
      <h2 className="text-xl font-semibold mb-3">Dev News</h2>
      <ul className="space-y-2 text-sm">
        {news.map((item, index) => (
          <li
            key={index}
            className="border-b border-indigo-300 dark:border-indigo-700 pb-2"
          >
            <p className="font-medium">{item.title}</p>
            <p className="text-xs text-indigo-700 dark:text-indigo-300">
              {item.source}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DevNewsWidget;
