import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TaskPage } from './pages/TaskPage';
import { TaskFormPage } from './pages/TaskFormPage';
import { Navigation } from './components/Navigation';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      {/* Fondo global y color de texto base */}
      <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-zinc-300">
        <div className="container mx-auto px-4 max-w-5xl">
          <Navigation />
          <main className="py-8">
            <Routes>
              <Route path="/" element={<Navigate to="/tasks" />} />
              <Route path="/tasks" element={<TaskPage />} />
              <Route path="/tasks-create" element={<TaskFormPage />} />
              <Route path="/tasks/:id" element={<TaskFormPage />} />
            </Routes>
          </main>
          <Toaster 
            toastOptions={{
              style: {
                background: '#18181b', // zinc-900
                color: '#fff',
              },
            }}
          />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;