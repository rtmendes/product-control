import { useState } from 'react';
import { Image, Palette, Type, MessageSquare, ImageIcon, Shapes, Smile, PieChart, Plus, Link2, Upload } from 'lucide-react';
import { DragDropUploader } from '@/components/upload/DragDropUploader';
import { ColorPicker } from '@/components/brand/ColorPicker';

interface BrandAssetCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  assets: any[];
}

interface CanvaBrandKitProps {
  brandId: string;
  onSave?: (data: any) => void;
}

export function CanvaBrandKit({ onSave }: CanvaBrandKitProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCanvaEmbed, setShowCanvaEmbed] = useState(false);
  const [canvaUrl, setCanvaUrl] = useState('');
  const [brandColors, setBrandColors] = useState<string[]>(['#3B82F6', '#8B5CF6', '#10B981']);
  const [brandVoice, setBrandVoice] = useState('');
  const [categories] = useState<BrandAssetCategory[]>([
    { id: 'logos', name: 'Logos', icon: <Image className="h-6 w-6" />, color: 'bg-purple-100 text-purple-700', assets: [] },
    { id: 'colors', name: 'Colors', icon: <Palette className="h-6 w-6" />, color: 'bg-orange-100 text-orange-700', assets: [] },
    { id: 'fonts', name: 'Fonts', icon: <Type className="h-6 w-6" />, color: 'bg-green-100 text-green-700', assets: [] },
    { id: 'brand-voice', name: 'Brand voice', icon: <MessageSquare className="h-6 w-6" />, color: 'bg-purple-100 text-purple-700', assets: [] },
    { id: 'photos', name: 'Photos', icon: <ImageIcon className="h-6 w-6" />, color: 'bg-green-100 text-green-700', assets: [] },
    { id: 'graphics', name: 'Graphics', icon: <Shapes className="h-6 w-6" />, color: 'bg-orange-100 text-orange-700', assets: [] },
    { id: 'icons', name: 'Icons', icon: <Smile className="h-6 w-6" />, color: 'bg-purple-100 text-purple-700', assets: [] },
    { id: 'charts', name: 'Charts', icon: <PieChart className="h-6 w-6" />, color: 'bg-orange-100 text-orange-700', assets: [] },
  ]);

  const handleFileUpload = (files: File[]) => {
    console.log('Uploaded files:', files);
  };

  const handleColorChange = (colors: string[]) => {
    setBrandColors(colors);
    if (onSave) {
      onSave({ brand_colors: colors });
    }
  };

  const renderCategoryContent = () => {
    if (!selectedCategory) return null;

    const category = categories.find(c => c.id === selectedCategory);
    if (!category) return null;

    if (selectedCategory === 'colors') {
      return (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Brand Colors</h3>
            <ColorPicker colors={brandColors} onChange={handleColorChange} maxColors={12} />
          </div>
        </div>
      );
    }

    if (selectedCategory === 'brand-voice') {
      return (
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Brand Voice & Tone</h3>
            <p className="text-sm text-slate-600 mb-4">
              Define your brand's personality, tone, and communication style.
            </p>
            <textarea
              value={brandVoice}
              onChange={(e) => setBrandVoice(e.target.value)}
              placeholder="Example: Professional yet approachable, innovative with a human touch, confident but not arrogant..."
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[200px] resize-y"
            />
            <div className="mt-4 flex gap-2 flex-wrap">
              {['Professional', 'Friendly', 'Bold', 'Playful', 'Sophisticated', 'Inspirational'].map(tone => (
                <button
                  key={tone}
                  onClick={() => setBrandVoice(prev => prev ? `${prev}, ${tone}` : tone)}
                  className="px-3 py-1.5 text-sm bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200"
                >
                  + {tone}
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {category.assets.length === 0 ? (
          <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg mb-4 bg-slate-100">
              {category.icon}
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Stay on brand, your way
            </h3>
            <p className="text-slate-600 mb-6">
              Add brand assets or guidelines for consistency across designs. Rename this category as you wish.
            </p>
            <button
              onClick={() => {}}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              <Upload className="h-5 w-5" />
              Add brand assets
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {category.assets.map((asset, index) => (
              <div key={index} className="bg-white rounded-lg border border-slate-200 p-4">
                <p>{asset.name}</p>
              </div>
            ))}
          </div>
        )}

        <DragDropUploader
          onUpload={handleFileUpload}
          category={category.id}
          maxFiles={50}
        />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Brand Kit</h2>
          <p className="text-slate-600 mt-1">Organize your brand assets in one place</p>
        </div>
        <button
          onClick={() => setShowCanvaEmbed(!showCanvaEmbed)}
          className="flex items-center gap-2 px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
        >
          <Link2 className="h-4 w-4" />
          Import from Canva
        </button>
      </div>

      {showCanvaEmbed && (
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Import Canva Brand Kit</h3>
          <p className="text-sm text-slate-600 mb-4">
            Paste your Canva Brand Kit URL or embed code to import all your brand assets automatically.
          </p>
          <div className="flex gap-3">
            <input
              type="text"
              value={canvaUrl}
              onChange={(e) => setCanvaUrl(e.target.value)}
              placeholder="https://canva.com/brand/..."
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Import
            </button>
          </div>
          {canvaUrl && canvaUrl.includes('canva.com') && (
            <div className="mt-4 border border-slate-200 rounded-lg overflow-hidden">
              <iframe
                src={canvaUrl}
                className="w-full h-96"
                title="Canva Brand Kit"
              />
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`relative bg-white rounded-xl border-2 transition-all hover:shadow-lg hover:scale-[1.02] overflow-hidden ${
              selectedCategory === category.id
                ? 'border-blue-500 shadow-lg'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className={`aspect-square flex items-center justify-center ${category.color}`}>
              <div className="text-4xl">{category.icon}</div>
            </div>
            <div className="p-3 text-center">
              <h3 className="font-semibold text-slate-900">{category.name}</h3>
              {category.assets.length > 0 && (
                <p className="text-xs text-slate-500 mt-1">{category.assets.length} assets</p>
              )}
            </div>
          </button>
        ))}

        <button className="relative bg-slate-50 rounded-xl border-2 border-dashed border-slate-300 hover:border-slate-400 transition-all hover:bg-slate-100 aspect-square flex items-center justify-center">
          <div className="text-center">
            <Plus className="h-8 w-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-600">New category</p>
          </div>
        </button>
      </div>

      {selectedCategory && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 capitalize">{selectedCategory.replace('-', ' ')}</h2>
            <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200">
              Add to category
            </button>
          </div>
          {renderCategoryContent()}
        </div>
      )}
    </div>
  );
}
