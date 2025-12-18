import { useState } from 'react';
import { Plus, ChevronDown, CheckCircle2, Circle, Clock, User, Calendar, MoreVertical } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  completed: boolean;
  assignee?: string;
  dueDate?: string;
}

interface WorkflowStage {
  id: string;
  name: string;
  status: 'pending' | 'in-progress' | 'completed';
  tasks: Task[];
  notes?: string;
}

interface Workflow {
  id: string;
  name: string;
  type: 'product-launch' | 'design-creation' | 'marketing-campaign';
  description: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'on-hold';
  stages: WorkflowStage[];
  dueDate: string;
  progress: number;
}

const workflowTemplates: Record<string, Array<{ name: string; tasks: string[] }>> = {
  'product-launch': [
    {
      name: 'Research & Planning',
      tasks: [
        'Define target audience and market segment',
        'Analyze competitor products',
        'Define unique value proposition',
        'Set pricing strategy',
        'Create product requirements document'
      ]
    },
    {
      name: 'Design & Creation',
      tasks: [
        'Generate AI image prompts',
        'Review and select AI-generated images',
        'Create product mockups',
        'Design variations (colors, sizes)',
        'Get design approval'
      ]
    },
    {
      name: 'Content Production',
      tasks: [
        'Write product title and description',
        'Generate SEO keywords',
        'Create product photography',
        'Write compelling copy',
        'Prepare social media assets'
      ]
    },
    {
      name: 'Platform Setup',
      tasks: [
        'Create product in Shopify',
        'Configure variants and pricing',
        'Set up inventory tracking',
        'Upload product images',
        'Configure shipping settings'
      ]
    },
    {
      name: 'Marketing & Launch',
      tasks: [
        'Create marketing email campaign',
        'Set up social media posts',
        'Configure Facebook/Instagram ads',
        'Launch product',
        'Monitor initial performance'
      ]
    },
    {
      name: 'Post-Launch',
      tasks: [
        'Collect customer feedback',
        'Monitor conversion rates',
        'Optimize product listing',
        'A/B test variations',
        'Generate performance report'
      ]
    }
  ],
  'design-creation': [
    {
      name: 'Concept Development',
      tasks: [
        'Research design trends',
        'Create mood board',
        'Sketch initial concepts',
        'Get stakeholder feedback'
      ]
    },
    {
      name: 'Design Execution',
      tasks: [
        'Create final designs',
        'Generate color variations',
        'Create mockups',
        'Prepare design files'
      ]
    },
    {
      name: 'Review & Approval',
      tasks: [
        'Internal review',
        'Client presentation',
        'Incorporate feedback',
        'Final approval'
      ]
    },
    {
      name: 'Delivery',
      tasks: [
        'Export final files',
        'Organize assets',
        'Create documentation',
        'Archive project'
      ]
    }
  ],
  'marketing-campaign': [
    {
      name: 'Campaign Planning',
      tasks: [
        'Define campaign goals',
        'Identify target audience',
        'Set budget and timeline',
        'Plan content calendar'
      ]
    },
    {
      name: 'Content Creation',
      tasks: [
        'Write copy',
        'Design graphics',
        'Create videos',
        'Prepare landing pages'
      ]
    },
    {
      name: 'Campaign Setup',
      tasks: [
        'Configure ad platforms',
        'Set up tracking',
        'Create email sequences',
        'Schedule social posts'
      ]
    },
    {
      name: 'Launch',
      tasks: [
        'Final QA check',
        'Launch campaign',
        'Monitor initial performance',
        'Make quick adjustments'
      ]
    },
    {
      name: 'Optimization',
      tasks: [
        'Analyze performance data',
        'A/B test variations',
        'Optimize targeting',
        'Scale successful tactics',
        'Generate final report'
      ]
    }
  ]
};

export default function Workflows() {
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: '1',
      name: 'Summer T-Shirt Collection',
      type: 'product-launch',
      description: 'Launch new summer-themed t-shirt designs',
      status: 'in-progress',
      dueDate: '2024-03-31',
      progress: 45,
      stages: [
        {
          id: 's1',
          name: 'Research & Planning',
          status: 'completed',
          tasks: [
            { id: 't1', name: 'Define target audience and market segment', completed: true, assignee: 'Marketing Team' },
            { id: 't2', name: 'Analyze competitor products', completed: true, assignee: 'Research' },
            { id: 't3', name: 'Define unique value proposition', completed: true },
            { id: 't4', name: 'Set pricing strategy', completed: true },
            { id: 't5', name: 'Create product requirements document', completed: true }
          ]
        },
        {
          id: 's2',
          name: 'Design & Creation',
          status: 'in-progress',
          tasks: [
            { id: 't6', name: 'Generate AI image prompts', completed: true, assignee: 'Design Team' },
            { id: 't7', name: 'Review and select AI-generated images', completed: true },
            { id: 't8', name: 'Create product mockups', completed: false, assignee: 'Design Team' },
            { id: 't9', name: 'Design variations (colors, sizes)', completed: false },
            { id: 't10', name: 'Get design approval', completed: false }
          ],
          notes: 'Waiting for mockup approval from client'
        },
        {
          id: 's3',
          name: 'Content Production',
          status: 'pending',
          tasks: [
            { id: 't11', name: 'Write product title and description', completed: false, assignee: 'Content Team' },
            { id: 't12', name: 'Generate SEO keywords', completed: false },
            { id: 't13', name: 'Create product photography', completed: false },
            { id: 't14', name: 'Write compelling copy', completed: false },
            { id: 't15', name: 'Prepare social media assets', completed: false }
          ]
        },
        {
          id: 's4',
          name: 'Platform Setup',
          status: 'pending',
          tasks: [
            { id: 't16', name: 'Create product in Shopify', completed: false, assignee: 'Operations' },
            { id: 't17', name: 'Configure variants and pricing', completed: false },
            { id: 't18', name: 'Set up inventory tracking', completed: false },
            { id: 't19', name: 'Upload product images', completed: false },
            { id: 't20', name: 'Configure shipping settings', completed: false }
          ]
        },
        {
          id: 's5',
          name: 'Marketing & Launch',
          status: 'pending',
          tasks: [
            { id: 't21', name: 'Create marketing email campaign', completed: false, assignee: 'Marketing Team' },
            { id: 't22', name: 'Set up social media posts', completed: false },
            { id: 't23', name: 'Configure Facebook/Instagram ads', completed: false },
            { id: 't24', name: 'Launch product', completed: false },
            { id: 't25', name: 'Monitor initial performance', completed: false }
          ]
        },
        {
          id: 's6',
          name: 'Post-Launch',
          status: 'pending',
          tasks: [
            { id: 't26', name: 'Collect customer feedback', completed: false },
            { id: 't27', name: 'Monitor conversion rates', completed: false },
            { id: 't28', name: 'Optimize product listing', completed: false },
            { id: 't29', name: 'A/B test variations', completed: false },
            { id: 't30', name: 'Generate performance report', completed: false }
          ]
        }
      ]
    }
  ]);

  const [expandedWorkflow, setExpandedWorkflow] = useState<string | null>('1');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newWorkflow, setNewWorkflow] = useState<{
    name: string;
    type: 'product-launch' | 'design-creation' | 'marketing-campaign';
    description: string;
    dueDate: string;
  }>({
    name: '',
    type: 'product-launch',
    description: '',
    dueDate: ''
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-500 animate-pulse" />;
      default:
        return <Circle className="h-5 w-5 text-slate-300" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'on-hold':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const toggleTask = (workflowId: string, stageId: string, taskId: string) => {
    setWorkflows(workflows.map(workflow => {
      if (workflow.id === workflowId) {
        return {
          ...workflow,
          stages: workflow.stages.map(stage => {
            if (stage.id === stageId) {
              return {
                ...stage,
                tasks: stage.tasks.map(task =>
                  task.id === taskId ? { ...task, completed: !task.completed } : task
                )
              };
            }
            return stage;
          })
        };
      }
      return workflow;
    }));
  };

  const calculateProgress = (workflow: Workflow) => {
    const allTasks = workflow.stages.flatMap(s => s.tasks);
    const completedTasks = allTasks.filter(t => t.completed);
    return Math.round((completedTasks.length / allTasks.length) * 100);
  };

  const handleCreateWorkflow = () => {
    const template = workflowTemplates[newWorkflow.type];
    const stages: WorkflowStage[] = template.map((stage, index) => ({
      id: `s${index + 1}`,
      name: stage.name,
      status: 'pending',
      tasks: stage.tasks.map((task, taskIndex) => ({
        id: `t${index}-${taskIndex}`,
        name: task,
        completed: false
      }))
    }));

    const workflow: Workflow = {
      id: Date.now().toString(),
      ...newWorkflow,
      status: 'not-started',
      progress: 0,
      stages
    };

    setWorkflows([workflow, ...workflows]);
    setShowCreateModal(false);
    setNewWorkflow({ name: '', type: 'product-launch', description: '', dueDate: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Workflows</h1>
          <p className="text-slate-600 mt-2">Manage product launches and workflows end-to-end</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Workflow
        </button>
      </div>

      <div className="space-y-4">
        {workflows.map((workflow) => {
          const progress = calculateProgress(workflow);

          return (
            <div key={workflow.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div
                className="p-6 cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => setExpandedWorkflow(expandedWorkflow === workflow.id ? null : workflow.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-slate-900">{workflow.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(workflow.status)}`}>
                        {workflow.status.replace('-', ' ')}
                      </span>
                    </div>
                    <p className="text-slate-600 mb-4">{workflow.description}</p>

                    <div className="flex items-center gap-6 text-sm text-slate-500 mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Due: {new Date(workflow.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{workflow.stages.length} stages</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>
                          {workflow.stages.filter(s => s.status === 'completed').length} / {workflow.stages.length} completed
                        </span>
                      </div>
                    </div>

                    <div className="relative h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-blue-600 transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="text-sm text-slate-600 mt-1">
                      {progress}% complete
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <MoreVertical className="h-5 w-5 text-slate-400" />
                    </button>
                    <ChevronDown
                      className={`h-5 w-5 text-slate-400 transition-transform ${
                        expandedWorkflow === workflow.id ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </div>
              </div>

              {expandedWorkflow === workflow.id && (
                <div className="border-t border-slate-200 bg-slate-50">
                  <div className="p-6 space-y-4">
                    {workflow.stages.map((stage) => {
                      const completedTasks = stage.tasks.filter(t => t.completed).length;
                      const totalTasks = stage.tasks.length;
                      const stageProgress = Math.round((completedTasks / totalTasks) * 100);

                      return (
                        <div key={stage.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                          <div className="p-4 bg-slate-50 border-b border-slate-200">
                            <div className="flex items-center gap-3">
                              {getStatusIcon(stage.status)}
                              <div className="flex-1">
                                <h4 className="font-semibold text-slate-900">{stage.name}</h4>
                                <div className="flex items-center gap-4 mt-1">
                                  <span className="text-sm text-slate-600">
                                    {completedTasks} / {totalTasks} tasks
                                  </span>
                                  <div className="flex-1 max-w-xs">
                                    <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                      <div
                                        className="h-full bg-blue-600 transition-all"
                                        style={{ width: `${stageProgress}%` }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(stage.status)}`}>
                                {stage.status.replace('-', ' ')}
                              </span>
                            </div>
                            {stage.notes && (
                              <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                                <strong>Note:</strong> {stage.notes}
                              </div>
                            )}
                          </div>

                          <div className="p-4">
                            <div className="space-y-2">
                              {stage.tasks.map((task) => (
                                <div
                                  key={task.id}
                                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors group"
                                >
                                  <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleTask(workflow.id, stage.id, task.id)}
                                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                                  />
                                  <span className={`flex-1 text-sm ${task.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                                    {task.name}
                                  </span>
                                  {task.assignee && (
                                    <div className="flex items-center gap-2 text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <User className="h-3 w-3" />
                                      <span>{task.assignee}</span>
                                    </div>
                                  )}
                                  {task.dueDate && (
                                    <div className="flex items-center gap-1 text-xs text-slate-500">
                                      <Calendar className="h-3 w-3" />
                                      <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showCreateModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="bg-white rounded-lg max-w-lg w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Create New Workflow</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Workflow Name
                </label>
                <input
                  type="text"
                  value={newWorkflow.name}
                  onChange={(e) => setNewWorkflow({ ...newWorkflow, name: e.target.value })}
                  placeholder="e.g., Summer Collection Launch"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Type
                </label>
                <select
                  value={newWorkflow.type}
                  onChange={(e) => setNewWorkflow({ ...newWorkflow, type: e.target.value as any })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="product-launch">Product Launch</option>
                  <option value="design-creation">Design Creation</option>
                  <option value="marketing-campaign">Marketing Campaign</option>
                </select>
                <p className="text-xs text-slate-500 mt-1">
                  {newWorkflow.type === 'product-launch' && '6 stages, 30 tasks'}
                  {newWorkflow.type === 'design-creation' && '4 stages, 15 tasks'}
                  {newWorkflow.type === 'marketing-campaign' && '5 stages, 20 tasks'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newWorkflow.description}
                  onChange={(e) => setNewWorkflow({ ...newWorkflow, description: e.target.value })}
                  placeholder="Brief description of this workflow..."
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  value={newWorkflow.dueDate}
                  onChange={(e) => setNewWorkflow({ ...newWorkflow, dueDate: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleCreateWorkflow}
                  disabled={!newWorkflow.name || !newWorkflow.dueDate}
                  className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Create Workflow
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
