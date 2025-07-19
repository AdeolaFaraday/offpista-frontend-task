import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function DashboardHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getCurrentDate = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    };
    return now.toLocaleDateString('en-US', options);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning!';
    if (hour < 17) return 'Good Afternoon!';
    return 'Good Evening!';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="mb-8 relative">
      <p className="text-sm text-gray-500 mb-2">{getCurrentDate()}</p>
      <h2 className="text-3xl text-gray-900 font-bold">
        {getGreeting()} {user?.name || 'User'},
      </h2>
      
      {/* Mobile-only logout button - absolute positioned */}
      <button
        onClick={handleLogout}
        className="md:hidden absolute top-0 right-0 p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
        aria-label="Logout"
      >
        <LogOut size={20} />
      </button>
    </div>
  );
} 