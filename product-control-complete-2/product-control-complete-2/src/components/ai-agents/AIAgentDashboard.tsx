import React from 'react';

export const AIAgentDashboard: React.FC = () => {
  const agents = [
    { name: 'Copywriting', status: 'active', tasks: 5 },
    { name: 'Visual Assets', status: 'active', tasks: 3 },
    { name: 'SEO', status: 'active', tasks: 2 },
    { name: 'QA', status: 'idle', tasks: 0 }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {agents.map((agent, i) => (
        <div key={i} className="p-4 border rounded">
          <h3 className="font-bold">{agent.name} Agent</h3>
          <div className="flex items-center gap-2 mt-2">
            <span className={`w-2 h-2 rounded-full ${agent.status === 'active' ? 'bg-green-500' : 'bg-gray-300'}`} />
            <span className="text-sm capitalize">{agent.status}</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{agent.tasks} active tasks</p>
        </div>
      ))}
    </div>
  );
};
