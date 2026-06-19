import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboard.service";

interface DashboardStats {
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  completionRate: number;
}

function DashboardPage() {
  const [stats, setStats] =
    useState<DashboardStats | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response =
          await getDashboardStats();

        console.log(response);

        setStats(response.stats);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="space-y-4">

        <div className="border p-4 rounded">
          <h2>Total Projects</h2>
          <p>{stats?.totalProjects}</p>
        </div>

        <div className="border p-4 rounded">
          <h2>Total Tasks</h2>
          <p>{stats?.totalTasks}</p>
        </div>

        <div className="border p-4 rounded">
          <h2>Completed Tasks</h2>
          <p>{stats?.completedTasks}</p>
        </div>

        <div className="border p-4 rounded">
          <h2>Pending Tasks</h2>
          <p>{stats?.pendingTasks}</p>
        </div>

        <div className="border p-4 rounded">
          <h2>Completion Rate</h2>
          <p>{stats?.completionRate}%</p>
        </div>

      </div>
    </div>
  );
}

export default DashboardPage;