import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { toast } from 'react-hot-toast';

export default function useDeleteTask() {
  const queryClient = useQueryClient();

  const { mutate: deleteTask, isPending: loading, error } = useMutation({
    mutationFn: async (taskId: string) => {
      const res = await api.delete(`/tasks/${taskId}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Task deleted successfully!');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || error?.message || 'Failed to delete task. Please try again.');
    },
  });

  return {
    deleteTask,
    loading,
    error: error ? (error as any)?.response?.data?.message || (error as Error).message : '',
  };
} 