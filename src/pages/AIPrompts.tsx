import { useState } from 'react';
import { Upload } from 'lucide-react';
import { AIPromptsTable } from '@/components/prompts/AIPromptsTable';
import { UniversalUploader } from '@/components/upload/UniversalUploader';

export default function AIPrompts() {
  const [showUploader, setShowUploader] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">AI Image Prompts</h1>
          <p className="text-slate-600 mt-2">
            Create and manage AI-generated images for your print-on-demand products
          </p>
        </div>
        <button
          onClick={() => setShowUploader(!showUploader)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
        >
          <Upload className="h-4 w-4" />
          {showUploader ? 'Hide Import' : 'Import Images'}
        </button>
      </div>

      {showUploader && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Import Generated Images</h3>
          <UniversalUploader
            onFilesUploaded={(files) => {
              console.log('Images imported:', files);
              setShowUploader(false);
            }}
            acceptedTypes={['image/*']}
          />
        </div>
      )}

      <AIPromptsTable />
    </div>
  );
}
