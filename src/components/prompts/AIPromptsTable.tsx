import { useState, useEffect } from 'react';
import { Plus, Trash2, Download, Eye, Wand2, Image as ImageIcon } from 'lucide-react';

interface AIPrompt {
  id: string;
  prompt_text: string;
  category: string;
  style: string;
  parameters: any;
  generated_image_url: string | null;
  status: 'pending' | 'generating' | 'completed' | 'failed';
  ai_model: string;
  created_at: string;
}

export function AIPromptsTable() {
  const [prompts, setPrompts] = useState<AIPrompt[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    loadPrompts();
  }, []);

  const loadPrompts = async () => {
    // TODO: Fetch from Supabase
    setPrompts([]);
  };

  const addNewRow = () => {
    const newPrompt: AIPrompt = {
      id: `temp-${Date.now()}`,
      prompt_text: '',
      category: '',
      style: '',
      parameters: {},
      generated_image_url: null,
      status: 'pending',
      ai_model: 'midjourney',
      created_at: new Date().toISOString()
    };
    setPrompts([newPrompt, ...prompts]);
    setEditingId(newPrompt.id);
  };

  const updatePrompt = (id: string, field: keyof AIPrompt, value: any) => {
    setPrompts(prompts.map(p =>
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const deletePrompt = async (id: string) => {
    if (confirm('Delete this prompt?')) {
      setPrompts(prompts.filter(p => p.id !== id));
      // TODO: Delete from Supabase
    }
  };

  const generateImage = async (id: string) => {
    updatePrompt(id, 'status', 'generating');
    // TODO: Call AI image generation API
    setTimeout(() => {
      updatePrompt(id, 'status', 'completed');
      updatePrompt(id, 'generated_image_url', 'https://via.placeholder.com/300');
    }, 2000);
  };

  const categories = ['Character', 'Product', 'Scene', 'Pattern', 'Logo', 'Illustration'];
  const styles = ['3D Render', 'Digital Art', 'Photorealistic', 'Minimalist', 'Watercolor', 'Cartoon'];
  const aiModels = ['midjourney', 'dall-e-3', 'stable-diffusion', 'leonardo-ai'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'generating': return 'bg-blue-100 text-blue-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
        <div>
          <h3 className="font-semibold text-slate-900">AI Image Prompts</h3>
          <p className="text-sm text-slate-600 mt-1">
            {prompts.length} prompts • {prompts.filter(p => p.status === 'completed').length} generated
          </p>
        </div>
        <button
          onClick={addNewRow}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Prompt
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider w-12">
                #
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider min-w-[300px]">
                Prompt
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider w-36">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider w-36">
                Style
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider w-32">
                AI Model
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider w-28">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider w-32">
                Generated
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider w-32">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {prompts.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center">
                  <div className="text-slate-400 mb-2">
                    <ImageIcon className="h-12 w-12 mx-auto mb-3" />
                  </div>
                  <p className="text-slate-600 font-medium mb-1">No prompts yet</p>
                  <p className="text-sm text-slate-500 mb-4">
                    Create your first AI image prompt to get started
                  </p>
                  <button
                    onClick={addNewRow}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4" />
                    Add First Prompt
                  </button>
                </td>
              </tr>
            ) : (
              prompts.map((prompt, index) => (
                <tr
                  key={prompt.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-slate-500">
                    {index + 1}
                  </td>
                  <td className="px-4 py-3">
                    {editingId === prompt.id ? (
                      <textarea
                        value={prompt.prompt_text}
                        onChange={(e) => updatePrompt(prompt.id, 'prompt_text', e.target.value)}
                        onBlur={() => setEditingId(null)}
                        placeholder="Enter your prompt..."
                        className="w-full px-2 py-1 border border-blue-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[60px]"
                        autoFocus
                      />
                    ) : (
                      <div
                        onClick={() => setEditingId(prompt.id)}
                        className="text-sm text-slate-900 cursor-pointer hover:bg-slate-100 px-2 py-1 rounded min-h-[60px]"
                      >
                        {prompt.prompt_text || <span className="text-slate-400">Click to edit...</span>}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={prompt.category}
                      onChange={(e) => updatePrompt(prompt.id, 'category', e.target.value)}
                      className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select...</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={prompt.style}
                      onChange={(e) => updatePrompt(prompt.id, 'style', e.target.value)}
                      className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select...</option>
                      {styles.map(style => (
                        <option key={style} value={style}>{style}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={prompt.ai_model}
                      onChange={(e) => updatePrompt(prompt.id, 'ai_model', e.target.value)}
                      className="w-full px-2 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {aiModels.map(model => (
                        <option key={model} value={model}>
                          {model.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(prompt.status)}`}>
                      {prompt.status === 'generating' && (
                        <span className="animate-spin mr-1">⚙️</span>
                      )}
                      {prompt.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {prompt.generated_image_url ? (
                      <button
                        onClick={() => setSelectedImage(prompt.generated_image_url)}
                        className="w-16 h-16 rounded overflow-hidden border border-slate-200 hover:border-blue-400 transition-colors"
                      >
                        <img
                          src={prompt.generated_image_url}
                          alt="Generated"
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ) : (
                      <div className="w-16 h-16 rounded bg-slate-100 flex items-center justify-center">
                        <ImageIcon className="h-6 w-6 text-slate-400" />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {prompt.status !== 'generating' && !prompt.generated_image_url && (
                        <button
                          onClick={() => generateImage(prompt.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Generate"
                        >
                          <Wand2 className="h-4 w-4" />
                        </button>
                      )}
                      {prompt.generated_image_url && (
                        <>
                          <button
                            onClick={() => setSelectedImage(prompt.generated_image_url)}
                            className="p-2 text-slate-600 hover:bg-slate-100 rounded"
                            title="View"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <a
                            href={prompt.generated_image_url}
                            download
                            className="p-2 text-slate-600 hover:bg-slate-100 rounded"
                            title="Download"
                          >
                            <Download className="h-4 w-4" />
                          </a>
                        </>
                      )}
                      <button
                        onClick={() => deletePrompt(prompt.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl w-full bg-white rounded-lg p-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage}
              alt="Generated"
              className="w-full h-auto rounded"
            />
            <div className="mt-4 flex gap-3">
              <a
                href={selectedImage}
                download
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Download className="h-4 w-4" />
                Download
              </a>
              <button
                onClick={() => setSelectedImage(null)}
                className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
