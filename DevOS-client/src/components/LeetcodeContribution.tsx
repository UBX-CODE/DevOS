import { ActivityCalendar } from 'react-activity-calendar';
import { subYears, eachDayOfInterval, format } from 'date-fns';

interface Props {
  submissionCalendar: string; // JSON string of timestamp keys and count values
}

const LeetcodeContribution = ({ submissionCalendar }: Props) => {
  let dataMap: Record<string, number> = {};
  try {
    const parsed = JSON.parse(submissionCalendar);
    for (const [timestamp, count] of Object.entries(parsed)) {
      // LeetCode timestamps are in seconds
      const date = new Date(parseInt(timestamp) * 1000);
      const dateString = format(date, 'yyyy-MM-dd');
      dataMap[dateString] = (dataMap[dateString] || 0) + (count as number);
    }
  } catch (e) {
    console.error("Failed to parse submission calendar", e);
  }

  const today = new Date();
  const oneYearAgo = subYears(today, 1);
  const days = eachDayOfInterval({ start: oneYearAgo, end: today });

  const getLevel = (count: number) => {
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 10) return 3;
    return 4;
  };

  const activityData = days.map(day => {
    const dateString = format(day, 'yyyy-MM-dd');
    const count = dataMap[dateString] || 0;
    return {
      date: dateString,
      count,
      level: getLevel(count)
    };
  });

  return (
    <div className="mt-8 pt-8 border-t border-[#f0eadd]">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
        Contributions
      </h2>
      <div className="w-full overflow-x-auto pb-2 flex justify-center lg:justify-start">
        <ActivityCalendar 
          data={activityData}
          colorScheme="light"
          theme={{
            light: ['#FAF6F0', '#d5cec4', '#a39d95', '#635f59', '#1f1e1e']
          }}
          labels={{
            legend: {
              less: 'Less',
              more: 'More'
            },
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            totalCount: '{{count}} contributions in the last year'
          }}
          fontSize={12}
          blockSize={12}
          blockMargin={4}
        />
      </div>
    </div>
  );
};

export default LeetcodeContribution;
