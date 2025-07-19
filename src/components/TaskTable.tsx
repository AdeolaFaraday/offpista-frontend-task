import React, { useState } from 'react';
import { Edit, Trash2, Loader2, Loader } from 'lucide-react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ConfirmModal from './ConfirmModal';
import useDeleteTask from '../hooks/useDeleteTask';

const statusColors = {
  pending: 'bg-amber-400 text-white',
  'in-progress': 'bg-blue-600 text-white',
  done: 'bg-green-500 text-white',
};

const priorityColors = {
  low: 'text-green-500',
  medium: 'text-amber-500',
  high: 'text-red-500',
};

interface Task {
  _id: string;
  title: string;
  status: string;
  priority: string;
  extras?: {
    dueDate?: string;
    priority?: string;
  };
}

interface TaskTableProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onLoadMore: () => void;
  hasMore: boolean;
  loading?: boolean;
  total: number;
}

export default function TaskTable({ tasks, onEdit, onLoadMore, hasMore, loading: isLoadingTasks, total }: TaskTableProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { deleteTask, loading } = useDeleteTask();

  const handleDelete = (task: Task) => {
    setSelectedTask(task);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (selectedTask) {
      deleteTask(selectedTask._id);
    }
  };

  if (isLoadingTasks) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-gray-400 text-center py-12">No tasks found.</div>
    );
  }

  return (
    <>
      {/* <div id="scrollableDiv" className="max-h-96 overflow-y-auto"> */}
      <InfiniteScroll
        dataLength={tasks?.length || 0}
        next={onLoadMore}
        hasMore={hasMore}
        loader={
          <div className="flex justify-center py-4 gap-x-2">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <p>Scroll to load more...</p>
          </div>
        }
        endMessage={
          <div className="text-center py-4 text-gray-500">
            <p>No more tasks to load. {total} tasks found.</p>
          </div>
        }
      // scrollableTarget="scrollableDiv"
      >
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tasks?.map((task) => (
                  <tr key={task._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{task.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[task.status as keyof typeof statusColors] || 'bg-gray-200 text-gray-700'}`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${priorityColors[task?.extras?.priority as keyof typeof priorityColors] || ''}`}>
                        {task?.extras?.priority?.toUpperCase() || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {task?.extras?.dueDate ? new Date(task.extras.dueDate).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-x-2">
                        <button
                          onClick={() => onEdit(task)}
                          className="p-1 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                          title="Edit task"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(task)}
                          disabled={loading}
                          className="p-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                          title="Delete task"
                        >
                          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </InfiniteScroll>
      {/* </div> */}

      <ConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDelete}
        title="Delete Task"
        message={`Are you sure you want to delete "${selectedTask?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
} 