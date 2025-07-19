import DashboardLayout from '../components/DashboardLayout';
import TaskTable from '../components/TaskTable';
import FilterTabs from '../components/FilterTabs';
import InsightsPanel from '../components/InsightsPanel';
import TaskFormModal from '../components/TaskFormModal';
import DashboardHeader from '../components/DashboardHeader';
import useDashboard from '../hooks/useDashboard';
import { Plus } from 'lucide-react';


export default function Dashboard() {
  const {
    tasks,
    isLoading,
    hasNextPage,
    metadata,
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
  } = useDashboard();

  return (
    <DashboardLayout>
      <div className="">
        <DashboardHeader />

        <InsightsPanel insights={insights} />

        <div className="mb-6">
          <FilterTabs value={filter} onChange={setFilter} />
        </div>

        <TaskTable
          tasks={tasks || []}
          total={metadata?.pages?.[0]?.total || 0}
          onEdit={handleEdit}
          onLoadMore={handleLoadMore}
          hasMore={hasNextPage}
          loading={isLoading}
        />
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={handleAdd} 
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-200 flex items-center justify-center z-50 hover:scale-110"
        aria-label="Add new task"
      >
        <Plus size={24} />
      </button>

      {modalOpen && (
        <TaskFormModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditTask(null);
          }}
          loading={isPending || isUpdating}
          onSubmit={handleModalSubmit}
          initialData={editTask}
        />
      )}
    </DashboardLayout>
  );
} 