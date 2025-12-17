import { AssetGallery } from '@/components/assets/AssetGallery';

export default function AssetLibrary() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Asset Library</h1>
        <p className="text-slate-600 mt-2">Browse and manage your AI-generated assets</p>
      </div>
      <AssetGallery />
    </div>
  );
}
