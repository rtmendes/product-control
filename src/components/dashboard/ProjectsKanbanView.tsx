import { useDrag, useDrop } from 'react-dnd';
import { MoreVertical, Eye } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  type: string;
  icon: string;
  color: string;
  status: 'not-started' | 'in-progress' | 'completed';
  progress?: number;
}

interface ProjectsKanbanViewProps {
  projects: Project[];
  onProjectMove: (projectId: string, newStatus: 'not-started' | 'in-progress' | 'completed') => void;
  onProjectClick?: (project: Project) => void;
}

const ITEM_TYPE = 'PROJECT';

const COLUMNS = [
  { id: 'not-started', title: 'Not Started', color: 'bg-slate-100 border-slate-300' },
  { id: 'in-progress', title: 'In Progress', color: 'bg-yellow-100 border-yellow-300' },
  { id: 'completed', title: 'Completed', color: 'bg-green-100 border-green-300' },
] as const;

interface ProjectCardProps {
  project: Project;
  onProjectClick?: (project: Project) => void;
}

function ProjectCard({ project, onProjectClick }: ProjectCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ITEM_TYPE,
    item: { id: project.id, status: project.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`bg-white rounded-lg border-2 border-slate-200 p-4 cursor-move transition-all hover:shadow-md ${
        isDragging ? 'opacity-50 rotate-2 scale-95' : 'opacity-100'
      }`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className={`w-10 h-10 ${project.color} rounded-lg flex items-center justify-center text-xl flex-shrink-0`}>
          {project.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-900 truncate">{project.name}</h3>
          <p className="text-xs text-slate-600 line-clamp-2">{project.description}</p>
        </div>
        <button className="p-1 hover:bg-slate-100 rounded flex-shrink-0">
          <MoreVertical className="h-4 w-4 text-slate-400" />
        </button>
      </div>

      {project.progress !== undefined && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
            <span>Progress</span>
            <span className="font-medium">{Math.round(project.progress)}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-slate-200">
        <span className="text-xs text-slate-500 capitalize">{project.type}</span>
        <button
          onClick={() => onProjectClick?.(project)}
          className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
        >
          <Eye className="h-3 w-3" />
          View
        </button>
      </div>
    </div>
  );
}

interface KanbanColumnProps {
  status: 'not-started' | 'in-progress' | 'completed';
  title: string;
  color: string;
  projects: Project[];
  onDrop: (projectId: string, newStatus: 'not-started' | 'in-progress' | 'completed') => void;
  onProjectClick?: (project: Project) => void;
}

function KanbanColumn({ status, title, color, projects, onDrop, onProjectClick }: KanbanColumnProps) {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ITEM_TYPE,
    drop: (item: { id: string; status: string }) => {
      if (item.status !== status) {
        onDrop(item.id, status);
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
        <p className="text-sm text-slate-600">{projects.length} projects</p>
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
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onProjectClick={onProjectClick} />
        ))}
        {projects.length === 0 && (
          <div className="flex items-center justify-center h-32 text-slate-400 text-sm">
            Drop projects here
          </div>
        )}
      </div>
    </div>
  );
}

export function ProjectsKanbanView({ projects, onProjectMove, onProjectClick }: ProjectsKanbanViewProps) {
  const projectsByStatus = {
    'not-started': projects.filter((p) => p.status === 'not-started'),
    'in-progress': projects.filter((p) => p.status === 'in-progress'),
    completed: projects.filter((p) => p.status === 'completed'),
  };

  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
      {COLUMNS.map((column) => (
        <KanbanColumn
          key={column.id}
          status={column.id}
          title={column.title}
          color={column.color}
          projects={projectsByStatus[column.id]}
          onDrop={onProjectMove}
          onProjectClick={onProjectClick}
        />
      ))}
    </div>
  );
}
