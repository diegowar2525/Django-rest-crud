import { Link } from 'react-router-dom';

export function Navigation() {
  return (
    <header className="flex justify-between items-center py-6 border-b border-zinc-200">
      <Link to="/tasks" className="group">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 group-hover:text-zinc-600 transition-colors">
          Task App
        </h1>
      </Link>
      <Link 
        to="/tasks-create" 
        className="bg-zinc-900 text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-zinc-800 transition-all shadow-sm active:scale-95"
      >
        Create Task
      </Link>
    </header>
  );
}