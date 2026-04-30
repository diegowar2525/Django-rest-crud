import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createTask, deleteTask, updateTask, getTask } from '../api/tasks.api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async data => {
    if (params.id) {
      await updateTask(params.id, data);
      toast.success('Task updated successfully');
    } else {
      await createTask(data);
      toast.success('Task created successfully');
    }
    navigate('/tasks');
  });

  useEffect(() => {
    async function LoadTask() {
      if (params.id) {
        const { data } = await getTask(params.id);
        setValue('title', data.title);
        setValue('description', data.description);
        setValue('done', data.done);
      }
    }
    LoadTask();
  }, [params.id, setValue]);

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl border border-zinc-200 shadow-sm mt-4">
      <h2 className="text-2xl font-bold text-zinc-900 mb-6">
        {params.id ? 'Edit Task' : 'Create Task'}
      </h2>

      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">Title</label>
          <input
            type="text"
            placeholder="Enter task title"
            className={`w-full px-4 py-2.5 border rounded-lg outline-none transition-all text-zinc-800 focus:ring-2 
              ${errors.title
                ? 'border-red-400 focus:ring-red-400 focus:border-red-400 bg-red-50'
                : 'border-zinc-300 focus:ring-zinc-900 focus:border-zinc-900'}`}
            {...register('title', { required: true })}
          />
          {errors.title && <span className="block text-red-500 text-xs mt-1.5 font-medium">Title is required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">Description</label>
          <textarea
            rows="4"
            placeholder="Task details..."
            className={`w-full px-4 py-2.5 border rounded-lg outline-none transition-all resize-none text-zinc-800 focus:ring-2 
              ${errors.description
                ? 'border-red-400 focus:ring-red-400 focus:border-red-400 bg-red-50'
                : 'border-zinc-300 focus:ring-zinc-900 focus:border-zinc-900'}`}
            {...register('description', { required: true })}
          ></textarea>
          {errors.description && <span className="block text-red-500 text-xs mt-1.5 font-medium">Description is required</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">Done</label>
          <input
            type="checkbox"
            className="h-5 w-5 text-zinc-900 focus:ring-zinc-900 border-zinc-300 rounded transition-all"
            {...register('done')}
          />
        </div>

        <div className="flex items-center justify-between pt-4 mt-6 border-t border-zinc-100">
          {/* Botón Delete (solo visible si estamos editando) */}
          {params.id ? (
            <button
              type="button"
              onClick={async () => {
                const accepted = window.confirm('Are you sure you want to delete this task?');
                if (accepted) {
                  await deleteTask(params.id);
                  toast.success('Task deleted successfully');
                  navigate('/tasks');
                }
              }}
              className="px-4 py-2.5 rounded-lg font-medium text-sm border border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:text-red-600 hover:border-red-200 transition-all focus:outline-none"
            >
              Delete
            </button>
          ) : (
            <div></div> /* Espaciador para mantener los botones de guardado a la derecha */
          )}

          {/* Botones de acción principales */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate('/tasks')}
              className="px-5 py-2.5 rounded-lg font-medium text-sm bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition-all focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg font-medium text-sm bg-zinc-900 text-white hover:bg-zinc-800 transition-all shadow-sm active:scale-95 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}