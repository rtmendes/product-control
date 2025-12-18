import { useState } from 'react';
import { Plus, CheckCircle2, Circle, Clock, Calendar, Tag, X, ChevronDown, ChevronRight } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'not-started' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  assignee?: string;
  tags?: string[];
}

interface TaskManagerProps {
  stageName: string;
  tasks: Task[];
  onTasksUpdate: (tasks: Task[]) => void;
}

const STATUS_CONFIG = {
  'not-started': { icon: Circle, color: 'text-slate-400', bg: 'bg-slate-100', label: 'Not Started' },
  'in-progress': { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'In Progress' },
  'completed': { icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100', label: 'Completed' },
};

const PRIORITY_CONFIG = {
  low: { color: 'text-slate-600', bg: 'bg-slate-100', label: 'Low' },
  medium: { color: 'text-blue-600', bg: 'bg-blue-100', label: 'Medium' },
  high: { color: 'text-red-600', bg: 'bg-red-100', label: 'High' },
};

export function TaskManager({ stageName, tasks, onTasksUpdate }: TaskManagerProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    status: 'not-started',
    priority: 'medium',
  });

  const handleAddTask = () => {
    if (!newTask.title) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      status: newTask.status as any || 'not-started',
      priority: newTask.priority as any || 'medium',
      dueDate: newTask.dueDate,
      assignee: newTask.assignee,
      tags: newTask.tags || [],
    };

    onTasksUpdate([...tasks, task]);
    setNewTask({
      title: '',
      description: '',
      status: 'not-started',
      priority: 'medium',
    });
    setShowAddTask(false);
  };

  const updateTaskStatus = (taskId: string, status: Task['status']) => {
    const updated = tasks.map(t => t.id === taskId ? { ...t, status } : t);
    onTasksUpdate(updated);
  };

  const deleteTask = (taskId: string) => {
    onTasksUpdate(tasks.filter(t => t.id !== taskId));
  };

  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  return (
    <div className="bg-white rounded-lg border border-slate-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {isExpanded ? <ChevronDown className="h-5 w-5 text-slate-400" /> : <ChevronRight className="h-5 w-5 text-slate-400" />}
          <div className="text-left">
            <h3 className="font-semibold text-slate-900">Tasks for {stageName}</h3>
            <p className="text-sm text-slate-600">
              {completedCount} of {tasks.length} completed • {Math.round(progress)}%
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-32 bg-slate-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowAddTask(true);
            }}
            className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Plus className="h-5 w-5 text-blue-600" />
          </button>
        </div>
      </button>

      {isExpanded && (
        <div className="p-4 pt-0 space-y-3">
          {tasks.map((task) => {
            const statusConfig = STATUS_CONFIG[task.status];
            const priorityConfig = PRIORITY_CONFIG[task.priority];
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={task.id}
                className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group"
              >
                <button
                  onClick={() => {
                    const nextStatus =
                      task.status === 'not-started' ? 'in-progress' :
                      task.status === 'in-progress' ? 'completed' :
                      'not-started';
                    updateTaskStatus(task.id, nextStatus);
                  }}
                  className={`p-1 rounded ${statusConfig.bg}`}
                >
                  <StatusIcon className={`h-5 w-5 ${statusConfig.color}`} />
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className={`font-medium ${task.status === 'completed' ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                      {task.title}
                    </h4>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${priorityConfig.bg} ${priorityConfig.color}`}>
                      {priorityConfig.label}
                    </span>
                  </div>
                  {task.description && (
                    <p className="text-sm text-slate-600 mt-1">{task.description}</p>
                  )}
                  <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                    {task.dueDate && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                    {task.tags && task.tags.length > 0 && (
                      <span className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {task.tags.join(', ')}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded transition-opacity"
                >
                  <X className="h-4 w-4 text-slate-400 hover:text-red-600" />
                </button>
              </div>
            );
          })}

          {showAddTask && (
            <div className="p-4 bg-white rounded-lg border-2 border-blue-200 space-y-3">
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="Task title"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                autoFocus
              />
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="Description (optional)"
                rows={2}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="flex gap-3">
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleAddTask}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Task
                </button>
                <button
                  onClick={() => {
                    setShowAddTask(false);
                    setNewTask({ title: '', description: '', status: 'not-started', priority: 'medium' });
                  }}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {tasks.length === 0 && !showAddTask && (
            <div className="text-center py-8 text-slate-500">
              <p className="text-sm mb-3">No tasks yet</p>
              <button
                onClick={() => setShowAddTask(true)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                + Add first task
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
