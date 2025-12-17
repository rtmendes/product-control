import React from 'react';
import { Link } from 'react-router-dom';
import { Wand2, Settings, TrendingUp, Plug, Image, Package } from 'lucide-react';

export const Overview: React.FC = () => {
  const quickActions = [
    {
      title: 'Create Product',
      description: 'Launch AI-powered product wizard',
      icon: Wand2,
      href: '/create-product',
      color: 'bg-blue-500'
    },
    {
      title: 'Brand Settings',
      description: 'Manage brand guidelines and assets',
      icon: Settings,
      href: '/brand-settings',
      color: 'bg-purple-500'
    },
    {
      title: 'Revenue Tracker',
      description: 'Track sales and set goals',
      icon: TrendingUp,
      href: '/revenue',
      color: 'bg-green-500'
    },
    {
      title: 'Integrations',
      description: 'Connect Shopify, Stripe, and more',
      icon: Plug,
      href: '/integrations',
      color: 'bg-orange-500'
    },
    {
      title: 'Asset Library',
      description: 'Browse generated assets',
      icon: Image,
      href: '/assets',
      color: 'bg-pink-500'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-2">Welcome to your AI-powered product management platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Package className="h-5 w-5 text-blue-600" />
            <h3 className="text-slate-600 font-medium">Total Products</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">0</p>
          <p className="text-sm text-slate-500 mt-1">Across all brands</p>
        </div>

        <div className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Image className="h-5 w-5 text-purple-600" />
            <h3 className="text-slate-600 font-medium">Assets Generated</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">0</p>
          <p className="text-sm text-slate-500 mt-1">Images, copy, and more</p>
        </div>

        <div className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <h3 className="text-slate-600 font-medium">Revenue</h3>
          </div>
          <p className="text-3xl font-bold text-slate-900">$0</p>
          <p className="text-sm text-slate-500 mt-1">Total tracked revenue</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                to={action.href}
                className="group p-6 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-all hover:border-slate-300"
              >
                <div className={`inline-flex p-3 rounded-lg ${action.color} mb-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-slate-600">{action.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Getting Started</h3>
        <p className="text-blue-800 mb-4">
          Start by setting up your first brand in Brand Settings, then use the Product Wizard to create your first product with AI-powered copywriting and asset generation.
        </p>
        <Link
          to="/brand-settings"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Settings className="h-4 w-4" />
          Set Up Your Brand
        </Link>
      </div>
    </div>
  );
};
