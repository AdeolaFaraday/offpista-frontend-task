import React, { useState } from 'react';
import { Edit, Trash2, Loader2 } from 'lucide-react';
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

interface TaskCardProps {
  task: any;
  onEdit: (task: any) => void;
}

export default function TaskCard({ task, onEdit }: TaskCardProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { deleteTask, loading } = useDeleteTask();

  const handleDelete = () => {
    deleteTask(task._id);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-y-2 group hover:shadow-lg transition-all duration-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>
          <span className={`px-3 py-1 rounded-2xl text-xs font-semibold ${statusColors[task.status as keyof typeof statusColors] || 'bg-gray-200 text-gray-700'}`}>
            {task.status}
          </span>
        </div>
        <div className="flex items-center gap-x-4 text-sm text-gray-500">
          <span className={priorityColors[task?.extras?.priority as keyof typeof priorityColors] || ''}>
            Priority: {task?.extras?.priority?.toUpperCase()}
          </span>
          <span>Due: {task?.extras?.dueDate ? new Date(task?.extras?.dueDate).toLocaleDateString() : 'N/A'}</span>
        </div>
        <div className="flex justify-end gap-x-2 mt-4 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(task)}
            className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-200"
            title="Edit task"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            disabled={loading}
            className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Delete task"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Task"
        message={`Are you sure you want to delete "${task.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
} 