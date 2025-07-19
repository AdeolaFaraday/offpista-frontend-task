import DashboardLayout from '../components/DashboardLayout';
import TaskTable from '../components/TaskTable';
import FilterTabs from '../components/FilterTabs';
import InsightsPanel from '../components/InsightsPanel';
import TaskFormModal from '../components/TaskFormModal';
import DashboardHeader from '../components/DashboardHeader';
import useDashboard from '../hooks/useDashboard';


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
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <DashboardHeader />
          <div className="flex items-center justify-between mb-4">
            <FilterTabs value={filter} onChange={setFilter} />
            <button onClick={handleAdd} className="bg-green-500 text-white px-6 py-2 rounded-2xl shadow-md hover:bg-green-600 transition">Add Task</button>
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
        <InsightsPanel insights={insights} />
      </div>
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