import { useState, useEffect } from 'react';
import { Search, Download, Eye, Trash2, Grid, List } from 'lucide-react';

interface Asset {
  id: string;
  title: string;
  type: string;
  subtype: string;
  url: string;
  thumbnail_url: string;
  created_at: string;
  brand_id: string;
  product_id: string;
}

export function AssetGallery() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const assetTypes = [
    { value: 'all', label: 'All Assets', icon: '📦' },
    { value: 'image', label: 'Images', icon: '🖼️' },
    { value: 'copy', label: 'Copywriting', icon: '✍️' },
    { value: 'video', label: 'Videos', icon: '🎬' },
    { value: 'mockup', label: 'Mockups', icon: '👕' }
  ];

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    // TODO: Fetch from Supabase
    setAssets([]);
  };

  const filteredAssets = assets.filter(asset => {
    const matchesType = selectedType === 'all' || asset.type === selectedType;
    const matchesSearch = asset.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleDownload = async (asset: Asset) => {
    console.log('Downloading:', asset);
    // TODO: Implement download
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this asset?')) {
      console.log('Deleting:', id);
      // TODO: Delete from Supabase
      loadAssets();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search assets..."
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${
              viewMode === 'grid'
                ? 'bg-blue-100 text-blue-600'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Grid className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${
              viewMode === 'list'
                ? 'bg-blue-100 text-blue-600'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {assetTypes.map(type => (
          <button
            key={type.value}
            onClick={() => setSelectedType(type.value)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors
              ${selectedType === type.value
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }
            `}
          >
            <span>{type.icon}</span>
            <span className="font-medium">{type.label}</span>
          </button>
        ))}
      </div>

      {filteredAssets.length === 0 ? (
        <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
          <div className="text-6xl mb-4">📸</div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            {assets.length === 0 ? 'No Assets Yet' : 'No Matching Assets'}
          </h3>
          <p className="text-slate-600 mb-6">
            {assets.length === 0
              ? 'Start creating products to generate AI-powered images, copy, and other marketing assets.'
              : 'Try adjusting your filters or search query.'}
          </p>
          {assets.length === 0 && (
            <a
              href="/create-product"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              Create Your First Product
            </a>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredAssets.map(asset => (
            <div
              key={asset.id}
              className="group bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square bg-slate-100 relative overflow-hidden">
                {asset.type === 'image' || asset.type === 'mockup' ? (
                  <img
                    src={asset.thumbnail_url || asset.url}
                    alt={asset.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">
                    {asset.type === 'copy' ? '✍️' : asset.type === 'video' ? '🎬' : '📄'}
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => setSelectedAsset(asset)}
                    className="p-2 bg-white rounded-lg hover:bg-slate-100"
                  >
                    <Eye className="h-5 w-5 text-slate-700" />
                  </button>
                  <button
                    onClick={() => handleDownload(asset)}
                    className="p-2 bg-white rounded-lg hover:bg-slate-100"
                  >
                    <Download className="h-5 w-5 text-slate-700" />
                  </button>
                  <button
                    onClick={() => handleDelete(asset.id)}
                    className="p-2 bg-white rounded-lg hover:bg-slate-100"
                  >
                    <Trash2 className="h-5 w-5 text-red-600" />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-medium text-slate-900 truncate mb-1">{asset.title}</h4>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{asset.subtype}</span>
                  <span>{new Date(asset.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase">
                  Asset
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase">
                  Type
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase">
                  Created
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-slate-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredAssets.map(asset => (
                <tr key={asset.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-slate-100 rounded overflow-hidden flex-shrink-0">
                        {asset.type === 'image' || asset.type === 'mockup' ? (
                          <img
                            src={asset.thumbnail_url || asset.url}
                            alt={asset.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl">
                            {asset.type === 'copy' ? '✍️' : '🎬'}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">{asset.title}</div>
                        <div className="text-sm text-slate-500">{asset.subtype}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 capitalize">
                    {asset.type}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(asset.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedAsset(asset)}
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDownload(asset)}
                        className="p-2 text-slate-600 hover:bg-slate-100 rounded"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(asset.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedAsset && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedAsset(null)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{selectedAsset.title}</h3>
                  <p className="text-slate-600 mt-1">{selectedAsset.subtype}</p>
                </div>
                <button
                  onClick={() => setSelectedAsset(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              </div>

              <div className="bg-slate-100 rounded-lg p-8 mb-4">
                {selectedAsset.type === 'image' || selectedAsset.type === 'mockup' ? (
                  <img
                    src={selectedAsset.url}
                    alt={selectedAsset.title}
                    className="w-full rounded"
                  />
                ) : selectedAsset.type === 'copy' ? (
                  <div className="bg-white p-6 rounded-lg">
                    <p className="whitespace-pre-wrap">{selectedAsset.url}</p>
                  </div>
                ) : (
                  <div className="text-center text-slate-600">Preview not available</div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleDownload(selectedAsset)}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Download className="h-5 w-5" />
                  Download
                </button>
                <button
                  onClick={() => {
                    handleDelete(selectedAsset.id);
                    setSelectedAsset(null);
                  }}
                  className="px-6 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
