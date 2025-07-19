import React from 'react';

interface Insight {
  totalTasks: number;
  pending: number;
  inProgress: number;
  done: number;
}

interface InsightsPanelProps {
  insights: Insight;
}

export default function InsightsPanel({ insights }: InsightsPanelProps) {
  const cards = [
    {
      title: 'Total Tasks',
      value: insights.totalTasks,
      color: 'bg-blue-500',
      icon: '📋',
      description: 'All tasks'
    },
    {
      title: 'Pending',
      value: insights.pending,
      color: 'bg-yellow-500',
      icon: '⏳',
      description: 'Awaiting action'
    },
    {
      title: 'In Progress',
      value: insights.inProgress,
      color: 'bg-orange-500',
      icon: '🔄',
      description: 'Currently working'
    },
    {
      title: 'Completed',
      value: insights.done,
      color: 'bg-green-500',
      icon: '✅',
      description: 'Finished tasks'
    }
  ];

  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center text-white text-lg`}>
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
                    <p className="text-xs text-gray-500">{card.description}</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">{card.value}</div>
              </div>
              <div className="text-right">
                <div className={`w-2 h-2 rounded-full ${card.color.replace('bg-', 'bg-')} opacity-60`}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 