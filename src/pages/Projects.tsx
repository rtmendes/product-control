import { useState } from 'react';
import { Plus, ChevronDown, ChevronRight, Folder, Edit2, Trash2, Grid3x3, LayoutList } from 'lucide-react';
import { ProjectsKanbanView } from '@/components/dashboard/ProjectsKanbanView';

interface Project {
  id: string;
  name: string;
  description: string;
  type: string;
  icon: string;
  color: string;
  isExpanded: boolean;
  items: ProjectItem[];
  status: 'not-started' | 'in-progress' | 'completed';
  progress?: number;
}

interface ProjectItem {
  id: string;
  name: string;
  type: 'document' | 'table' | 'workflow';
  icon: string;
}

export default function Projects() {
  const [viewMode, setViewMode] = useState<'grid' | 'kanban'>('grid');
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Business Operations',
      description: 'Core business workflows and operations',
      type: 'business',
      icon: '💼',
      color: 'bg-blue-500',
      isExpanded: true,
      status: 'in-progress',
      progress: 65,
      items: [
        { id: 'w1', name: 'Product Launch Workflow', type: 'workflow', icon: '🔄' },
        { id: 'd1', name: 'Operations Manual', type: 'document', icon: '📄' },
        { id: 't1', name: 'Task Tracker', type: 'table', icon: '📊' }
      ]
    },
    {
      id: '2',
      name: 'Print on Demand',
      description: 'Digital art and product designs',
      type: 'pod',
      icon: '🎨',
      color: 'bg-purple-500',
      isExpanded: true,
      status: 'not-started',
      progress: 0,
      items: [
        { id: 'ai1', name: 'AI Prompts Database', type: 'table', icon: '✨' },
        { id: 'p1', name: 'Product Catalog', type: 'table', icon: '👕' },
        { id: 'd2', name: 'Design Guidelines', type: 'document', icon: '📐' }
      ]
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    type: 'business',
    icon: '📁'
  });

  const toggleProject = (projectId: string) => {
    setProjects(projects.map(p =>
      p.id === projectId ? { ...p, isExpanded: !p.isExpanded } : p
    ));
  };

  const handleCreateProject = () => {
    const project: Project = {
      id: Date.now().toString(),
      ...newProject,
      color: 'bg-blue-500',
      isExpanded: true,
      status: 'not-started',
      progress: 0,
      items: []
    };
    setProjects([...projects, project]);
    setShowCreateModal(false);
    setNewProject({ name: '', description: '', type: 'business', icon: '📁' });
  };

  const handleProjectMove = (projectId: string, newStatus: 'not-started' | 'in-progress' | 'completed') => {
    setProjects(projects.map(p =>
      p.id === projectId ? { ...p, status: newStatus } : p
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">All Projects</h1>
          <p className="text-slate-600 mt-2">Organize your work into projects and workspaces</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-200 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Grid3x3 className="h-4 w-4" />
              Grid
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded ${
                viewMode === 'kanban'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutList className="h-4 w-4" />
              Kanban
            </button>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            New Project
          </button>
        </div>
      </div>

      {viewMode === 'kanban' ? (
        <ProjectsKanbanView
          projects={projects}
          onProjectMove={handleProjectMove}
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden">
            <div
              className="p-4 cursor-pointer hover:bg-slate-50 transition-colors border-b border-slate-200"
              onClick={() => toggleProject(project.id)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${project.color} rounded-lg flex items-center justify-center text-2xl`}>
                  {project.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{project.name}</h3>
                  <p className="text-sm text-slate-600">{project.description}</p>
                </div>
                {project.isExpanded ? (
                  <ChevronDown className="h-5 w-5 text-slate-400" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-slate-400" />
                )}
              </div>
            </div>

            {project.isExpanded && (
              <div className="p-4 bg-slate-50">
                <div className="space-y-2">
                  {project.items.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                      <Folder className="h-8 w-8 mx-auto mb-2 text-slate-300" />
                      <p className="text-sm">No items yet</p>
                      <button className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium">
                        + Add first item
                      </button>
                    </div>
                  ) : (
                    project.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-slate-50 transition-colors group"
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span className="flex-1 text-sm font-medium text-slate-900">{item.name}</span>
                        <span className="text-xs text-slate-500 capitalize">{item.type}</span>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                          <button className="p-1 text-slate-600 hover:text-blue-600">
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-slate-600 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <button className="w-full mt-3 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium border border-dashed border-slate-300 rounded-lg hover:border-slate-400 transition-colors">
                  + Add item
                </button>
              </div>
            )}
          </div>
        ))}
        </div>
      )}

      {showCreateModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="bg-white rounded-lg max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-slate-900 mb-4">Create New Project</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  placeholder="My Project"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="What is this project about?"
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Icon
                </label>
                <div className="grid grid-cols-8 gap-2">
                  {['📁', '💼', '🎨', '📊', '🚀', '💡', '🔧', '📱'].map(icon => (
                    <button
                      key={icon}
                      onClick={() => setNewProject({ ...newProject, icon })}
                      className={`p-2 text-2xl rounded border-2 transition-colors ${
                        newProject.icon === icon
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleCreateProject}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create Project
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"
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
