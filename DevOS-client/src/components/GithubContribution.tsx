import {GitHubCalendar} from "react-github-calendar";

interface Props {
  username: string;
}

const GithubContribution = ({ username }: Props) => {
  return (
    <div className="mt-8 pt-8 border-t border-[#f0eadd]">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
        Contributions
      </h2>
      <div className="w-full overflow-x-auto pb-2 flex justify-center lg:justify-start">
        <GitHubCalendar 
          username={username} 
          colorScheme="light"
          theme={{
            light: ['#FAF6F0', '#d5cec4', '#a39d95', '#635f59', '#1f1e1e']
          }}
          fontSize={12}
          blockSize={12}
          blockMargin={4}
        />
      </div>
    </div>
  );
};

export default GithubContribution;