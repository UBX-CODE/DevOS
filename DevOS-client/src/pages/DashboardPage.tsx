import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/dashboard.service";
import { getGithubProfile, getGithubRepos } from "../services/github.service";
import { getLeetcodeProfile } from "../services/leetcode.service";
import { FiGithub, FiCode, FiActivity, FiFolder, FiCheckSquare } from "react-icons/fi";
import GithubContribution from "../components/GithubContribution";

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
  const [repos, setRepos] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getDashboardStats();
        setStats(response.stats);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchGithubProfile = async () => {
      try {
        const response = await getGithubProfile();
        setGithubData(response.github);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchLeetcodeProfile = async () => {
        try {
          const response = await getLeetcodeProfile();
          setLeetcodeData(response.leetcode);
        } catch (error) {
          console.error(error);
        }
      };

    const fetchGithubRepos = async () => {
      try {
        const response = await getGithubRepos();
        setRepos(response.repos);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchGithubRepos();
    fetchLeetcodeProfile();
    fetchGithubProfile();
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[#111] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-12">
      
      {/* Top Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {[
          { label: "Total Projects", value: stats?.totalProjects, icon: <FiFolder size={20} className="text-gray-400" /> },
          { label: "Total Tasks", value: stats?.totalTasks, icon: <FiCheckSquare size={20} className="text-gray-400" /> },
          { label: "Completed", value: stats?.completedTasks, icon: <FiCheckSquare size={20} className="text-[#111]" /> },
          { label: "Pending", value: stats?.pendingTasks, icon: <FiActivity size={20} className="text-orange-400" /> },
          { label: "Completion", value: `${stats?.completionRate}%`, icon: <FiActivity size={20} className="text-green-600" /> }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white border border-[#f0eadd] shadow-sm rounded-xl p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-gray-500">{stat.label}</h2>
              {stat.icon}
            </div>
            <p className="text-3xl font-serif text-[#111]">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Main Integrations) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* GitHub Profile */}
          {githubData && (
            <div className="bg-white border border-[#f0eadd] shadow-sm rounded-xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <FiGithub size={120} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-6 mb-8">
                  <img src={githubData.avatar_url} alt="Avatar" className="w-20 h-20 rounded-full border border-gray-200" />
                  <div>
                    <h2 className="text-2xl font-serif font-medium text-[#111]">{githubData.name}</h2>
                    <a href={githubData.html_url} target="_blank" rel="noreferrer" className="text-[15px] text-gray-500 hover:text-black transition">
                      @{githubData.login}
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="border border-[#f0eadd] bg-[#FAF6F0] p-4 rounded-lg">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Repos</h3>
                    <p className="text-2xl font-serif text-[#111]">{githubData.public_repos}</p>
                  </div>
                  <div className="border border-[#f0eadd] bg-[#FAF6F0] p-4 rounded-lg">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Followers</h3>
                    <p className="text-2xl font-serif text-[#111]">{githubData.followers}</p>
                  </div>
                  <div className="border border-[#f0eadd] bg-[#FAF6F0] p-4 rounded-lg">
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Following</h3>
                    <p className="text-2xl font-serif text-[#111]">{githubData.following}</p>
                  </div>
                </div>
              </div>
              <GithubContribution username={githubData.login} />
            </div>
          )}

          {/* LeetCode Analytics */}
          {leetcodeData && (
            <div className="bg-white border border-[#f0eadd] shadow-sm rounded-xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <FiCode size={120} />
              </div>
              <div className="relative z-10">
                <h2 className="text-xl font-serif font-medium text-[#111] mb-6">LeetCode Analytics</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {leetcodeData.submitStats.acSubmissionNum.map((item: any) => (
                    <div key={item.difficulty} className="border border-[#f0eadd] bg-[#FAF6F0] rounded-lg p-4">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{item.difficulty}</h3>
                      <p className="text-2xl font-serif text-[#111]">{item.count}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Productivity Score */}
          <div className="bg-white border border-[#f0eadd] shadow-sm rounded-xl p-8">
            <div className="flex justify-between items-end mb-4">
              <h2 className="text-xl font-serif font-medium text-[#111]">Productivity Score</h2>
              <span className="text-sm font-medium text-gray-600">{stats?.completionRate || 0}%</span>
            </div>
            <div className="w-full bg-[#FAF6F0] border border-[#f0eadd] rounded-full h-3 overflow-hidden">
              <div
                className="bg-[#1f1e1e] h-3 rounded-full transition-all duration-1000"
                style={{ width: `${stats?.completionRate || 0}%` }}
              />
            </div>
          </div>

        </div>

        {/* Right Column (Recent Repositories) */}
        <div className="lg:col-span-1">
          {repos.length > 0 && (
            <div className="bg-white border border-[#f0eadd] shadow-sm rounded-xl p-6 h-full">
              <div className="flex items-center gap-2 mb-6">
                <FiGithub size={20} className="text-[#111]"/>
                <h2 className="text-xl font-serif font-medium text-[#111]">Recent Repositories</h2>
              </div>
              <a
                href={`https://github.com/${githubData?.login}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-gray-500 hover:text-black"
              >
                View All →
              </a>
              <div className="space-y-3">
                {repos.slice(0, 5).map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="block border border-[#f0eadd] bg-[#FAF6F0] rounded-lg p-4 hover:bg-gray-50 transition"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="font-medium text-[#111] text-[15px] truncate w-[70%]">{repo.name}</h3>
                    </div>
                    <p className="text-[13px] text-gray-500 line-clamp-2 font-light">{repo.description}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>
                        {repo.language || "Unknown"}
                      </span>
                      <span>
                        {new Date(repo.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;