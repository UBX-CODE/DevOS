import {GitHubCalendar} from "react-github-calendar";

interface Props {
  username: string;
}

const GithubContribution = ({ username }: Props) => {
  return (
    <div className="bg-white border border-[#f0eadd] rounded-xl p-6">
      <h2 className="text-xl font-serif mb-4">
        Contributions
      </h2>

      <GitHubCalendar username={username} />
    </div>
  );
};

export default GithubContribution;