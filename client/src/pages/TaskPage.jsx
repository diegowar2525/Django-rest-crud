import { TaskList } from '../components/TaskList';

export function TaskPage() {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-zinc-800">Your Tasks</h2>
        <p className="text-zinc-500 text-sm mt-1">Manage and organize your day.</p>
      </div>
      <TaskList />
    </div>
  );
}