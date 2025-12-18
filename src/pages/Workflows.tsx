import { useState } from 'react';
import { Plus, ChevronDown, CheckCircle2, Circle, Clock } from 'lucide-react';

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'not-started' | 'in-progress' | 'completed';
  stages: WorkflowStage[];
  dueDate: string;
}

interface WorkflowStage {
  id: string;
  name: string;
  status: 'pending' | 'in-progress' | 'completed';
  assignee: string;
  tasks: string[];
}

export default function Workflows() {
  const [workflows] = useState<Workflow[]>([
    {
      id: '1',
      name: 'Product Launch Q1',
      description: 'Launch new t-shirt collection',
      status: 'in-progress',
      dueDate: '2024-03-31',
      stages: [
        {
          id: 's1',
          name: 'Design & Creation',
          status: 'completed',
          assignee: 'Design Team',
          tasks: ['Create mockups', 'AI image generation', 'Review designs']
        },
        {
          id: 's2',
          name: 'Content Production',
          status: 'in-progress',
          assignee: 'Marketing',
          tasks: ['Product descriptions', 'SEO optimization', 'Photography']
        },
        {
          id: 's3',
          name: 'Platform Setup',
          status: 'pending',
          assignee: 'Operations',
          tasks: ['Shopify configuration', 'Inventory setup', 'Pricing']
        }
      ]
    }
  ]);

  const [expandedWorkflow, setExpandedWorkflow] = useState<string | null>('1');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <Circle className="h-5 w-5 text-slate-300" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Workflows</h1>
          <p className="text-slate-600 mt-2">Manage your product launch workflows and tasks</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          New Workflow
        </button>
      </div>

      <div className="space-y-4">
        {workflows.map((workflow) => (
          <div key={workflow.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div
              className="p-6 cursor-pointer hover:bg-slate-50 transition-colors"
              onClick={() => setExpandedWorkflow(expandedWorkflow === workflow.id ? null : workflow.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-slate-900">{workflow.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(workflow.status)}`}>
                      {workflow.status.replace('-', ' ')}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm mb-3">{workflow.description}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <span>Due: {new Date(workflow.dueDate).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{workflow.stages.length} stages</span>
                    <span>•</span>
                    <span>
                      {workflow.stages.filter(s => s.status === 'completed').length} / {workflow.stages.length} completed
                    </span>
                  </div>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-slate-400 transition-transform ${
                    expandedWorkflow === workflow.id ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </div>

            {expandedWorkflow === workflow.id && (
              <div className="border-t border-slate-200 bg-slate-50 p-6">
                <div className="space-y-4">
                  {workflow.stages.map((stage) => (
                    <div key={stage.id} className="bg-white rounded-lg p-4 border border-slate-200">
                      <div className="flex items-start gap-3">
                        {getStatusIcon(stage.status)}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-slate-900">{stage.name}</h4>
                            <span className="text-sm text-slate-600">Assigned to: {stage.assignee}</span>
                          </div>
                          <ul className="space-y-2">
                            {stage.tasks.map((task, taskIndex) => (
                              <li key={taskIndex} className="flex items-center gap-2 text-sm text-slate-600">
                                <input
                                  type="checkbox"
                                  checked={stage.status === 'completed'}
                                  className="rounded border-slate-300"
                                  readOnly
                                />
                                {task}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
