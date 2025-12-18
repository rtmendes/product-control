import { useDrag, useDrop } from 'react-dnd';
import { Circle, Clock, CheckCircle2, ChevronRight } from 'lucide-react';

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

interface WorkflowStagesKanbanViewProps {
  stages: WorkflowStage[];
  onStageMove: (stageIndex: number, newStatus: 'not-started' | 'in-progress' | 'completed') => void;
  onStageClick?: (stageIndex: number) => void;
}

const ITEM_TYPE = 'WORKFLOW_STAGE';

const STATUS_CONFIG = {
  'not-started': { icon: Circle, color: 'text-slate-400', bg: 'bg-slate-100', label: 'Not Started' },
  'in-progress': { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'In Progress' },
  'completed': { icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100', label: 'Completed' },
};

const COLUMNS = [
  { id: 'not-started', title: 'Not Started', color: 'bg-slate-100 border-slate-300' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-yellow-100 border-yellow-300' },
  { id: 'completed', title: 'Completed', color: 'bg-green-100 border-green-300' },
] as const;

interface StageCardProps {
  stage: WorkflowStage;
  index: number;
  onStageClick?: (stageIndex: number) => void;
}

function StageCard({ stage, index, onStageClick }: StageCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPE,
    item: { index, status: stage.status || 'not-started' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const status = stage.status || 'not-started';
  const statusConfig = STATUS_CONFIG[status];
  const StatusIcon = statusConfig.icon;

  return (
    <div
      ref={drag}
      className={`bg-white rounded-lg border-2 border-slate-200 p-4 cursor-move transition-all hover:shadow-md ${
        isDragging ? 'opacity-50 rotate-2 scale-95' : 'opacity-100'
      }`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-8 h-8 rounded-full ${statusConfig.bg} flex items-center justify-center flex-shrink-0`}>
          <StatusIcon className={`h-4 w-4 ${statusConfig.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-slate-900 mb-1">{stage.name}</h4>
          <p className="text-xs text-slate-600 line-clamp-2">{stage.description}</p>
        </div>
      </div>

      {stage.notes && (
        <div className="mb-3 p-2 bg-slate-50 rounded text-xs text-slate-700 line-clamp-3">
          {stage.notes}
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-slate-200">
        <div className="flex gap-2 text-xs text-slate-500">
          {stage.resources && stage.resources.length > 0 && (
            <span>{stage.resources.length} resources</span>
          )}
          {stage.tags && stage.tags.length > 0 && (
            <span>{stage.tags.length} tags</span>
          )}
        </div>
        <button
          onClick={() => onStageClick?.(index)}
          className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
        >
          View
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

interface KanbanColumnProps {
  status: 'not-started' | 'in-progress' | 'completed';
  title: string;
  color: string;
  stages: { stage: WorkflowStage; index: number }[];
  onDrop: (stageIndex: number, newStatus: 'not-started' | 'in-progress' | 'completed') => void;
  onStageClick?: (stageIndex: number) => void;
}

function KanbanColumn({ status, title, color, stages, onDrop, onStageClick }: KanbanColumnProps) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ITEM_TYPE,
    drop: (item: { index: number; status: string }) => {
      if (item.status !== status) {
        onDrop(item.index, status);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = isOver && canDrop;

  return (
    <div className="flex-1 min-w-[320px]">
      <div className={`rounded-lg border-2 ${color} p-4 mb-4`}>
        <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
        <p className="text-sm text-slate-600">{stages.length} stages</p>
      </div>

      <div
        ref={drop}
        className={`min-h-[600px] rounded-lg border-2 border-dashed p-4 space-y-3 transition-all ${
          isActive
            ? 'border-blue-500 bg-blue-50'
            : canDrop
            ? 'border-slate-300 bg-slate-50'
            : 'border-slate-200 bg-slate-50'
        }`}
      >
        {stages.map(({ stage, index }) => (
          <StageCard key={index} stage={stage} index={index} onStageClick={onStageClick} />
        ))}
        {stages.length === 0 && (
          <div className="flex items-center justify-center h-32 text-slate-400 text-sm">
            Drop stages here
          </div>
        )}
      </div>
    </div>
  );
}

export function WorkflowStagesKanbanView({ stages, onStageMove, onStageClick }: WorkflowStagesKanbanViewProps) {
  const stagesByStatus = {
    'not-started': stages
      .map((stage, index) => ({ stage, index }))
      .filter(({ stage }) => (stage.status || 'not-started') === 'not-started'),
    'in-progress': stages
      .map((stage, index) => ({ stage, index }))
      .filter(({ stage }) => (stage.status || 'not-started') === 'in-progress'),
    completed: stages
      .map((stage, index) => ({ stage, index }))
      .filter(({ stage }) => (stage.status || 'not-started') === 'completed'),
  };

  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
      {COLUMNS.map((column) => (
        <KanbanColumn
          key={column.id}
          status={column.id}
          title={column.title}
          color={column.color}
          stages={stagesByStatus[column.id]}
          onDrop={onStageMove}
          onStageClick={onStageClick}
        />
      ))}
    </div>
  );
}
