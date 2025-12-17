import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  Palette, 
  Upload, 
  Sparkles, 
  Plus, 
  Trash2, 
  ZoomIn, 
  ZoomOut, 
  Download,
  Maximize2,
  Image as ImageIcon,
  Pipette,
  Type,
  StickyNote
} from 'lucide-react';
import type { BrandingCanvas, BrandingAsset } from '../App';

interface BrandingMoodBoardProps {
  canvas: BrandingCanvas | undefined;
  onChange: (canvas: BrandingCanvas) => void;
}

export function BrandingMoodBoard({ canvas, onChange }: BrandingMoodBoardProps) {
  const [currentCanvas, setCurrentCanvas] = useState<BrandingCanvas>(
    canvas || { assets: [], colorPalette: [], notes: '' }
  );
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onChange(currentCanvas);
  }, [currentCanvas]);

  const addAsset = (asset: Omit<BrandingAsset, 'id'>) => {
    const newAsset: BrandingAsset = {
      ...asset,
      id: Date.now().toString(),
    };
    setCurrentCanvas({
      ...currentCanvas,
      assets: [...currentCanvas.assets, newAsset],
    });
  };

  const updateAsset = (id: string, updates: Partial<BrandingAsset>) => {
    setCurrentCanvas({
      ...currentCanvas,
      assets: currentCanvas.assets.map(a => 
        a.id === id ? { ...a, ...updates } : a
      ),
    });
  };

  const deleteAsset = (id: string) => {
    setCurrentCanvas({
      ...currentCanvas,
      assets: currentCanvas.assets.filter(a => a.id !== id),
    });
    if (selectedAsset === id) {
      setSelectedAsset(null);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        addAsset({
          type: 'uploaded',
          url,
          x: 100 + (index * 50),
          y: 100 + (index * 50),
          width: 300,
          height: 300,
          tags: [],
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const generateAIImage = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation - in production, this would call an actual AI API
    setTimeout(() => {
      // Mock AI-generated image
      const mockImageUrl = `https://source.unsplash.com/400x400/?${encodeURIComponent(aiPrompt)}`;
      
      addAsset({
        type: 'ai-generated',
        url: mockImageUrl,
        x: 150,
        y: 150,
        width: 400,
        height: 400,
        prompt: aiPrompt,
        tags: ['ai-generated'],
      });
      
      setIsGenerating(false);
      setIsAIDialogOpen(false);
      setAiPrompt('');
    }, 2000);
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).classList.contains('canvas-background')) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
      setSelectedAsset(null);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleCanvasMouseUp = () => {
    setIsDragging(false);
  };

  // Drag and Drop handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );

    if (files.length === 0) return;

    const canvasRect = canvasRef.current?.getBoundingClientRect();
    if (!canvasRect) return;

    // Calculate drop position relative to canvas
    const dropX = (e.clientX - canvasRect.left - offset.x) / scale;
    const dropY = (e.clientY - canvasRect.top - offset.y) / scale;

    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        addAsset({
          type: 'uploaded',
          url,
          x: dropX + (index * 20),
          y: dropY + (index * 20),
          width: 300,
          height: 300,
          tags: [],
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const addColorToPalette = (color: string) => {
    if (!currentCanvas.colorPalette?.includes(color)) {
      setCurrentCanvas({
        ...currentCanvas,
        colorPalette: [...(currentCanvas.colorPalette || []), color],
      });
    }
  };

  const removeColorFromPalette = (color: string) => {
    setCurrentCanvas({
      ...currentCanvas,
      colorPalette: currentCanvas.colorPalette?.filter(c => c !== color) || [],
    });
  };

  const zoomIn = () => setScale(Math.min(scale + 0.1, 3));
  const zoomOut = () => setScale(Math.max(scale - 0.1, 0.3));
  const resetView = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Palette className="size-5" />
            Branding & Visual Mood Board
          </CardTitle>
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="size-4 mr-2" />
              Upload Images
            </Button>
            <Dialog open={isAIDialogOpen} onOpenChange={setIsAIDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="default" size="sm">
                  <Sparkles className="size-4 mr-2" />
                  AI Generate
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Generate Image with AI</DialogTitle>
                  <DialogDescription>
                    Use AI to generate images based on your description.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Image Description</Label>
                    <Textarea
                      placeholder="Describe the image you want to generate... (e.g., modern minimalist logo with blue and gold colors, tech startup branding)"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <div className="p-3 bg-blue-50 rounded text-sm text-blue-900">
                    <p className="font-medium mb-1">💡 Prompt Tips:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Be specific about style, colors, and mood</li>
                      <li>Mention artistic style (minimalist, vintage, modern, etc.)</li>
                      <li>Include context (logo, banner, product photo, etc.)</li>
                    </ul>
                  </div>
                  <Button 
                    onClick={generateAIImage} 
                    disabled={!aiPrompt.trim() || isGenerating}
                    className="w-full"
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="size-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="size-4 mr-2" />
                        Generate Image
                      </>
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="canvas" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="canvas">
              <ImageIcon className="size-4 mr-2" />
              Canvas
            </TabsTrigger>
            <TabsTrigger value="colors">
              <Pipette className="size-4 mr-2" />
              Colors
            </TabsTrigger>
            <TabsTrigger value="typography">
              <Type className="size-4 mr-2" />
              Typography
            </TabsTrigger>
          </TabsList>

          <TabsContent value="canvas" className="space-y-4">
            {/* Canvas Controls */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={zoomOut}>
                  <ZoomOut className="size-4" />
                </Button>
                <span className="flex items-center px-3 text-sm">
                  {Math.round(scale * 100)}%
                </span>
                <Button variant="outline" size="sm" onClick={zoomIn}>
                  <ZoomIn className="size-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={resetView}>
                  <Maximize2 className="size-4 mr-2" />
                  Reset View
                </Button>
              </div>
              <Badge variant="secondary">
                {currentCanvas.assets.length} Assets
              </Badge>
            </div>

            {/* Infinite Canvas */}
            <div
              ref={canvasRef}
              className={`canvas-background relative w-full h-[600px] bg-gray-100 rounded-lg overflow-hidden cursor-move border-2 ${
                isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              style={{
                backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              onMouseLeave={handleCanvasMouseUp}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div
                style={{
                  transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                  transformOrigin: '0 0',
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                }}
              >
                {currentCanvas.assets.map((asset) => (
                  <div
                    key={asset.id}
                    className={`absolute cursor-move rounded-lg overflow-hidden shadow-lg ${
                      selectedAsset === asset.id ? 'ring-4 ring-blue-500' : ''
                    }`}
                    style={{
                      left: asset.x,
                      top: asset.y,
                      width: asset.width,
                      height: asset.height,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedAsset(asset.id);
                    }}
                  >
                    <img
                      src={asset.url}
                      alt={asset.prompt || 'Branding asset'}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                    {selectedAsset === asset.id && (
                      <div className="absolute top-2 right-2 flex gap-1">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteAsset(asset.id);
                          }}
                        >
                          <Trash2 className="size-3" />
                        </Button>
                      </div>
                    )}
                    {asset.type === 'ai-generated' && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                        <div className="flex items-center gap-1 text-white text-xs">
                          <Sparkles className="size-3" />
                          AI Generated
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {currentCanvas.assets.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center text-gray-400">
                    <ImageIcon className="size-16 mx-auto mb-3" />
                    <p className="text-lg">
                      {isDragOver ? 'Drop images here!' : 'Your mood board is empty'}
                    </p>
                    <p className="text-sm">
                      {isDragOver ? '' : 'Drag & drop images, upload, or generate with AI'}
                    </p>
                  </div>
                </div>
              )}

              {isDragOver && currentCanvas.assets.length > 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-blue-100/80 pointer-events-none">
                  <div className="text-center">
                    <Upload className="size-16 mx-auto mb-3 text-blue-600" />
                    <p className="text-lg text-blue-900">Drop images to add them to canvas</p>
                  </div>
                </div>
              )}
            </div>

            {/* Asset Details */}
            {selectedAsset && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-4">
                  {(() => {
                    const asset = currentCanvas.assets.find(a => a.id === selectedAsset);
                    if (!asset) return null;
                    
                    return (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Selected Asset</h4>
                          <Badge variant="secondary">
                            {asset.type === 'ai-generated' ? '🤖 AI' : '📁 Uploaded'}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <Label className="text-sm">Width</Label>
                            <Input
                              type="number"
                              value={asset.width}
                              onChange={(e) => updateAsset(asset.id, { width: parseInt(e.target.value) || 100 })}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label className="text-sm">Height</Label>
                            <Input
                              type="number"
                              value={asset.height}
                              onChange={(e) => updateAsset(asset.id, { height: parseInt(e.target.value) || 100 })}
                            />
                          </div>
                        </div>

                        {asset.prompt && (
                          <div className="space-y-1">
                            <Label className="text-sm">AI Prompt Used</Label>
                            <p className="text-sm bg-white p-2 rounded border">
                              {asset.prompt}
                            </p>
                          </div>
                        )}

                        <div className="space-y-1">
                          <Label className="text-sm">Notes</Label>
                          <Textarea
                            placeholder="Add notes about this asset..."
                            value={asset.notes || ''}
                            onChange={(e) => updateAsset(asset.id, { notes: e.target.value })}
                            rows={2}
                          />
                        </div>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            )}

            {/* General Notes */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <StickyNote className="size-4" />
                Mood Board Notes
              </Label>
              <Textarea
                placeholder="Add general notes about your branding direction, inspirations, or design guidelines..."
                value={currentCanvas.notes || ''}
                onChange={(e) => setCurrentCanvas({ ...currentCanvas, notes: e.target.value })}
                rows={3}
              />
            </div>
          </TabsContent>

          <TabsContent value="colors" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Brand Color Palette</Label>
                <Badge variant="secondary">
                  {currentCanvas.colorPalette?.length || 0} Colors
                </Badge>
              </div>

              <div className="flex gap-2">
                <Input
                  type="color"
                  className="w-20 h-10"
                  onChange={(e) => addColorToPalette(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Enter hex color (e.g., #3B82F6)"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const value = (e.target as HTMLInputElement).value;
                      if (value.match(/^#[0-9A-Fa-f]{6}$/)) {
                        addColorToPalette(value);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }
                  }}
                />
              </div>

              {currentCanvas.colorPalette && currentCanvas.colorPalette.length > 0 ? (
                <div className="grid grid-cols-5 gap-3">
                  {currentCanvas.colorPalette.map((color, index) => (
                    <div key={index} className="space-y-2">
                      <div
                        className="w-full h-24 rounded-lg border-2 border-gray-300 cursor-pointer relative group"
                        style={{ backgroundColor: color }}
                      >
                        <Button
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeColorFromPalette(color)}
                        >
                          <Trash2 className="size-3" />
                        </Button>
                      </div>
                      <p className="text-sm text-center font-mono">{color}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border-2 border-dashed rounded-lg">
                  <Pipette className="size-12 mx-auto mb-3 text-gray-400" />
                  <p className="text-gray-600">No colors in your palette yet</p>
                  <p className="text-sm text-gray-500">Add colors using the color picker or hex input above</p>
                </div>
              )}

              <div className="p-4 bg-purple-50 rounded-lg border">
                <h4 className="font-medium mb-2">Color Palette Tips</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ Start with 2-3 primary brand colors</li>
                  <li>✓ Add 2-3 secondary/accent colors</li>
                  <li>✓ Include neutral colors (gray, white, black)</li>
                  <li>✓ Test colors for accessibility (contrast ratios)</li>
                  <li>✓ Consider color psychology for your industry</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="typography" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Primary Font</Label>
                <Input
                  placeholder="e.g., Inter, Helvetica, Roboto"
                  value={currentCanvas.typography?.primary || ''}
                  onChange={(e) => setCurrentCanvas({
                    ...currentCanvas,
                    typography: { ...currentCanvas.typography, primary: e.target.value, secondary: currentCanvas.typography?.secondary || '' }
                  })}
                />
              </div>

              <div className="space-y-2">
                <Label>Secondary Font</Label>
                <Input
                  placeholder="e.g., Georgia, Playfair Display, Lato"
                  value={currentCanvas.typography?.secondary || ''}
                  onChange={(e) => setCurrentCanvas({
                    ...currentCanvas,
                    typography: { primary: currentCanvas.typography?.primary || '', secondary: e.target.value }
                  })}
                />
              </div>

              {currentCanvas.typography?.primary && (
                <div className="p-6 bg-white rounded-lg border-2">
                  <div className="space-y-4">
                    <div style={{ fontFamily: currentCanvas.typography.primary }}>
                      <h1 className="mb-2">Heading 1 - Primary Font</h1>
                      <h2 className="mb-2">Heading 2 - Primary Font</h2>
                      <p>Body text preview using primary font. The quick brown fox jumps over the lazy dog.</p>
                    </div>
                    {currentCanvas.typography.secondary && (
                      <div style={{ fontFamily: currentCanvas.typography.secondary }}>
                        <h3 className="mb-2">Heading 3 - Secondary Font</h3>
                        <p>Body text preview using secondary font. The quick brown fox jumps over the lazy dog.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="p-4 bg-blue-50 rounded-lg border">
                <h4 className="font-medium mb-2">Typography Resources</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <a href="https://fonts.google.com" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Google Fonts</a> - Free fonts</li>
                  <li>• <a href="https://fonts.adobe.com" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Adobe Fonts</a> - Premium fonts</li>
                  <li>• <a href="https://fontpair.co" target="_blank" rel="noopener" className="text-blue-600 hover:underline">Font Pair</a> - Font pairing suggestions</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}