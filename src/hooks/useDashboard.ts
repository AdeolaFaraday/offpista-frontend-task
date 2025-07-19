import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { useState } from 'react';
import useCreateTask from './useCreateTask';
import { useGetTask } from './useGetTask';

interface Task {
  _id: string;
  title: string;
  status: string;
  priority: string;
  extras?: {
    dueDate?: string;
    priority?: string;
    tags?: string[];
  };
}

export default function useDashboard() {
  const [filter, setFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);

  const { createTask, isPending, updateTask, isUpdating } = useCreateTask();
  const { tasks, isLoading, fetchNextPage, hasNextPage, metadata, isFetchingNextPage } = useGetTask(filter);

  const { data, refetch: refetchInsights } = useQuery({
    queryKey: ['insights'],
    queryFn: () => api.get('/tasks/insights'),
  });
  const insights = data?.data || {};

  const handleAdd = () => {
    setEditTask(null);
    setModalOpen(true);
  };

  const handleEdit = (task: Task) => {
    setEditTask(task);
    setModalOpen(true);
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleModalSubmit = (form: any) => {
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
        extras: {
          priority: form.priority,
          dueDate: form.dueDate,
          tags: form.tags,
        }
      })
    }
    setModalOpen(false);
    refetchInsights();
  };

  return {
    tasks,
    isLoading,
    fetchNextPage,
    hasNextPage,
    metadata,
    isFetchingNextPage,
    insights,
    handleAdd,
    handleEdit,
    handleLoadMore,
    handleModalSubmit,
    modalOpen,
    setModalOpen,
    editTask,
    setEditTask,
    isPending,
    isUpdating,
    filter,
    setFilter,
  };
} 