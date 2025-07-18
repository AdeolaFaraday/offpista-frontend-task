import React from 'react';

const statusColors: Record<string, string> = {
    pending: 'bg-amber-400 text-white',
    'in-progress': 'bg-blue-600 text-white',
    done: 'bg-green-500 text-white',
};

const priorityColors: Record<string, string> = {
    low: 'text-green-500',
    medium: 'text-amber-500',
    high: 'text-red-500',
};

export default function TaskCard({ task, onEdit, onDelete }: { task: any, onEdit: (task: any) => void, onDelete: (task: any) => void }) {
    return (
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-y-2">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>
                <span className={`px-3 py-1 rounded-2xl text-xs font-semibold ${statusColors[task.status] || 'bg-gray-200 text-gray-700'}`}>{task.status}</span>
            </div>
            <div className="flex items-center gap-x-4 text-sm text-gray-500">
                <span className={priorityColors[task?.extras?.priority] || ''}>Priority: {task?.extras?.priority?.toUpperCase()}</span>
                <span>Due: {task?.extras?.dueDate ? new Date(task?.extras?.dueDate).toLocaleDateString() : 'N/A'}</span>
            </div>
            <div className="flex gap-x-4 mt-2">
                <button onClick={() => onEdit(task)} className="px-4 py-1 rounded-2xl bg-blue-100 text-blue-600 font-medium hover:bg-blue-200 transition">Edit</button>
                <button onClick={() => onDelete(task)} className="px-4 py-1 rounded-2xl bg-red-100 text-red-600 font-medium hover:bg-red-200 transition">Delete</button>
            </div>
        </div>
    );
} 