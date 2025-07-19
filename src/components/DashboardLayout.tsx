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
      <aside className="w-64 h-[calc(100vh-2rem)] bg-white shadow-lg rounded-2xl m-4 p-6 flex flex-col gap-y-8 hidden md:flex">
        <div className="text-2xl font-bold text-blue-600 mb-8">Task Manager</div>
        <nav className="flex flex-col gap-y-4">
          <button className="text-left text-gray-700 hover:text-blue-600 font-medium">Tasks</button>
        </nav>
        <div className="mt-auto">
          <button onClick={handleLogout} className="w-full bg-red-500 text-white py-2 rounded-2xl shadow hover:bg-red-600 transition">Logout</button>
        </div>
      </aside>
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
} 