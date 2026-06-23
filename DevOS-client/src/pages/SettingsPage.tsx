import { useState , useEffect } from "react";
import { updateProfile , getProfile} from "../services/settings.service";

function SettingsPage() {

  const [name, setName] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [leetcodeUsername, setLeetcodeUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleSave = async () => {
      try {
        await updateProfile({  name, githubUsername, leetcodeUsername, });
        setMessage("Profile Updated Successfully");
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
    <div className="max-w-2xl">
      <h1 className=" text-3xl font-bold mb-6">Settings</h1>
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} className="w-full border p-2 rounded"/>

        </div>
        <div>
          <label> GitHub Username</label>
          <input type="text" value={githubUsername}
            onChange={(e) => setGithubUsername(e.target.value)}
            className="w-full border p-2 rounded"/>
        </div>

        <div>

          <label>
            LeetCode Username
          </label>

          <input
            type="text"
            value={
              leetcodeUsername
            }
            onChange={(e) =>
              setLeetcodeUsername(
                e.target.value
              )
            }
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          onClick={handleSave}
          className="
            bg-black
            text-white
            px-4
            py-2
            rounded
          "
        >
          Save Changes
        </button>
        {message && (
          <p className="
            text-green-600
          ">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default SettingsPage;