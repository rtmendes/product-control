import { useState } from 'react';
import { Plus } from 'lucide-react';
import { AssetGallery } from '@/components/assets/AssetGallery';
import { UniversalUploader } from '@/components/upload/UniversalUploader';

export default function AssetLibrary() {
  const [showUploader, setShowUploader] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Asset Library</h1>
          <p className="text-slate-600 mt-2">Upload and manage all your media assets</p>
        </div>
        <button
          onClick={() => setShowUploader(!showUploader)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          {showUploader ? 'Hide Uploader' : 'Upload Assets'}
        </button>
      </div>

      {showUploader && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <UniversalUploader
            onFilesUploaded={(files) => {
              console.log('Files uploaded:', files);
              setShowUploader(false);
            }}
          />
        </div>
      )}

      <AssetGallery />
    </div>
  );
}
