import { useEffect, useState } from "react";
import { getDashboardStats} from "../services/dashboard.service";
import { getGithubProfile} from "../services/github.service";
import { getLeetcodeProfile } from "../services/leetcode.service";

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
  const [leetcodeData, setLeetcodeData] = useState<any>(null);

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
const fetchLeetcodeProfile =
  async () => {
    try {
      const response = await getLeetcodeProfile();
      console.log("Leetcode Response:", response);
      setLeetcodeData(response.leetcode);
    } catch (error) {
      console.error(error);
    }
};

    fetchLeetcodeProfile();
    fetchGithubProfile();
    fetchStats();
  }, []);


  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="grid grid-cols-1vlg:frid-cols-2 gap-6">
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

<div className="bg-white shadow rounded-xl p-6 mb-8">
  <div className="flex items-center gap-4 mb-6">
    <img src={githubData.avatar_url} alt="Avatar"className=" w-24 h-24 rounded-full"/>
    <div>
      <h2 className=" text-2xl font-bold ">
        {githubData.name}
      </h2>
      <p className="text-gray-500">
        @{githubData.login}
      </p>
    </div>
  </div>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">

    <div className="border p-4 rounded">
      <h3>Repos</h3>
      <p>{githubData.public_repos}</p>
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
      <h3>Profile</h3>
      <a href={githubData.html_url} target="_blank" rel="noreferrer" className="text-blue-500">Open</a>
    </div>
  </div>
</div>

{leetcodeData && (

<div className=" bg-white shadow rounded-xl p-6 mt-8 mb-8 ">
  <h2 className="text-2xl font-bold mb-4">LeetCode Analytics</h2>

  <div className=" grid grid-cols-2 md:grid-cols-4 gap-4 ">
    {leetcodeData.submitStats.acSubmissionNum.map((item:any) => (
      <div key={item.difficulty} className=" border rounded-lg p-4">
        <h3 className="text-gray-500">{item.difficulty}</h3>
        <p className=" text-3xl font-bold">{item.count}</p>
      </div>
    ))}
  </div>
</div>
)}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-gray-500 mb-2">Total Projects</h2>
          <p className="text-2xl font-bold">{stats?.totalProjects}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-gray-500 mb-2">Total Tasks</h2>
          <p className="text-2xl font-bold">{stats?.totalTasks}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-gray-500 mb-2">Completed Tasks</h2>
          <p className="text-2xl font-bold">{stats?.completedTasks}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-gray-500 mb-2">Pending Tasks</h2>
          <p className="text-2xl font-bold">{stats?.pendingTasks}</p>
        </div>

        <div className="bg-white shadow rounded-xl p-5">
          <h2 className="text-gray-500 mb-2">Completion Rate</h2>
          <p className="text-2xl font-bold">{stats?.completionRate}%</p>
        </div>

      </div>
      <div className="
  bg-white
  rounded-xl
  shadow
  p-6
  mt-8
">
  <h2 className="font-bold mb-3">
    Productivity Score
  </h2>

  <div className="
    w-full
    bg-gray-200
    rounded-full
    h-4
  ">
    <div
      className="
        bg-green-500
        h-4
        rounded-full
      "
      style={{
        width:
          `${stats?.completionRate || 0}%`
      }}
    />
  </div>

  <p className="mt-2">
    {stats?.completionRate}% Complete
  </p>
</div>
    </div>
  );
}

export default DashboardPage;