const stats = [
  {
    title: "Projects",
    value: 4,
  },
  {
    title: "Tasks",
    value: 12,
  },
  {
    title: "GitHub",
    value: 58,
  },
  {
    title: "LeetCode",
    value: 240,
  },
];

const todayTasks = [
  {
    id: 1,
    title: "Finish Authentication",
    completed: false,
  },
  {
    id: 2,
    title: "Solve 2 LeetCode Problems",
    completed: true,
  },
  {
    id: 3,
    title: "Push DevOS Updates",
    completed: false,
  },
];

import StatsCard from "../components/StatsCard";
import TaskCard from "../components/TaskCard";

const DashboardPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        DashBoard
      </h1>
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} title={stat.title} value={stat.value} />
        ))}
      </div>
      <div className="mt-8">

        <h2 className="mb-4 text-2xl font-semibold">
          Today's Tasks
        </h2>

        <div className="space-y-3">

          {todayTasks.map((task) => (
            <TaskCard key={task.id} title={task.title} completed={task.completed}/>
          ))}

        </div>
      </div>
    </div>
  );
};

export default DashboardPage;