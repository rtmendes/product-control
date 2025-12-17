import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import type { WorkflowStage } from '../App';

interface StageGanttViewProps {
  stages: WorkflowStage[];
  onUpdate: (stage: WorkflowStage) => void;
}

export function StageGanttView({ stages, onUpdate }: StageGanttViewProps) {
  const [expandedStage, setExpandedStage] = useState<string | null>(null);

  const getStageProgress = (stage: WorkflowStage) => {
    switch (stage.status) {
      case 'completed':
        return 100;
      case 'in-progress':
        return 50;
      default:
        return 0;
    }
  };

  const getStatusColor = (status: WorkflowStage['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getStatusLabel = (status: WorkflowStage['status']) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      default:
        return 'Not Started';
    }
  };

  return (
    <div className="space-y-3">
      {stages.map((stage) => {
        const progress = getStageProgress(stage);
        const isExpanded = expandedStage === stage.id;

        return (
          <Card key={stage.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedStage(isExpanded ? null : stage.id)}
                    className="h-6 w-6 p-0"
                  >
                    {isExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                  </Button>
                  <div className="w-48 flex-shrink-0">
                    <h4 className="text-sm">{stage.name}</h4>
                  </div>
                  <div className="flex-1 relative">
                    <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
                      <div
                        className={`h-8 rounded-full transition-all flex items-center justify-end px-3 text-xs text-white ${getStatusColor(stage.status)}`}
                        style={{ width: `${progress}%` }}
                      >
                        {progress > 0 && (
                          <span>{getStatusLabel(stage.status)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-24 text-right text-sm text-gray-600 flex-shrink-0">
                    {progress}%
                  </div>
                </div>

                {isExpanded && (
                  <div className="ml-12 pl-4 border-l-2 border-gray-200 space-y-3">
                    {stage.notes && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Notes:</p>
                        <p className="text-sm text-gray-700">{stage.notes}</p>
                      </div>
                    )}
                    {stage.tags.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-500 mb-2">Tags:</p>
                        <div className="flex flex-wrap gap-2">
                          {stage.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {stage.resources.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-500 mb-2">Resources ({stage.resources.length}):</p>
                        <div className="space-y-1">
                          {stage.resources.map((resource) => (
                            <a
                              key={resource.id}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block text-sm text-blue-600 hover:underline truncate"
                            >
                              {resource.title}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                    {stage.mediaFiles.length > 0 && (
                      <div>
                        <p className="text-xs text-gray-500 mb-2">Media Files ({stage.mediaFiles.length}):</p>
                        <div className="grid grid-cols-4 gap-2">
                          {stage.mediaFiles.map((file) => (
                            <div key={file.id} className="aspect-square bg-gray-100 rounded overflow-hidden">
                              {file.type.startsWith('image/') ? (
                                <img
                                  src={file.url}
                                  alt={file.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                                  {file.name.split('.').pop()?.toUpperCase()}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        variant={stage.status === 'not-started' ? 'default' : 'outline'}
                        onClick={() => onUpdate({ ...stage, status: 'not-started' })}
                      >
                        Not Started
                      </Button>
                      <Button
                        size="sm"
                        variant={stage.status === 'in-progress' ? 'default' : 'outline'}
                        onClick={() => onUpdate({ ...stage, status: 'in-progress' })}
                      >
                        In Progress
                      </Button>
                      <Button
                        size="sm"
                        variant={stage.status === 'completed' ? 'default' : 'outline'}
                        onClick={() => onUpdate({ ...stage, status: 'completed' })}
                      >
                        Completed
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
