import { BrandManager } from '@/components/brand/BrandManager';

export default function BrandSettings() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Brand Settings</h1>
      <BrandManager />
    </div>
  );
}
