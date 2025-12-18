import { useState, useRef } from 'react';
import { Upload, FileSpreadsheet, Link2, Check, AlertCircle, X } from 'lucide-react';

interface ImportedPrompt {
  prompt_text: string;
  category?: string;
  style?: string;
  ai_model?: string;
  parameters?: Record<string, any>;
  generated_image_url?: string;
}

interface ImportResult {
  success: boolean;
  imported: number;
  failed: number;
  errors: string[];
  prompts: ImportedPrompt[];
}

interface DataImporterProps {
  onImportComplete?: (prompts: ImportedPrompt[]) => void;
}

export function DataImporter({ onImportComplete }: DataImporterProps) {
  const [importType, setImportType] = useState<'csv' | 'google-sheets' | 'notion' | 'airtable'>('csv');
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [urlInput, setUrlInput] = useState('');
  const [apiKey, setApiKey] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseCSV = (text: string): ImportedPrompt[] => {
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length === 0) return [];

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const prompts: ImportedPrompt[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      const prompt: ImportedPrompt = {
        prompt_text: ''
      };

      headers.forEach((header, index) => {
        const value = values[index] || '';

        if (header.includes('prompt') || header.includes('text') || header.includes('description')) {
          prompt.prompt_text = value;
        } else if (header.includes('category') || header.includes('type')) {
          prompt.category = value;
        } else if (header.includes('style')) {
          prompt.style = value;
        } else if (header.includes('model') || header.includes('ai')) {
          prompt.ai_model = value;
        } else if (header.includes('url') || header.includes('image')) {
          prompt.generated_image_url = value;
        } else if (value) {
          if (!prompt.parameters) prompt.parameters = {};
          prompt.parameters[header] = value;
        }
      });

      if (prompt.prompt_text) {
        prompts.push(prompt);
      }
    }

    return prompts;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setImportResult(null);

    try {
      const text = await file.text();
      const prompts = parseCSV(text);

      if (prompts.length === 0) {
        setImportResult({
          success: false,
          imported: 0,
          failed: 0,
          errors: ['No valid prompts found in the file. Make sure your CSV has a column with "prompt" or "text" in the header.'],
          prompts: []
        });
      } else {
        setImportResult({
          success: true,
          imported: prompts.length,
          failed: 0,
          errors: [],
          prompts
        });

        if (onImportComplete) {
          onImportComplete(prompts);
        }
      }
    } catch (error) {
      setImportResult({
        success: false,
        imported: 0,
        failed: 1,
        errors: ['Failed to parse CSV file. Please check the file format.'],
        prompts: []
      });
    } finally {
      setIsImporting(false);
    }
  };

  const handleGoogleSheetsImport = async () => {
    if (!urlInput.trim()) {
      alert('Please enter a Google Sheets URL');
      return;
    }

    setIsImporting(true);
    setImportResult(null);

    try {
      let sheetId = '';
      let gid = '0';

      const urlMatch = urlInput.match(/\/d\/([a-zA-Z0-9-_]+)/);
      if (urlMatch) {
        sheetId = urlMatch[1];
      }

      const gidMatch = urlInput.match(/gid=([0-9]+)/);
      if (gidMatch) {
        gid = gidMatch[1];
      }

      if (!sheetId) {
        throw new Error('Invalid Google Sheets URL');
      }

      const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
      const response = await fetch(csvUrl);

      if (!response.ok) {
        throw new Error('Failed to fetch Google Sheets. Make sure the sheet is publicly accessible.');
      }

      const text = await response.text();
      const prompts = parseCSV(text);

      if (prompts.length === 0) {
        setImportResult({
          success: false,
          imported: 0,
          failed: 0,
          errors: ['No valid prompts found. Make sure your sheet has a column with "prompt" or "text" in the header.'],
          prompts: []
        });
      } else {
        setImportResult({
          success: true,
          imported: prompts.length,
          failed: 0,
          errors: [],
          prompts
        });

        if (onImportComplete) {
          onImportComplete(prompts);
        }
      }
    } catch (error) {
      setImportResult({
        success: false,
        imported: 0,
        failed: 1,
        errors: [error instanceof Error ? error.message : 'Failed to import from Google Sheets'],
        prompts: []
      });
    } finally {
      setIsImporting(false);
      setUrlInput('');
    }
  };

  const handleNotionImport = async () => {
    if (!urlInput.trim() || !apiKey.trim()) {
      alert('Please enter both Notion page URL and API key');
      return;
    }

    setIsImporting(true);
    setImportResult(null);

    try {
      const pageIdMatch = urlInput.match(/([a-f0-9]{32})/);
      if (!pageIdMatch) {
        throw new Error('Invalid Notion page URL');
      }

      const pageId = pageIdMatch[1];

      const response = await fetch(`https://api.notion.com/v1/blocks/${pageId}/children`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Notion-Version': '2022-06-28'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch Notion page. Check your API key and page permissions.');
      }

      const data = await response.json();
      const prompts: ImportedPrompt[] = [];

      data.results?.forEach((block: any) => {
        if (block.type === 'paragraph' && block.paragraph?.rich_text?.[0]?.plain_text) {
          const text = block.paragraph.rich_text[0].plain_text;
          if (text.length > 10) {
            prompts.push({
              prompt_text: text,
              ai_model: 'midjourney'
            });
          }
        } else if (block.type === 'bulleted_list_item' && block.bulleted_list_item?.rich_text?.[0]?.plain_text) {
          const text = block.bulleted_list_item.rich_text[0].plain_text;
          if (text.length > 10) {
            prompts.push({
              prompt_text: text,
              ai_model: 'midjourney'
            });
          }
        }
      });

      if (prompts.length === 0) {
        setImportResult({
          success: false,
          imported: 0,
          failed: 0,
          errors: ['No valid prompts found in the Notion page. Make sure the page contains text blocks.'],
          prompts: []
        });
      } else {
        setImportResult({
          success: true,
          imported: prompts.length,
          failed: 0,
          errors: [],
          prompts
        });

        if (onImportComplete) {
          onImportComplete(prompts);
        }
      }
    } catch (error) {
      setImportResult({
        success: false,
        imported: 0,
        failed: 1,
        errors: [error instanceof Error ? error.message : 'Failed to import from Notion'],
        prompts: []
      });
    } finally {
      setIsImporting(false);
      setUrlInput('');
      setApiKey('');
    }
  };

  const handleAirtableImport = async () => {
    if (!urlInput.trim() || !apiKey.trim()) {
      alert('Please enter both Airtable base URL and API key');
      return;
    }

    setIsImporting(true);
    setImportResult(null);

    try {
      const baseMatch = urlInput.match(/app([a-zA-Z0-9]+)/);
      const tableMatch = urlInput.match(/tbl([a-zA-Z0-9]+)/);

      if (!baseMatch || !tableMatch) {
        throw new Error('Invalid Airtable URL. Make sure you copy the full URL from your Airtable base.');
      }

      const baseId = 'app' + baseMatch[1];
      const tableId = 'tbl' + tableMatch[1];

      const response = await fetch(
        `https://api.airtable.com/v0/${baseId}/${tableId}`,
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch Airtable data. Check your API key and permissions.');
      }

      const data = await response.json();
      const prompts: ImportedPrompt[] = [];

      data.records?.forEach((record: any) => {
        const fields = record.fields;
        const promptText = fields.Prompt || fields.prompt || fields.Text || fields.text ||
                          fields.Description || fields.description || '';

        if (promptText) {
          prompts.push({
            prompt_text: promptText,
            category: fields.Category || fields.category || fields.Type || fields.type,
            style: fields.Style || fields.style,
            ai_model: fields.Model || fields.model || fields.AI || 'midjourney',
            generated_image_url: fields.Image || fields.image || fields.URL || fields.url,
            parameters: {
              ...fields
            }
          });
        }
      });

      if (prompts.length === 0) {
        setImportResult({
          success: false,
          imported: 0,
          failed: 0,
          errors: ['No valid prompts found in Airtable. Make sure your table has a "Prompt" or "Text" field.'],
          prompts: []
        });
      } else {
        setImportResult({
          success: true,
          imported: prompts.length,
          failed: 0,
          errors: [],
          prompts
        });

        if (onImportComplete) {
          onImportComplete(prompts);
        }
      }
    } catch (error) {
      setImportResult({
        success: false,
        imported: 0,
        failed: 1,
        errors: [error instanceof Error ? error.message : 'Failed to import from Airtable'],
        prompts: []
      });
    } finally {
      setIsImporting(false);
      setUrlInput('');
      setApiKey('');
    }
  };

  const handleImport = () => {
    switch (importType) {
      case 'google-sheets':
        handleGoogleSheetsImport();
        break;
      case 'notion':
        handleNotionImport();
        break;
      case 'airtable':
        handleAirtableImport();
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setImportType('csv')}
          className={`p-4 rounded-lg border-2 transition-all ${
            importType === 'csv'
              ? 'border-blue-600 bg-blue-50'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <FileSpreadsheet className="h-8 w-8 mx-auto mb-2 text-green-600" />
          <div className="font-semibold text-slate-900">CSV File</div>
          <div className="text-xs text-slate-600 mt-1">Upload spreadsheet</div>
        </button>

        <button
          onClick={() => setImportType('google-sheets')}
          className={`p-4 rounded-lg border-2 transition-all ${
            importType === 'google-sheets'
              ? 'border-blue-600 bg-blue-50'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <FileSpreadsheet className="h-8 w-8 mx-auto mb-2 text-green-600" />
          <div className="font-semibold text-slate-900">Google Sheets</div>
          <div className="text-xs text-slate-600 mt-1">Import via link</div>
        </button>

        <button
          onClick={() => setImportType('notion')}
          className={`p-4 rounded-lg border-2 transition-all ${
            importType === 'notion'
              ? 'border-blue-600 bg-blue-50'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="text-3xl mb-2">⚡</div>
          <div className="font-semibold text-slate-900">Notion</div>
          <div className="text-xs text-slate-600 mt-1">Import from page</div>
        </button>

        <button
          onClick={() => setImportType('airtable')}
          className={`p-4 rounded-lg border-2 transition-all ${
            importType === 'airtable'
              ? 'border-blue-600 bg-blue-50'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="text-3xl mb-2">🔷</div>
          <div className="font-semibold text-slate-900">Airtable</div>
          <div className="text-xs text-slate-600 mt-1">Import from base</div>
        </button>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        {importType === 'csv' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Upload CSV File</h3>
              <p className="text-sm text-slate-600 mb-4">
                Your CSV should have a column named "prompt" or "text" containing the AI prompts.
                Additional columns like "category", "style", and "model" will be imported automatically.
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isImporting}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <Upload className="h-5 w-5" />
              {isImporting ? 'Importing...' : 'Choose CSV File'}
            </button>

            <div className="bg-slate-50 rounded-lg p-4">
              <h4 className="font-medium text-slate-900 mb-2">Example CSV Format:</h4>
              <pre className="text-xs text-slate-700 font-mono">
{`prompt,category,style,model
"A majestic lion in the savanna",animals,realistic,midjourney
"Abstract geometric pattern",design,modern,dalle
"Vintage coffee shop interior",places,retro,stable-diffusion`}
              </pre>
            </div>
          </div>
        )}

        {importType === 'google-sheets' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Import from Google Sheets</h3>
              <p className="text-sm text-slate-600 mb-4">
                Make sure your Google Sheet is publicly accessible (Share → Anyone with the link can view).
                The sheet should have headers in the first row.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Google Sheets URL
              </label>
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://docs.google.com/spreadsheets/d/..."
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              onClick={handleImport}
              disabled={isImporting || !urlInput.trim()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <Link2 className="h-5 w-5" />
              {isImporting ? 'Importing...' : 'Import from Google Sheets'}
            </button>
          </div>
        )}

        {importType === 'notion' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Import from Notion</h3>
              <p className="text-sm text-slate-600 mb-4">
                You'll need a Notion API key. Create one at notion.so/my-integrations and share the page with your integration.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Notion Page URL
              </label>
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://www.notion.so/..."
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Notion API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="secret_..."
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              onClick={handleImport}
              disabled={isImporting || !urlInput.trim() || !apiKey.trim()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <Link2 className="h-5 w-5" />
              {isImporting ? 'Importing...' : 'Import from Notion'}
            </button>
          </div>
        )}

        {importType === 'airtable' && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-900 mb-2">Import from Airtable</h3>
              <p className="text-sm text-slate-600 mb-4">
                You'll need an Airtable API key. Find it in your Account settings under API section.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Airtable Base URL
              </label>
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://airtable.com/app.../tbl..."
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Airtable API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="key..."
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              onClick={handleImport}
              disabled={isImporting || !urlInput.trim() || !apiKey.trim()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <Link2 className="h-5 w-5" />
              {isImporting ? 'Importing...' : 'Import from Airtable'}
            </button>
          </div>
        )}
      </div>

      {importResult && (
        <div className={`rounded-lg border-2 p-4 ${
          importResult.success ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
        }`}>
          <div className="flex items-start gap-3">
            {importResult.success ? (
              <Check className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <h4 className={`font-semibold ${importResult.success ? 'text-green-900' : 'text-red-900'}`}>
                {importResult.success ? 'Import Successful' : 'Import Failed'}
              </h4>
              <p className={`text-sm mt-1 ${importResult.success ? 'text-green-700' : 'text-red-700'}`}>
                {importResult.success
                  ? `Successfully imported ${importResult.imported} prompt${importResult.imported !== 1 ? 's' : ''}`
                  : importResult.errors.join('. ')}
              </p>
              {importResult.success && importResult.prompts.length > 0 && (
                <div className="mt-3 space-y-1">
                  <p className="text-xs font-medium text-green-900">Preview:</p>
                  {importResult.prompts.slice(0, 3).map((prompt, idx) => (
                    <div key={idx} className="text-xs text-green-700 bg-white rounded px-2 py-1">
                      {prompt.prompt_text.substring(0, 100)}...
                    </div>
                  ))}
                  {importResult.prompts.length > 3 && (
                    <p className="text-xs text-green-700">
                      + {importResult.prompts.length - 3} more prompts
                    </p>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={() => setImportResult(null)}
              className="p-1 hover:bg-white rounded"
            >
              <X className="h-4 w-4 text-slate-400" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
