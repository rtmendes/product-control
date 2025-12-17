import { BrandGuidelinesManager } from '@/components/brand/BrandGuidelinesManager';

export default function BrandSettings() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Brand Settings</h1>
        <BrandGuidelinesManager />
      </div>
    </div>
  );
}
