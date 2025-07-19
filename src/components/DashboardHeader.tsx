import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function DashboardHeader() {
  const { user } = useAuth();

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

  return (
    <div className="mb-8">
      <p className="text-sm text-gray-500 mb-2">{getCurrentDate()}</p>
      <h2 className="text-3xl text-gray-900 font-bold">
        {getGreeting()} {user?.name || 'User'},
      </h2>
    </div>
  );
} 