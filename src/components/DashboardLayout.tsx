import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-[13rem] h-[calc(100vh-2rem)] bg-white shadow-lg rounded-2xl m-4 p-5 gap-y-8 hidden md:flex flex-col justify-between">
        <h3 className="text-2xl font-bold text-blue-600">Task Manager</h3>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-xl hover:bg-red-600 transition"
        >
          Logout
        </button>
      </aside>

      <main className="p-4 md:p-8 min-h-screen md:min-h-0 md:w-[calc(100vw-13rem)] w-full">
        <div className="overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  );
} 