import { useState } from 'react';
import { FileSpreadsheet, Image } from 'lucide-react';
import { AIPromptsTable } from '@/components/prompts/AIPromptsTable';
import { UniversalUploader } from '@/components/upload/UniversalUploader';
import { DataImporter } from '@/components/prompts/DataImporter';

type ImportMode = 'images' | 'data' | null;

export default function AIPrompts() {
  const [importMode, setImportMode] = useState<ImportMode>(null);

  const handleDataImport = async (prompts: any[]) => {
    console.log('Importing prompts to database:', prompts);
    setImportMode(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">AI Image Prompts</h1>
          <p className="text-slate-600 mt-2">
            Create and manage AI-generated images for your print-on-demand products
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setImportMode(importMode === 'data' ? null : 'data')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FileSpreadsheet className="h-4 w-4" />
            {importMode === 'data' ? 'Hide Import' : 'Import Data'}
          </button>
          <button
            onClick={() => setImportMode(importMode === 'images' ? null : 'images')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
          >
            <Image className="h-4 w-4" />
            {importMode === 'images' ? 'Hide Images' : 'Import Images'}
          </button>
        </div>
      </div>

      {importMode === 'data' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Import Prompts from Spreadsheets</h3>
            <p className="text-sm text-slate-600">
              Import your AI prompts from CSV files, Google Sheets, Notion pages, or Airtable bases.
              All imported prompts will be saved to your Product Control Database.
            </p>
          </div>
          <DataImporter onImportComplete={handleDataImport} />
        </div>
      )}

      {importMode === 'images' && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Import Generated Images</h3>
            <p className="text-sm text-slate-600">
              Upload AI-generated images from your local files, Google Drive, or any web URL.
            </p>
          </div>
          <UniversalUploader
            onFilesUploaded={(files) => {
              console.log('Images imported:', files);
              setImportMode(null);
            }}
            acceptedTypes={['image/*']}
          />
        </div>
      )}

      <AIPromptsTable />
    </div>
  );
}
