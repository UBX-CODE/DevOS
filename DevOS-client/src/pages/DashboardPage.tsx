import { useEffect, useState } from "react";
import { getDashboardStats} from "../services/dashboard.service";
import { getGithubProfile} from "../services/github.service";

interface DashboardStats {
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  completionRate: number;
}

function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [githubData, setGithubData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

    const fetchGithubProfile = async() => {
    try{
      const response = await getGithubProfile();
      console.log(
        "Github Response:",
        response
      );
      setGithubData(response.github);
    }catch(error){
      console.error(error);
    }
  };
    fetchGithubProfile();
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

      {githubData && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">GitHub Profile</h2>
          <div className ="grid grid-cols-2 gap-4">
          <div className ="flex items-center gap-4 mb-6">
            <img src={githubData.avatar_url} alt={"Avatar"} className="w-24 h-24 rounded-full border-2 border-gray-300"/>
            <div>
              <h2 className="text-2xl font-bold">{githubData.name}</h2>
              <p className="text-gray-600">{githubData.login}</p>
            </div>
          </div>
          <div className="border p-4 rounded">
            <h3>Username</h3>
            <p>{githubData.login}</p>
          </div>
          <div className="border p-4 rounded">
            <h3>Followers</h3>
            <p>{githubData.followers}</p>
          </div>
          <div className="border p-4 rounded">
            <h3>Following</h3>
            <p>{githubData.following}</p>
          </div>
          <div className="border p-4 rounded">
            <h3>Public Repositories</h3>
            <p>{githubData.public_repos}</p>
          </div>
          </div>
        </div>
      )}

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