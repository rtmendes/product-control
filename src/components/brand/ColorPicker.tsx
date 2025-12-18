import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Plus, X, Check } from 'lucide-react';

interface ColorPickerProps {
  colors: string[];
  onChange: (colors: string[]) => void;
  maxColors?: number;
}

export function ColorPicker({ colors, onChange, maxColors = 12 }: ColorPickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(null);
  const [currentColor, setCurrentColor] = useState('#3B82F6');

  const addColor = () => {
    if (colors.length < maxColors) {
      onChange([...colors, currentColor]);
      setShowPicker(false);
    }
  };

  const updateColor = (index: number, color: string) => {
    const updated = [...colors];
    updated[index] = color;
    onChange(updated);
  };

  const removeColor = (index: number) => {
    const updated = colors.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleColorClick = (index: number) => {
    setSelectedColorIndex(index);
    setCurrentColor(colors[index]);
    setShowPicker(true);
  };

  const handleSaveColor = () => {
    if (selectedColorIndex !== null) {
      updateColor(selectedColorIndex, currentColor);
    } else {
      addColor();
    }
    setShowPicker(false);
    setSelectedColorIndex(null);
  };

  const presetColors = [
    '#3B82F6', '#8B5CF6', '#EC4899', '#EF4444', '#F59E0B', '#10B981',
    '#06B6D4', '#6366F1', '#A855F7', '#F43F5E', '#F97316', '#84CC16',
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-6 gap-3">
        {colors.map((color, index) => (
          <div key={index} className="group relative">
            <button
              onClick={() => handleColorClick(index)}
              className="w-full aspect-square rounded-lg border-2 border-slate-200 hover:border-slate-300 transition-all hover:scale-105 relative overflow-hidden"
              style={{ backgroundColor: color }}
            >
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
            </button>
            <button
              onClick={() => removeColor(index)}
              className="absolute -top-1 -right-1 p-1 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
            >
              <X className="h-3 w-3 text-slate-600 hover:text-red-600" />
            </button>
            <div className="mt-1 text-center">
              <p className="text-xs font-mono text-slate-600">{color.toUpperCase()}</p>
            </div>
          </div>
        ))}

        {colors.length < maxColors && (
          <button
            onClick={() => {
              setSelectedColorIndex(null);
              setCurrentColor('#3B82F6');
              setShowPicker(true);
            }}
            className="w-full aspect-square rounded-lg border-2 border-dashed border-slate-300 hover:border-slate-400 transition-all hover:scale-105 flex items-center justify-center bg-slate-50 hover:bg-slate-100"
          >
            <Plus className="h-6 w-6 text-slate-400" />
          </button>
        )}
      </div>

      {showPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">
                {selectedColorIndex !== null ? 'Edit Color' : 'Add Color'}
              </h3>
              <button
                onClick={() => {
                  setShowPicker(false);
                  setSelectedColorIndex(null);
                }}
                className="p-1 hover:bg-slate-100 rounded"
              >
                <X className="h-5 w-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-full max-w-xs">
                  <HexColorPicker
                    color={currentColor}
                    onChange={setCurrentColor}
                    style={{ width: '100%', height: '200px' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Hex Color
                </label>
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-lg border-2 border-slate-200"
                    style={{ backgroundColor: currentColor }}
                  />
                  <input
                    type="text"
                    value={currentColor}
                    onChange={(e) => setCurrentColor(e.target.value)}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono uppercase"
                    placeholder="#000000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Quick Colors
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {presetColors.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setCurrentColor(preset)}
                      className={`aspect-square rounded-lg border-2 transition-all hover:scale-110 ${
                        currentColor === preset ? 'border-slate-900 ring-2 ring-blue-500' : 'border-slate-200'
                      }`}
                      style={{ backgroundColor: preset }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSaveColor}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  <Check className="h-4 w-4" />
                  {selectedColorIndex !== null ? 'Update' : 'Add'} Color
                </button>
                <button
                  onClick={() => {
                    setShowPicker(false);
                    setSelectedColorIndex(null);
                  }}
                  className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
