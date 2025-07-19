import { useEffect, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from './common/input';
import Select from './common/select';
import Button from './common/button';


const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  status: z.string().min(1, 'Status is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  tags: z.string().min(1, 'Tags are required'),
  priority: z.string().min(1, 'Priority is required'),
});

type TaskForm = z.infer<typeof taskSchema>;

const statusOptions = [{
  label: 'Pending',
  value: 'pending'
}, {
  label: 'In-Progress',
  value: 'in-progress'
}, {
  label: 'Done',
  value: 'done'
}];
const priorityOptions = [{
  label: 'Low',
  value: 'low'
}, {
  label: 'Medium',
  value: 'medium'
}, {
  label: 'High',
  value: 'high'
}];

interface TaskFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (form: any) => void;
  initialData?: any;
  loading?: boolean;
}

export default function TaskFormModal({ open, onClose, onSubmit, initialData, loading }: TaskFormModalProps) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<TaskForm>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      status: 'pending',
      priority: 'low',
      dueDate: '',
      title: '',
      description: '',
      tags: '',
    },
  });

  useEffect(() => {
    if (initialData) {
      setValue('title', initialData?.title || '');
      setValue('description', initialData?.description || '');
      setValue('status', initialData?.status || 'pending');
      setValue('priority', initialData?.extras?.priority || 'low');
      setValue('dueDate', initialData?.extras?.dueDate || new Date().toISOString().split('T')[0]);
      setValue('tags', initialData?.extras?.tags || '');
    }
  }, [initialData]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
          leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gradient-to-br from-blue-900/60 via-blue-700/40 to-amber-400/30 backdrop-blur-sm transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300" enterFrom="opacity-0 scale-95 translate-y-8" enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-200" leaveFrom="opacity-100 scale-100 translate-y-0" leaveTo="opacity-0 scale-95 translate-y-8"
          >
            <Dialog.Panel className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative">
              <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
              <h3 className="text-xl font-bold text-blue-600 mb-4">{initialData ? 'Edit Task' : 'Add Task'}</h3>
              <form className="flex flex-col gap-y-4" onSubmit={handleSubmit(onSubmit)}>
                <Input name="title" type="text" placeholder="Title" register={register} error={errors.title?.message} />
                <Input name="description" type="text" placeholder="Description" register={register} error={errors.description?.message} />
                <div className="flex gap-x-4">
                  <Select name="status" options={statusOptions} register={register} error={errors.status?.message} />
                  <Select name="priority" options={priorityOptions} register={register} error={errors.priority?.message} />
                </div>
                <Input name="dueDate" type="date" placeholder="Due Date" register={register} error={errors.dueDate?.message} />
                <Input name="tags" type="text" placeholder="Tags (comma separated)" register={register} error={errors.tags?.message} />
                <Button type="submit" disabled={loading} loading={loading}>{initialData ? 'Update Task' : 'Add Task'}</Button>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
} 