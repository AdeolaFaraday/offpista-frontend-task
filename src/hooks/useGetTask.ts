import { useInfiniteQuery } from '@tanstack/react-query';
import api from '../services/api';

const PAGE_SIZE = 7;

export const useGetTask = (status?: string) => {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['tasks', status],
    queryFn: async ({ pageParam = 1 }) => {
      const params: Record<string, any> = { page: pageParam, limit: PAGE_SIZE };
      if (status && status !== 'all') params.status = status;
      const res = await api.get('/tasks', { params });
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, allPages) => {
      if (lastPage.totalPages > lastPage.page) {
        return allPages.length + 1;
      }
      return undefined;
    },
  });

  // Flatten all tasks from pages
  const tasks = data?.pages.flatMap((page: any) => page.tasks) || [];

  return {
    tasks,
    isLoading,
    error,
    metadata: data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  };
};