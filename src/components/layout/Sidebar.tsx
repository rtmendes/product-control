import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Wand2,
  Settings,
  TrendingUp,
  Plug,
  Image
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Create Product', href: '/create-product', icon: Wand2 },
  { name: 'Brand Settings', href: '/brand-settings', icon: Settings },
  { name: 'Revenue Tracker', href: '/revenue', icon: TrendingUp },
  { name: 'Integrations', href: '/integrations', icon: Plug },
  { name: 'Asset Library', href: '/assets', icon: Image },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-screen w-64 flex-col bg-slate-900 text-white">
      <div className="flex h-16 items-center px-6 border-b border-slate-800">
        <h1 className="text-xl font-bold">Product Control</h1>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.href}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                transition-colors
                ${isActive
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }
              `}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <p className="text-xs text-slate-400">Multi-Brand POD Platform</p>
      </div>
    </div>
  );
}
