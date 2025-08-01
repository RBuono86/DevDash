import React, { useEffect, useState } from "react";

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

const GitHubCommitsWidget: React.FC = () => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [error, setError] = useState<string>("");

  const [username, setUsername] = useState(
    () => localStorage.getItem("githubUsername") || "RBuono86"
  );
  const [repo, setRepo] = useState(
    () => localStorage.getItem("githubRepo") || "devdash"
  );

  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${username}/${repo}/commits`
        );
        if (!response.ok) throw new Error("Failed to fetch commits.");
        const data = await response.json();
        setCommits(data.slice(0, 5));
        setError("");
      } catch {
        setError("Could not load commits. Please check the username and repo.");
      }
    };

    fetchCommits();
  }, [username, repo]);

  const saveSettings = () => {
    localStorage.setItem("githubUsername", username);
    localStorage.setItem("githubRepo", repo);
    setShowSettings(false);
  };

  return (
    <div className="bg-white dark:bg-red-600 rounded-2xl shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-200">
          Latest Commits
        </h2>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="text-sm text-blue-600 dark:text-gray-800 hover:underline"
        >
          {showSettings ? "Close" : "Settings"}
        </button>
      </div>

      {showSettings && (
        <div className="mb-4 space-y-2">
          <input
            type="text"
            placeholder="GitHub Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm"
          />
          <input
            type="text"
            placeholder="Repo Name"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            className="w-full px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-sm"
          />
          <button
            onClick={saveSettings}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
          >
            Save
          </button>
        </div>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <ul className="space-y-2 text-sm">
        {commits.map((commit) => (
          <li key={commit.sha}>
            <a
              href={commit.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              {commit.commit.message}
            </a>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {commit.commit.author.name} —{" "}
              {new Date(commit.commit.author.date).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GitHubCommitsWidget;
