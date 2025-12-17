import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Upload } from 'lucide-react';

interface Brand {
  id: string;
  brand_name: string;
  tagline: string;
  logo_url: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  font_family: string;
  voice_tone: string;
  target_audience: string;
}

export function BrandManager() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState({
    brand_name: '',
    tagline: '',
    logo_url: '',
    primary_color: '#3B82F6',
    secondary_color: '#8B5CF6',
    accent_color: '#10B981',
    font_family: 'Inter',
    voice_tone: '',
    target_audience: ''
  });

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    // TODO: Fetch from Supabase
    setBrands([]);
  };

  const handleCreate = () => {
    setFormData({
      brand_name: '',
      tagline: '',
      logo_url: '',
      primary_color: '#3B82F6',
      secondary_color: '#8B5CF6',
      accent_color: '#10B981',
      font_family: 'Inter',
      voice_tone: '',
      target_audience: ''
    });
    setIsCreating(true);
    setIsEditing(false);
  };

  const handleEdit = (brand: Brand) => {
    setFormData(brand);
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleSave = async () => {
    console.log('Saving brand:', formData);
    // TODO: Save to Supabase
    setIsCreating(false);
    setIsEditing(false);
    loadBrands();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this brand?')) {
      console.log('Deleting brand:', id);
      // TODO: Delete from Supabase
      loadBrands();
    }
  };

  const handleCancel = () => {
    setIsCreating(false);
    setIsEditing(false);
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const fontOptions = [
    'Inter',
    'Roboto',
    'Open Sans',
    'Lato',
    'Montserrat',
    'Poppins',
    'Playfair Display',
    'Merriweather'
  ];

  const voiceTones = [
    'Professional',
    'Casual',
    'Friendly',
    'Bold',
    'Playful',
    'Sophisticated',
    'Authoritative',
    'Inspirational'
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Brand Management</h2>
          <p className="text-slate-600 mt-1">Create and manage your brand identities</p>
        </div>
        {!isCreating && !isEditing && (
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Create Brand
          </button>
        )}
      </div>

      {(isCreating || isEditing) && (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-slate-900">
              {isCreating ? 'Create New Brand' : 'Edit Brand'}
            </h3>
            <button
              onClick={handleCancel}
              className="p-2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Brand Name *
                </label>
                <input
                  type="text"
                  value={formData.brand_name}
                  onChange={(e) => updateField('brand_name', e.target.value)}
                  placeholder="Enter brand name"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Tagline
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => updateField('tagline', e.target.value)}
                  placeholder="Your brand tagline"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Logo URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.logo_url}
                  onChange={(e) => updateField('logo_url', e.target.value)}
                  placeholder="https://example.com/logo.png"
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload
                </button>
              </div>
              {formData.logo_url && (
                <div className="mt-2 p-4 bg-slate-50 rounded-lg">
                  <img
                    src={formData.logo_url}
                    alt="Brand logo preview"
                    className="h-16 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 mb-3">
                Brand Colors
              </label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-slate-600 mb-2">Primary Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={formData.primary_color}
                      onChange={(e) => updateField('primary_color', e.target.value)}
                      className="w-12 h-12 rounded border border-slate-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.primary_color}
                      onChange={(e) => updateField('primary_color', e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-2">Secondary Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={formData.secondary_color}
                      onChange={(e) => updateField('secondary_color', e.target.value)}
                      className="w-12 h-12 rounded border border-slate-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.secondary_color}
                      onChange={(e) => updateField('secondary_color', e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-600 mb-2">Accent Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={formData.accent_color}
                      onChange={(e) => updateField('accent_color', e.target.value)}
                      className="w-12 h-12 rounded border border-slate-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formData.accent_color}
                      onChange={(e) => updateField('accent_color', e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Font Family
              </label>
              <select
                value={formData.font_family}
                onChange={(e) => updateField('font_family', e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {fontOptions.map(font => (
                  <option key={font} value={font}>{font}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Voice & Tone
                </label>
                <select
                  value={formData.voice_tone}
                  onChange={(e) => updateField('voice_tone', e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select tone...</option>
                  {voiceTones.map(tone => (
                    <option key={tone} value={tone}>{tone}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Target Audience
                </label>
                <input
                  type="text"
                  value={formData.target_audience}
                  onChange={(e) => updateField('target_audience', e.target.value)}
                  placeholder="e.g., Young professionals 25-35"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <h4 className="text-sm font-medium text-slate-900 mb-3">Preview</h4>
              <div className="flex items-center gap-4">
                <div
                  className="w-24 h-24 rounded-lg"
                  style={{ backgroundColor: formData.primary_color }}
                />
                <div
                  className="w-24 h-24 rounded-lg"
                  style={{ backgroundColor: formData.secondary_color }}
                />
                <div
                  className="w-24 h-24 rounded-lg"
                  style={{ backgroundColor: formData.accent_color }}
                />
                <div className="flex-1">
                  <div
                    style={{ fontFamily: formData.font_family, color: formData.primary_color }}
                    className="text-2xl font-bold mb-1"
                  >
                    {formData.brand_name || 'Brand Name'}
                  </div>
                  <div className="text-sm text-slate-600">
                    {formData.tagline || 'Your tagline here'}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Save className="h-4 w-4" />
                Save Brand
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {!isCreating && !isEditing && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {brands.length === 0 ? (
            <div className="col-span-full bg-white rounded-lg border border-slate-200 p-12 text-center">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No Brands Yet</h3>
              <p className="text-slate-600 mb-6">
                Create your first brand to start generating products and assets
              </p>
              <button
                onClick={handleCreate}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="h-5 w-5" />
                Create Your First Brand
              </button>
            </div>
          ) : (
            brands.map(brand => (
              <div
                key={brand.id}
                className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
              >
                {brand.logo_url && (
                  <img
                    src={brand.logo_url}
                    alt={brand.brand_name}
                    className="h-16 object-contain mb-4"
                  />
                )}
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  {brand.brand_name}
                </h3>
                <p className="text-sm text-slate-600 mb-4">{brand.tagline}</p>

                <div className="flex gap-2 mb-4">
                  <div
                    className="w-8 h-8 rounded"
                    style={{ backgroundColor: brand.primary_color }}
                    title={brand.primary_color}
                  />
                  <div
                    className="w-8 h-8 rounded"
                    style={{ backgroundColor: brand.secondary_color }}
                    title={brand.secondary_color}
                  />
                  <div
                    className="w-8 h-8 rounded"
                    style={{ backgroundColor: brand.accent_color}}
                    title={brand.accent_color}
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(brand)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200"
                  >
                    <Edit2 className="h-4 w-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(brand.id)}
                    className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
