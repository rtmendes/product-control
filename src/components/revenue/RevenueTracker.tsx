import { useState, useEffect } from 'react';
import { Plus, TrendingUp, DollarSign, Target, Calendar, Trash2 } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface RevenueGoal {
  id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  deadline: string;
  status: string;
}

interface RevenueData {
  date: string;
  amount: number;
}

export function RevenueTracker() {
  const [goals, setGoals] = useState<RevenueGoal[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: '',
    target_amount: 0,
    deadline: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // TODO: Fetch from Supabase
    setGoals([]);
    setRevenueData([
      { date: '2024-01', amount: 1200 },
      { date: '2024-02', amount: 1800 },
      { date: '2024-03', amount: 2400 },
      { date: '2024-04', amount: 3200 },
      { date: '2024-05', amount: 2800 },
      { date: '2024-06', amount: 3600 }
    ]);
  };

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.amount, 0);
  const avgRevenue = totalRevenue / revenueData.length;
  const growthRate = revenueData.length > 1
    ? ((revenueData[revenueData.length - 1].amount - revenueData[0].amount) / revenueData[0].amount) * 100
    : 0;

  const handleCreateGoal = async () => {
    console.log('Creating goal:', newGoal);
    // TODO: Save to Supabase
    setIsCreating(false);
    setNewGoal({ name: '', target_amount: 0, deadline: '' });
    loadData();
  };

  const handleDeleteGoal = async (id: string) => {
    if (confirm('Are you sure you want to delete this goal?')) {
      console.log('Deleting goal:', id);
      // TODO: Delete from Supabase
      loadData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-sm font-medium text-slate-600">Total Revenue</div>
          </div>
          <div className="text-3xl font-bold text-slate-900">
            ${totalRevenue.toLocaleString()}
          </div>
          <div className="text-sm text-slate-500 mt-1">All time</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-sm font-medium text-slate-600">Average Monthly</div>
          </div>
          <div className="text-3xl font-bold text-slate-900">
            ${Math.round(avgRevenue).toLocaleString()}
          </div>
          <div className="text-sm text-slate-500 mt-1">Per month</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-sm font-medium text-slate-600">Growth Rate</div>
          </div>
          <div className="text-3xl font-bold text-slate-900">
            {growthRate > 0 ? '+' : ''}{growthRate.toFixed(1)}%
          </div>
          <div className="text-sm text-slate-500 mt-1">Since start</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Target className="h-5 w-5 text-orange-600" />
            </div>
            <div className="text-sm font-medium text-slate-600">Active Goals</div>
          </div>
          <div className="text-3xl font-bold text-slate-900">{goals.length}</div>
          <div className="text-sm text-slate-500 mt-1">In progress</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Revenue Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="date"
              stroke="#64748b"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#64748b"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px'
              }}
              formatter={(value: number) => [`$${value}`, 'Revenue']}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Monthly Breakdown</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="date"
              stroke="#64748b"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#64748b"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px'
              }}
              formatter={(value: number) => [`$${value}`, 'Revenue']}
            />
            <Bar dataKey="amount" fill="#10b981" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Revenue Goals</h3>
          {!isCreating && (
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              New Goal
            </button>
          )}
        </div>

        {isCreating && (
          <div className="mb-6 p-4 bg-slate-50 rounded-lg space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Goal Name
                </label>
                <input
                  type="text"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                  placeholder="Q4 Target"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Target Amount
                </label>
                <input
                  type="number"
                  value={newGoal.target_amount}
                  onChange={(e) => setNewGoal({ ...newGoal, target_amount: parseFloat(e.target.value) })}
                  placeholder="10000"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Deadline
                </label>
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleCreateGoal}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Goal
              </button>
              <button
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {goals.length === 0 ? (
            <div className="text-center py-12">
              <Target className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600">No revenue goals set yet</p>
              <p className="text-sm text-slate-500 mt-1">Create your first goal to track progress</p>
            </div>
          ) : (
            goals.map(goal => {
              const progress = (goal.current_amount / goal.target_amount) * 100;
              const daysRemaining = Math.ceil(
                (new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
              );

              return (
                <div key={goal.id} className="p-4 border border-slate-200 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-slate-900">{goal.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-slate-600 mt-1">
                        <span>${goal.current_amount.toLocaleString()} / ${goal.target_amount.toLocaleString()}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {daysRemaining} days left
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="p-2 text-slate-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="relative h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-green-500 transition-all"
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                  <div className="text-sm text-slate-600 mt-2 text-right">
                    {progress.toFixed(1)}% complete
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
