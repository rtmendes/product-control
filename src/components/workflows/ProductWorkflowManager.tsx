import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Clock, ChevronDown, ChevronRight, Plus, X, Link2, FileText, Tag } from 'lucide-react';

interface WorkflowStage {
  name: string;
  description: string;
  status?: 'not-started' | 'in-progress' | 'completed';
  notes?: string;
  resources?: { title: string; url: string }[];
  mediaFiles?: { name: string; type: string; url: string }[];
  tags?: string[];
  knowledgeBase?: { title: string; url: string }[];
}

interface ProductWorkflowManagerProps {
  productType: 'book' | 'course' | 'ecommerce' | 'print-on-demand' | 'article' | 'social-media';
  stages: WorkflowStage[];
  onStagesUpdate?: (stages: WorkflowStage[]) => void;
}

const PRODUCT_TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'book': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-300' },
  'course': { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' },
  'ecommerce': { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
  'print-on-demand': { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300' },
  'article': { bg: 'bg-pink-100', text: 'text-pink-700', border: 'border-pink-300' },
  'social-media': { bg: 'bg-cyan-100', text: 'text-cyan-700', border: 'border-cyan-300' },
};

const STATUS_CONFIG = {
  'not-started': { icon: Circle, color: 'text-slate-400', bg: 'bg-slate-100', label: 'Not Started' },
  'in-progress': { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'In Progress' },
  'completed': { icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100', label: 'Completed' },
};

export function ProductWorkflowManager({ productType, stages, onStagesUpdate }: ProductWorkflowManagerProps) {
  const [localStages, setLocalStages] = useState<WorkflowStage[]>(stages);
  const [expandedStages, setExpandedStages] = useState<Set<number>>(new Set());

  const colors = PRODUCT_TYPE_COLORS[productType] || PRODUCT_TYPE_COLORS['book'];

  useEffect(() => {
    setLocalStages(stages);
  }, [stages]);

  const toggleStage = (index: number) => {
    const newExpanded = new Set(expandedStages);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedStages(newExpanded);
  };

  const updateStage = (index: number, updates: Partial<WorkflowStage>) => {
    const updated = [...localStages];
    updated[index] = { ...updated[index], ...updates };
    setLocalStages(updated);
    if (onStagesUpdate) {
      onStagesUpdate(updated);
    }
  };

  const addResource = (stageIndex: number) => {
    const title = prompt('Resource title:');
    const url = prompt('Resource URL:');
    if (title && url) {
      const stage = localStages[stageIndex];
      const resources = [...(stage.resources || []), { title, url }];
      updateStage(stageIndex, { resources });
    }
  };

  const removeResource = (stageIndex: number, resourceIndex: number) => {
    const stage = localStages[stageIndex];
    const resources = stage.resources?.filter((_, i) => i !== resourceIndex) || [];
    updateStage(stageIndex, { resources });
  };

  const addKnowledgeBase = (stageIndex: number) => {
    const title = prompt('Knowledge Base title:');
    const url = prompt('URL (Google Docs, Notion, etc.):');
    if (title && url) {
      const stage = localStages[stageIndex];
      const knowledgeBase = [...(stage.knowledgeBase || []), { title, url }];
      updateStage(stageIndex, { knowledgeBase });
    }
  };

  const removeKnowledgeBase = (stageIndex: number, kbIndex: number) => {
    const stage = localStages[stageIndex];
    const knowledgeBase = stage.knowledgeBase?.filter((_, i) => i !== kbIndex) || [];
    updateStage(stageIndex, { knowledgeBase });
  };

  const addTag = (stageIndex: number) => {
    const tag = prompt('Enter tag:');
    if (tag) {
      const stage = localStages[stageIndex];
      const tags = [...(stage.tags || []), tag];
      updateStage(stageIndex, { tags });
    }
  };

  const removeTag = (stageIndex: number, tagIndex: number) => {
    const stage = localStages[stageIndex];
    const tags = stage.tags?.filter((_, i) => i !== tagIndex) || [];
    updateStage(stageIndex, { tags });
  };

  const completedCount = localStages.filter(s => s.status === 'completed').length;
  const inProgressCount = localStages.filter(s => s.status === 'in-progress').length;
  const progress = (completedCount / localStages.length) * 100;

  return (
    <div className="space-y-6">
      <div className={`rounded-lg border-2 ${colors.border} ${colors.bg} p-6`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className={`text-2xl font-bold ${colors.text} capitalize`}>
              {productType.replace('-', ' ')} Workflow
            </h2>
            <p className="text-slate-600 mt-1">
              {localStages.length} stages • {completedCount} completed • {inProgressCount} in progress
            </p>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${colors.text}`}>{Math.round(progress)}%</div>
            <div className="text-sm text-slate-600">Complete</div>
          </div>
        </div>

        <div className="w-full bg-slate-200 rounded-full h-3">
          <div
            className={`${colors.bg.replace('100', '600')} h-3 rounded-full transition-all duration-300`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {localStages.map((stage, index) => {
          const isExpanded = expandedStages.has(index);
          const status = stage.status || 'not-started';
          const statusConfig = STATUS_CONFIG[status];
          const StatusIcon = statusConfig.icon;

          return (
            <div key={index} className="bg-white rounded-lg border border-slate-200 overflow-hidden">
              <div
                className="p-4 flex items-center gap-3 cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => toggleStage(index)}
              >
                <button className="flex-shrink-0">
                  {isExpanded ? <ChevronDown className="h-5 w-5 text-slate-400" /> : <ChevronRight className="h-5 w-5 text-slate-400" />}
                </button>

                <div className={`flex-shrink-0 w-8 h-8 rounded-full ${statusConfig.bg} flex items-center justify-center`}>
                  <StatusIcon className={`h-5 w-5 ${statusConfig.color}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-900">{stage.name}</h3>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusConfig.bg} ${statusConfig.color}`}>
                      {statusConfig.label}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{stage.description}</p>
                </div>

                <div className="flex-shrink-0">
                  <select
                    value={status}
                    onChange={(e) => {
                      e.stopPropagation();
                      updateStage(index, { status: e.target.value as any });
                    }}
                    className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="not-started">Not Started</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-slate-200 p-4 bg-slate-50 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Notes
                    </label>
                    <textarea
                      value={stage.notes || ''}
                      onChange={(e) => updateStage(index, { notes: e.target.value })}
                      placeholder="Add notes about this stage..."
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-slate-700">
                        Resources
                      </label>
                      <button
                        onClick={() => addResource(index)}
                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                      >
                        <Plus className="h-4 w-4" />
                        Add Resource
                      </button>
                    </div>
                    {stage.resources && stage.resources.length > 0 && (
                      <div className="space-y-2">
                        {stage.resources.map((resource, rIndex) => (
                          <div key={rIndex} className="flex items-center gap-2 bg-white rounded-lg p-2 border border-slate-200">
                            <Link2 className="h-4 w-4 text-slate-400 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm text-slate-900 truncate">{resource.title}</div>
                              <a
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 hover:underline truncate block"
                              >
                                {resource.url}
                              </a>
                            </div>
                            <button
                              onClick={() => removeResource(index, rIndex)}
                              className="flex-shrink-0 p-1 hover:bg-slate-100 rounded"
                            >
                              <X className="h-4 w-4 text-slate-400" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-slate-700">
                        Knowledge Base & SOPs
                      </label>
                      <button
                        onClick={() => addKnowledgeBase(index)}
                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                      >
                        <Plus className="h-4 w-4" />
                        Add KB Link
                      </button>
                    </div>
                    {stage.knowledgeBase && stage.knowledgeBase.length > 0 && (
                      <div className="space-y-2">
                        {stage.knowledgeBase.map((kb, kbIndex) => (
                          <div key={kbIndex} className="flex items-center gap-2 bg-yellow-50 rounded-lg p-2 border border-yellow-200">
                            <FileText className="h-4 w-4 text-yellow-600 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm text-slate-900 truncate">{kb.title}</div>
                              <a
                                href={kb.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 hover:underline truncate block"
                              >
                                {kb.url}
                              </a>
                            </div>
                            <button
                              onClick={() => removeKnowledgeBase(index, kbIndex)}
                              className="flex-shrink-0 p-1 hover:bg-yellow-100 rounded"
                            >
                              <X className="h-4 w-4 text-slate-400" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-slate-700">
                        Tags
                      </label>
                      <button
                        onClick={() => addTag(index)}
                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                      >
                        <Plus className="h-4 w-4" />
                        Add Tag
                      </button>
                    </div>
                    {stage.tags && stage.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {stage.tags.map((tag, tIndex) => (
                          <span
                            key={tIndex}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-700 rounded text-sm"
                          >
                            <Tag className="h-3 w-3" />
                            {tag}
                            <button
                              onClick={() => removeTag(index, tIndex)}
                              className="ml-1 hover:text-slate-900"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
