import { useState } from 'react';
import { ChevronRight, ChevronDown, Plus, Search, Home, Folder, FileText, Database, Rocket } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarFolder {
  id: string;
  name: string;
  icon: string;
  isExpanded: boolean;
  children?: SidebarItem[];
}

interface SidebarItem {
  id: string;
  name: string;
  icon: string;
  path?: string;
  count?: number;
}

export function ModernSidebar() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [folders, setFolders] = useState<SidebarFolder[]>([
    {
      id: 'business-ops',
      name: 'Business Operations',
      icon: '💼',
      isExpanded: true,
      children: [
        { id: 'workflows', name: 'Workflows', icon: '🔄', path: '/workflows' },
        { id: 'tasks', name: 'Tasks & Timeline', icon: '✓', path: '/tasks' },
        { id: 'planning', name: 'Planning', icon: '📋', path: '/planning' }
      ]
    },
    {
      id: 'pod-digital-art',
      name: 'Print on Demand',
      icon: '🎨',
      isExpanded: true,
      children: [
        { id: 'ai-prompts', name: 'AI Prompts', icon: '✨', path: '/ai-prompts', count: 0 },
        { id: 'products', name: 'Products', icon: '👕', path: '/products', count: 0 },
        { id: 'designs', name: 'Designs', icon: '🖼️', path: '/designs', count: 0 }
      ]
    },
    {
      id: 'assets',
      name: 'Asset Library',
      icon: '📦',
      isExpanded: false,
      children: [
        { id: 'all-assets', name: 'All Assets', icon: '📁', path: '/assets', count: 0 },
        { id: 'images', name: 'Images', icon: '🖼️', path: '/assets?type=image' },
        { id: 'videos', name: 'Videos', icon: '🎬', path: '/assets?type=video' },
        { id: 'copy', name: 'Copywriting', icon: '✍️', path: '/assets?type=copy' }
      ]
    }
  ]);

  const toggleFolder = (folderId: string) => {
    setFolders(folders.map(folder =>
      folder.id === folderId
        ? { ...folder, isExpanded: !folder.isExpanded }
        : folder
    ));
  };

  const quickLinks = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'LaunchFlow', icon: Rocket, path: '/launchflow' },
    { name: 'All Projects', icon: Folder, path: '/projects' },
    { name: 'Brand Settings', icon: FileText, path: '/brand-settings' }
  ];

  return (
    <div className="w-64 h-screen bg-slate-900 text-slate-100 flex flex-col border-r border-slate-800">
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-white">
            P
          </div>
          <div>
            <div className="font-semibold text-sm">Product Control</div>
            <div className="text-xs text-slate-400">Workspace</div>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          <div className="mb-4">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition-colors
                    ${isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="border-t border-slate-800 pt-4 mt-4">
            <div className="px-3 mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Projects
              </span>
              <button className="p-1 hover:bg-slate-800 rounded">
                <Plus className="h-3 w-3 text-slate-400" />
              </button>
            </div>

            {folders.map((folder) => (
              <div key={folder.id} className="mb-1">
                <button
                  onClick={() => toggleFolder(folder.id)}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors text-left"
                >
                  {folder.isExpanded ? (
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  )}
                  <span className="text-lg">{folder.icon}</span>
                  <span className="text-sm font-medium text-slate-200 flex-1">
                    {folder.name}
                  </span>
                </button>

                {folder.isExpanded && folder.children && (
                  <div className="ml-6 mt-1 space-y-1">
                    {folder.children.map((child) => {
                      const isActive = location.pathname === child.path;
                      return (
                        <Link
                          key={child.id}
                          to={child.path || '#'}
                          className={`
                            flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors
                            ${isActive
                              ? 'bg-slate-800 text-blue-400'
                              : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                            }
                          `}
                        >
                          <span className="text-sm">{child.icon}</span>
                          <span className="text-sm flex-1">{child.name}</span>
                          {child.count !== undefined && (
                            <span className="text-xs text-slate-500">{child.count}</span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-slate-800">
        <Link
          to="/integrations"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <Database className="h-4 w-4" />
          <span className="text-sm">Integrations</span>
        </Link>
        <Link
          to="/revenue"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors mt-1"
        >
          <span className="text-sm">💰</span>
          <span className="text-sm">Revenue Goals</span>
        </Link>
      </div>
    </div>
  );
}
