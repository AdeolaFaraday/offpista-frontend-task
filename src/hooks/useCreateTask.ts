import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import { toast } from "react-hot-toast";

const useCreateTask = () => {
    const queryClient = useQueryClient();
    const { mutate: createTask, isPending, error } = useMutation({
        mutationFn: (task: any) => api.post('/tasks', task),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast.success('Task created successfully');
        },
        onError: (error: any) => {
            toast.error(error.response.data.message);
        },
    });

    const { mutate: updateTask, isPending: isUpdating, error: updateError } = useMutation({
        mutationFn: (task: any) => api.put(`/tasks/${task.id}`, task),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            toast.success('Task updated successfully');
        },
        onError: (error: any) => {
            toast.error(error.response.data.message);
        },
    });

    return { createTask, isPending, error, updateTask, isUpdating, updateError };
};

export default useCreateTask;