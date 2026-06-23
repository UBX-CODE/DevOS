import { useState, useEffect } from "react";
import { updateProfile, getProfile } from "../services/settings.service";
import { FiSettings, FiUser, FiGithub, FiCode } from "react-icons/fi";

function SettingsPage() {
  const [name, setName] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [leetcodeUsername, setLeetcodeUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    try {
      await updateProfile({ name, githubUsername, leetcodeUsername });
      setMessage("Profile Updated Successfully");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setName(response.user.name);
        setGithubUsername(response.user.githubUsername || "");
        setLeetcodeUsername(response.user.leetcodeUsername || "");
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="max-w-3xl mx-auto pb-12">
      <div className="flex items-center gap-3 mb-8">
        <FiSettings size={28} className="text-[#111]" />
        <h1 className="text-3xl font-serif tracking-tight text-[#111]">Settings</h1>
      </div>

      <div className="bg-white border border-[#f0eadd] shadow-sm rounded-xl p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FiUser className="text-gray-400" /> Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#FAF6F0] border border-[#f0eadd] px-4 py-3 rounded text-[15px] focus:outline-none focus:border-gray-400 transition"
            placeholder="Your Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FiGithub className="text-gray-400" /> GitHub Username
          </label>
          <input
            type="text"
            value={githubUsername}
            onChange={(e) => setGithubUsername(e.target.value)}
            className="w-full bg-[#FAF6F0] border border-[#f0eadd] px-4 py-3 rounded text-[15px] focus:outline-none focus:border-gray-400 transition"
            placeholder="username"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <FiCode className="text-gray-400" /> LeetCode Username
          </label>
          <input
            type="text"
            value={leetcodeUsername}
            onChange={(e) => setLeetcodeUsername(e.target.value)}
            className="w-full bg-[#FAF6F0] border border-[#f0eadd] px-4 py-3 rounded text-[15px] focus:outline-none focus:border-gray-400 transition"
            placeholder="username"
          />
        </div>

        <div className="pt-4 flex items-center gap-4">
          <button
            onClick={handleSave}
            className="bg-[#1f1e1e] text-white px-8 py-3.5 rounded text-xs tracking-widest font-semibold hover:bg-black transition whitespace-nowrap"
          >
            SAVE CHANGES
          </button>
          
          {message && (
            <p className="text-[#111] bg-[#FAF6F0] border border-[#f0eadd] px-4 py-2.5 rounded text-sm font-medium">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;