import { useState } from 'react';
import { BrandManager } from '@/components/brand/BrandManager';
import { CanvaBrandKit } from '@/components/brand/CanvaBrandKit';

export default function BrandSettings() {
  const [view, setView] = useState<'manager' | 'kit'>('kit');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Brand Settings</h1>
        <div className="flex items-center gap-2 bg-slate-200 rounded-lg p-1">
          <button
            onClick={() => setView('kit')}
            className={`px-4 py-2 rounded ${
              view === 'kit'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Brand Kit
          </button>
          <button
            onClick={() => setView('manager')}
            className={`px-4 py-2 rounded ${
              view === 'manager'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Brand Manager
          </button>
        </div>
      </div>

      {view === 'kit' ? (
        <CanvaBrandKit brandId="default" />
      ) : (
        <BrandManager />
      )}
    </div>
  );
}
