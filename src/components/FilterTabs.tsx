import React from 'react';

interface FilterTabsProps {
  value: string;
  onChange: (value: string) => void;
}

const filters = [
  { value: 'all', label: 'All Tasks', icon: '📋' },
  { value: 'pending', label: 'Pending', icon: '⏳' },
  { value: 'in-progress', label: 'In Progress', icon: '🔄' },
  { value: 'done', label: 'Completed', icon: '✅' },
];

export default function FilterTabs({ value, onChange }: FilterTabsProps) {
  return (
    <div className="w-full">
      {/* Desktop View - Horizontal Tabs */}
      <div className="hidden md:flex bg-white rounded-xl shadow-sm border border-gray-100 p-1">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onChange(filter.value)}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${value === filter.value
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm">{filter.icon}</span>
              <span>{filter.label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Mobile View - Scrollable Horizontal Tabs */}
      <div className="md:hidden">
        <div className="flex overflow-auto w-[100vw] scrollbar-hide bg-white rounded-xl shadow-sm border border-gray-100 p-2 gap-2 w-full">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => onChange(filter.value)}
              className={`flex-shrink-0 px-4 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap min-w-fit ${value === filter.value
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{filter.icon}</span>
                <span className="text-sm">{filter.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 