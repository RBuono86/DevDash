import React, { useEffect, useState } from "react";

const getRandomUsage = () => Math.floor(Math.random() * 100);

const SystemStatsWidget: React.FC = () => {
  const [cpu, setCpu] = useState(0);
  const [memory, setMemory] = useState(0);
  const [disk, setDisk] = useState(0);

  useEffect(() => {
    // Update stats every 5 seconds
    const interval = setInterval(() => {
      setCpu(getRandomUsage());
      setMemory(getRandomUsage());
      setDisk(getRandomUsage());
    }, 5000);

    // Initialize once immediately
    setCpu(getRandomUsage());
    setMemory(getRandomUsage());
    setDisk(getRandomUsage());

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 rounded-2xl shadow p-4">
      <h2 className="text-xl font-semibold mb-3">System Stats (Mock)</h2>
      <ul className="space-y-3">
        <li>
          <p className="font-medium">CPU Usage</p>
          <progress className="w-full" value={cpu} max={100} />
          <p>{cpu}%</p>
        </li>
        <li>
          <p className="font-medium">Memory Usage</p>
          <progress className="w-full" value={memory} max={100} />
          <p>{memory}%</p>
        </li>
        <li>
          <p className="font-medium">Disk Usage</p>
          <progress className="w-full" value={disk} max={100} />
          <p>{disk}%</p>
        </li>
      </ul>
    </div>
  );
};

export default SystemStatsWidget;
