import React from 'react';

export const RevenueGoalsTracker: React.FC = () => {
  const goals = [
    { period: 'Monthly', target: 10000, current: 7500 },
    { period: 'Quarterly', target: 30000, current: 22000 }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Revenue Goals</h2>
      {goals.map((goal, i) => (
        <div key={i} className="p-4 border rounded">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">{goal.period}</span>
            <span>${goal.current} / ${goal.target}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" 
                 style={{width: `${(goal.current/goal.target)*100}%`}} />
          </div>
        </div>
      ))}
    </div>
  );
};
