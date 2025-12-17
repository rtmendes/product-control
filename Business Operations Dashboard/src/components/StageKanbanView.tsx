import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import type { WorkflowStage } from '../App';

interface StageKanbanViewProps {
  stages: WorkflowStage[];
  onUpdate: (stage: WorkflowStage) => void;
}

const statusColumns = [
  { id: 'not-started', label: 'Not Started', color: 'bg-gray-50' },
  { id: 'in-progress', label: 'In Progress', color: 'bg-blue-50' },
  { id: 'completed', label: 'Completed', color: 'bg-green-50' },
];

export function StageKanbanView({ stages, onUpdate }: StageKanbanViewProps) {
  const [expandedStage, setExpandedStage] = useState<string | null>(null);

  const getStagesByStatus = (status: WorkflowStage['status']) => {
    return stages.filter(stage => stage.status === status);
  };

  const moveStage = (stage: WorkflowStage, newStatus: WorkflowStage['status']) => {
    onUpdate({ ...stage, status: newStatus });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statusColumns.map((column) => {
        const stagesInColumn = getStagesByStatus(column.id as WorkflowStage['status']);
        
        return (
          <div key={column.id} className="flex flex-col">
            <div className={`${column.color} rounded-t-lg p-4 border-b-2 border-gray-200`}>
              <div className="flex items-center justify-between">
                <h4>{column.label}</h4>
                <Badge variant="secondary">{stagesInColumn.length}</Badge>
              </div>
            </div>
            <ScrollArea className="flex-1 min-h-[500px] bg-gray-50/50 rounded-b-lg p-4">
              <div className="space-y-3">
                {stagesInColumn.map((stage) => (
                  <Card key={stage.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{stage.name}</CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpandedStage(expandedStage === stage.id ? null : stage.id)}
                        >
                          {expandedStage === stage.id ? (
                            <ChevronUp className="size-4" />
                          ) : (
                            <ChevronDown className="size-4" />
                          )}
                        </Button>
                      </div>
                      {stage.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {stage.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardHeader>
                    {expandedStage === stage.id && (
                      <CardContent className="pt-0 space-y-3">
                        {stage.notes && (
                          <div className="text-sm text-gray-600">
                            <p className="text-xs text-gray-500 mb-1">Notes:</p>
                            <p className="line-clamp-3">{stage.notes}</p>
                          </div>
                        )}
                        {stage.resources.length > 0 && (
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Resources: {stage.resources.length}</p>
                          </div>
                        )}
                        {stage.mediaFiles.length > 0 && (
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Files: {stage.mediaFiles.length}</p>
                          </div>
                        )}
                        <div className="flex gap-2 pt-2">
                          {column.id !== 'not-started' && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 text-xs"
                              onClick={() => moveStage(stage, column.id === 'in-progress' ? 'not-started' : 'in-progress')}
                            >
                              ←
                            </Button>
                          )}
                          {column.id !== 'completed' && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 text-xs"
                              onClick={() => moveStage(stage, column.id === 'not-started' ? 'in-progress' : 'completed')}
                            >
                              →
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        );
      })}
    </div>
  );
}
