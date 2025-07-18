import React, { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import TaskCard from '../components/TaskCard';
import FilterTabs from '../components/FilterTabs';
import InsightsPanel from '../components/InsightsPanel';
import TaskFormModal from '../components/TaskFormModal';
import useCreateTask from '../hooks/useCreateTask';
import { useGetTask } from '../hooks/useGetTask';

type Task = {
  _id: number;
  title: string;
  status: string;
  priority: string;
  dueDate: string;
  tags: string[];
};

const mockTasks = [
  { id: 1, title: 'Design UI', status: 'Pending', priority: 'High', dueDate: '2024-07-20', tags: ['ui', 'design'] },
  { id: 2, title: 'Setup Backend', status: 'In-Progress', priority: 'Medium', dueDate: '2024-07-22', tags: ['api'] },
  { id: 3, title: 'Write Docs', status: 'Done', priority: 'Low', dueDate: '2024-07-18', tags: ['docs'] },
];

function getInsights(tasks: Task[] | undefined) {
  return {
    total: tasks?.length,
    pending: tasks?.filter((t: Task) => t.status === 'pending').length,
    inProgress: tasks?.filter((t: Task) => t.status === 'in-progress').length,
    done: tasks?.filter((t: Task) => t.status === 'done').length,
  };
}

export default function Dashboard() {
  // const [tasks, setTasks] = useState(mockTasks);
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);

  const { createTask, isPending, error, updateTask, isUpdating, updateError } = useCreateTask();
  const { tasks, isLoading, refetch } = useGetTask(filter);

  // useEffect(() => {
  //   if (data && data.data) {
  //     setTasks(data.data);
  //   }
  // }, [data]);

  const filteredTasks = filter === 'all' ? tasks : tasks?.filter((t: Task) => t.status === filter);
  const insights = getInsights(tasks);

  const handleAdd = () => {
    setEditTask(null);
    setModalOpen(true);
  };
  const handleEdit = (task: Task) => {
    setEditTask(task);
    setModalOpen(true);
  };
  const handleDelete = (task: Task) => {
    // setTasks(tasks.filter(t => t.id !== task.id));
  };
  const handleModalSubmit = (form: Task) => {
    if (editTask) {
      updateTask({
        ...form,
        id: editTask._id,
        extras: {
          priority: form.priority,
          dueDate: form.dueDate,
          tags: form.tags,
        }
      });
    } else {
      createTask({
        ...form,
        extra: {
          priority: form.priority,
          dueDate: form.dueDate,
          tags: form.tags,
        }
      })
    }
    setModalOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <FilterTabs value={filter} onChange={setFilter} />
            <button onClick={handleAdd} className="bg-green-500 text-white px-6 py-2 rounded-2xl shadow-md hover:bg-green-600 transition">Add Task</button>
          </div>
          <div className="grid gap-y-4">
            {tasks?.length === 0 ? (
              <div className="text-gray-400 text-center py-12">No tasks found.</div>
            ) : (
              tasks?.map((task: Task) => (
                <TaskCard key={task._id} task={task} onEdit={handleEdit} onDelete={handleDelete} />
              ))
            )}
          </div>
        </div>
        <InsightsPanel />
      </div>
      {modalOpen && (
        <TaskFormModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditTask(null);
          }}
          onSubmit={handleModalSubmit}
          initialData={editTask}
        />
      )}
    </DashboardLayout>
  );
} 