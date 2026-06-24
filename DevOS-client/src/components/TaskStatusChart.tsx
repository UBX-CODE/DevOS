import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FiTarget } from "react-icons/fi";

interface Props {
  completed: number;
  pending: number;
  completionRate: number;
}

const TaskStatusChart = ({
  completed,
  pending,
  completionRate,
}: Props) => {
  const data = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];

  return (
    <div className="bg-white border border-[#f0eadd] shadow-sm rounded-xl p-8 flex flex-col h-full gap-8">
      
      {/* Productivity Score */}
      <div>
        <div className="flex justify-between items-end mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FAF6F0] border border-[#f0eadd] rounded-lg">
              <FiTarget size={20} className="text-[#111]" />
            </div>
            <h2 className="text-xl font-serif font-medium text-[#111]">Productivity Score</h2>
          </div>
          <span className="text-sm font-medium text-[#111] bg-[#FAF6F0] border border-[#f0eadd] px-3 py-1 rounded-full">{completionRate || 0}%</span>
        </div>
        <div className="w-full bg-[#FAF6F0] border border-[#f0eadd] rounded-full h-3 overflow-hidden shadow-inner">
          <div
            className="bg-[#111] h-full rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${completionRate || 0}%` }}
          />
        </div>
      </div>

      {/* Task Status Distribution */}
      <div className="flex-1 flex flex-col">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Task Distribution</h2>
        <div className="flex-1 min-h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={90}
                paddingAngle={2}
              >
                <Cell fill="#111" />
                <Cell fill="#e5e5e5" />
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: '1px solid #f0eadd', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                itemStyle={{ color: '#111', fontWeight: 500 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-8 mt-4 pt-4 border-t border-[#f0eadd]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#111] shadow-sm"></div>
            <span className="text-sm font-medium text-gray-600">Completed <span className="text-[#111] ml-1">{completed}</span></span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#e5e5e5] border border-gray-200 shadow-sm"></div>
            <span className="text-sm font-medium text-gray-600">Pending <span className="text-[#111] ml-1">{pending}</span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStatusChart;