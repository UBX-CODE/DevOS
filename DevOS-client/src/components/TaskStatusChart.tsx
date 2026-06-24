import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  completed: number;
  pending: number;
}

const TaskStatusChart = ({
  completed,
  pending,
}: Props) => {
  const data = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];

  return (
    <div className="bg-white border border-[#f0eadd] rounded-xl p-6">
      <h2 className="text-xl font-serif mb-4">
        Task Status
      </h2>

      <div className="h-72">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius={100}
            >
              <Cell fill="#1f1e1e" />
              <Cell fill="#d6d3d1" />
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TaskStatusChart;