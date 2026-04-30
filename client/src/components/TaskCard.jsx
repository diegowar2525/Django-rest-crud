import { useNavigate } from 'react-router-dom';

export function TaskCard({ task }) {
  const navigate = useNavigate();
  
  return (
    <div 
      className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm cursor-pointer hover:shadow-md hover:border-zinc-300 transition-all duration-200 group"
      onClick={() => navigate(`/tasks/${task.id}`)}
    >
      <h2 className="text-lg font-semibold text-zinc-900 mb-2 group-hover:text-zinc-700 transition-colors">
        {task.title}
      </h2>
      <p className="text-zinc-500 text-sm leading-relaxed line-clamp-3">
        {task.description}
      </p>
      {task.done && (
        <span className="inline-block mt-4 px-3 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">
          Completed
        </span>
      )}
      {!task.done && (
        <span className="inline-block mt-4 px-3 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">
          Pending
        </span>
      )}
    </div>
  );
}