import { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Move, Link as LinkIcon, Upload } from 'lucide-react';
import type { WorkflowStage } from '../App';

interface StageWhiteboardViewProps {
  stages: WorkflowStage[];
  onUpdate: (stage: WorkflowStage) => void;
}

interface Position {
  x: number;
  y: number;
}

export function StageWhiteboardView({ stages, onUpdate }: StageWhiteboardViewProps) {
  const [positions, setPositions] = useState<Record<string, Position>>(() => {
    const saved = localStorage.getItem('stageWhiteboardPositions');
    return saved ? JSON.parse(saved) : {};
  });
  const [dragging, setDragging] = useState<string | null>(null);
  const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('stageWhiteboardPositions', JSON.stringify(positions));
  }, [positions]);

  useEffect(() => {
    // Initialize positions for new stages
    stages.forEach((stage, index) => {
      if (!positions[stage.id]) {
        const row = Math.floor(index / 4);
        const col = index % 4;
        setPositions(prev => ({
          ...prev,
          [stage.id]: {
            x: 30 + col * 250,
            y: 30 + row * 180,
          },
        }));
      }
    });
  }, [stages]);

  const handleMouseDown = (e: React.MouseEvent, stageId: string) => {
    if ((e.target as HTMLElement).closest('button')) return;
    
    const pos = positions[stageId] || { x: 0, y: 0 };
    setDragging(stageId);
    setOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;

    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    const x = e.clientX - containerRect.left - offset.x;
    const y = e.clientY - containerRect.top - offset.y;

    setPositions(prev => ({
      ...prev,
      [dragging]: {
        x: Math.max(0, Math.min(x, containerRect.width - 240)),
        y: Math.max(0, Math.min(y, containerRect.height - 160)),
      },
    }));
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  const getStatusColor = (status: WorkflowStage['status']) => {
    switch (status) {
      case 'completed':
        return 'border-green-500';
      case 'in-progress':
        return 'border-blue-500';
      default:
        return 'border-gray-300';
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden"
      style={{ height: '700px' }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px',
        }}
      />

      {stages.map((stage) => {
        const pos = positions[stage.id] || { x: 0, y: 0 };

        return (
          <Card
            key={stage.id}
            className={`absolute cursor-move hover:shadow-lg transition-shadow w-[240px] border-l-4 ${getStatusColor(stage.status)}`}
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              userSelect: 'none',
            }}
            onMouseDown={(e) => handleMouseDown(e, stage.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between mb-1">
                <Move className="size-4 text-gray-400 flex-shrink-0 mt-1" />
                <Badge variant={stage.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                  {stage.status === 'completed' ? 'Done' : stage.status === 'in-progress' ? 'In Progress' : 'To Do'}
                </Badge>
              </div>
              <CardTitle className="text-sm leading-tight">{stage.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {stage.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {stage.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {stage.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{stage.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                )}
                <div className="flex gap-3 text-xs text-gray-600">
                  {stage.resources.length > 0 && (
                    <div className="flex items-center gap-1">
                      <LinkIcon className="size-3" />
                      {stage.resources.length}
                    </div>
                  )}
                  {stage.mediaFiles.length > 0 && (
                    <div className="flex items-center gap-1">
                      <Upload className="size-3" />
                      {stage.mediaFiles.length}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
