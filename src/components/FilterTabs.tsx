import React from 'react';

const tabs = [
  { label: 'All', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'In-Progress', value: 'in-progress' },
  { label: 'Done', value: 'done' },
];

export default function FilterTabs({ value, onChange }: { value: string, onChange: (value: string) => void }) {
  return (
    <div className="flex gap-x-4 mb-4">
      {tabs.map(tab => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`px-4 py-2 rounded-2xl font-medium transition shadow-sm
            ${value === tab.value ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-blue-100'}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
} 