import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export default function InsightsPanel() {
  const { data } = useQuery({
    queryKey: ['insights'],
    queryFn: () => api.get('/tasks/insights'),
  });
  const insights = data?.data || {};
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-y-2 w-full md:w-80">
      <h4 className="text-lg font-bold text-gray-800 mb-2">Task Insights</h4>
      <div className="flex flex-col gap-y-1">
        <div className="flex justify-between"><span>Total</span><span className="font-semibold">{insights?.totalTasks || 0}</span></div>
        <div className="flex justify-between"><span>Pending</span><span className="font-semibold text-amber-500">{insights?.pending || 0}</span></div>
        <div className="flex justify-between"><span>In-Progress</span><span className="font-semibold text-blue-600">{insights?.inProgress || 0}</span></div>
        <div className="flex justify-between"><span>Done</span><span className="font-semibold text-green-500">{insights?.done || 0}</span></div>
      </div>
    </div>
  );
} 