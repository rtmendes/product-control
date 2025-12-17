import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { 
  FolderOpen, 
  Upload, 
  Download, 
  Settings, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  Image as ImageIcon,
  Video,
  FileText
} from 'lucide-react';

interface ExportConfig {
  id: string;
  name: string;
  platform: 'google-drive' | 'imagekit' | 'local';
  enabled: boolean;
  folderPath: string;
  apiKey?: string;
  organizationStructure?: string;
  autoExport?: boolean;
}

interface AssetExport {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  size: string;
  format: string;
  exportedTo: string[];
  status: 'pending' | 'exporting' | 'success' | 'error';
  createdAt: Date;
}

interface AssetExportManagerProps {
  projectName: string;
}

export function AssetExportManager({ projectName }: AssetExportManagerProps) {
  const [exportConfigs, setExportConfigs] = useState<ExportConfig[]>([
    {
      id: 'google-drive',
      name: 'Google Drive',
      platform: 'google-drive',
      enabled: false,
      folderPath: `/LaunchFlow/${projectName}`,
      organizationStructure: 'platform',
      autoExport: false,
    },
    {
      id: 'imagekit',
      name: 'ImageKit',
      platform: 'imagekit',
      enabled: false,
      folderPath: `/launchflow/${projectName.toLowerCase()}`,
      organizationStructure: 'type',
      autoExport: false,
    },
  ]);

  const [mockAssets] = useState<AssetExport[]>([
    {
      id: '1',
      name: 'facebook-post-image.png',
      type: 'image',
      size: '2.4MB',
      format: 'PNG',
      exportedTo: [],
      status: 'pending',
      createdAt: new Date(),
    },
    {
      id: '2',
      name: 'instagram-reel.mp4',
      type: 'video',
      size: '45.8MB',
      format: 'MP4',
      exportedTo: [],
      status: 'pending',
      createdAt: new Date(),
    },
    {
      id: '3',
      name: 'ad-copy-variations.docx',
      type: 'document',
      size: '156KB',
      format: 'DOCX',
      exportedTo: [],
      status: 'pending',
      createdAt: new Date(),
    },
  ]);

  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);

  const toggleConfig = (configId: string) => {
    setExportConfigs(configs =>
      configs.map(c =>
        c.id === configId ? { ...c, enabled: !c.enabled } : c
      )
    );
  };

  const updateConfig = (configId: string, updates: Partial<ExportConfig>) => {
    setExportConfigs(configs =>
      configs.map(c =>
        c.id === configId ? { ...c, ...updates } : c
      )
    );
  };

  const connectPlatform = (platform: 'google-drive' | 'imagekit') => {
    setIsConnecting(true);
    // Simulate connection
    setTimeout(() => {
      toggleConfig(platform);
      setIsConnecting(false);
    }, 1500);
  };

  const exportAssets = (assetIds: string[]) => {
    const enabledPlatforms = exportConfigs.filter(c => c.enabled);
    if (enabledPlatforms.length === 0) {
      alert('Please enable at least one export platform');
      return;
    }
    
    // Simulate export
    alert(`Exporting ${assetIds.length} asset(s) to ${enabledPlatforms.map(p => p.name).join(', ')}`);
  };

  const toggleAssetSelection = (assetId: string) => {
    setSelectedAssets(prev =>
      prev.includes(assetId)
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  };

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="size-4 text-blue-600" />;
      case 'video':
        return <Video className="size-4 text-purple-600" />;
      case 'document':
        return <FileText className="size-4 text-green-600" />;
      default:
        return <FileText className="size-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-600"><CheckCircle2 className="size-3 mr-1" />Exported</Badge>;
      case 'exporting':
        return <Badge className="bg-blue-600">Exporting...</Badge>;
      case 'error':
        return <Badge className="bg-red-600"><AlertCircle className="size-3 mr-1" />Error</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="size-5" />
              Asset Export Manager
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Export and save your branded assets to Google Drive, ImageKit, or locally
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="size-4 mr-2" />
                Configure Exports
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Export Configuration</DialogTitle>
                <DialogDescription>
                  Configure where your assets should be exported
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {exportConfigs.map(config => (
                  <Card key={config.id} className={config.enabled ? 'border-green-500 bg-green-50' : ''}>
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Checkbox
                              checked={config.enabled}
                              onCheckedChange={() => toggleConfig(config.id)}
                            />
                            <div>
                              <h4 className="font-medium">{config.name}</h4>
                              <p className="text-sm text-gray-600">
                                {config.platform === 'google-drive' && 'Cloud storage for all file types'}
                                {config.platform === 'imagekit' && 'Optimized image & video CDN'}
                              </p>
                            </div>
                          </div>
                          {config.enabled ? (
                            <Badge className="bg-green-600">Connected</Badge>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => connectPlatform(config.platform)}
                              disabled={isConnecting}
                            >
                              {isConnecting ? 'Connecting...' : 'Connect'}
                            </Button>
                          )}
                        </div>

                        {config.enabled && (
                          <div className="space-y-3 pl-9">
                            <div className="space-y-2">
                              <Label className="text-sm">Folder Path</Label>
                              <Input
                                value={config.folderPath}
                                onChange={(e) => updateConfig(config.id, { folderPath: e.target.value })}
                                placeholder="/path/to/folder"
                              />
                              <p className="text-xs text-gray-500">
                                Assets will be saved to this location
                              </p>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-sm">Organization Structure</Label>
                              <Select
                                value={config.organizationStructure}
                                onValueChange={(value) => updateConfig(config.id, { organizationStructure: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="platform">By Platform (Facebook, Instagram, etc.)</SelectItem>
                                  <SelectItem value="type">By Type (Images, Videos, Documents)</SelectItem>
                                  <SelectItem value="date">By Date (2024-01, 2024-02, etc.)</SelectItem>
                                  <SelectItem value="flat">Flat (All in one folder)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            {config.platform === 'imagekit' && (
                              <div className="space-y-2">
                                <Label className="text-sm">API Key</Label>
                                <Input
                                  type="password"
                                  value={config.apiKey || ''}
                                  onChange={(e) => updateConfig(config.id, { apiKey: e.target.value })}
                                  placeholder="Enter ImageKit API key"
                                />
                              </div>
                            )}

                            <div className="flex items-center gap-2">
                              <Checkbox
                                checked={config.autoExport}
                                onCheckedChange={(checked) => 
                                  updateConfig(config.id, { autoExport: checked as boolean })
                                }
                              />
                              <Label className="text-sm">Auto-export when assets are created</Label>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="assets">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="assets">
              Assets ({mockAssets.length})
            </TabsTrigger>
            <TabsTrigger value="exports">
              Export Destinations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assets" className="space-y-4 mt-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectedAssets.length === mockAssets.length}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedAssets(mockAssets.map(a => a.id));
                    } else {
                      setSelectedAssets([]);
                    }
                  }}
                />
                <span className="text-sm text-gray-600">
                  {selectedAssets.length > 0 ? `${selectedAssets.length} selected` : 'Select all'}
                </span>
              </div>
              <Button
                disabled={selectedAssets.length === 0}
                onClick={() => exportAssets(selectedAssets)}
              >
                <Upload className="size-4 mr-2" />
                Export Selected
              </Button>
            </div>

            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-2">
                {mockAssets.map(asset => (
                  <Card key={asset.id} className="border-2 hover:border-blue-300 transition-colors">
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          checked={selectedAssets.includes(asset.id)}
                          onCheckedChange={() => toggleAssetSelection(asset.id)}
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getAssetIcon(asset.type)}
                              <div>
                                <h4 className="font-medium">{asset.name}</h4>
                                <p className="text-sm text-gray-600">
                                  {asset.format} • {asset.size}
                                </p>
                              </div>
                            </div>
                            {getStatusBadge(asset.status)}
                          </div>

                          {asset.exportedTo.length > 0 && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <span>Exported to:</span>
                              {asset.exportedTo.map(dest => (
                                <Badge key={dest} variant="outline" className="text-xs">
                                  {dest}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="exports" className="space-y-4 mt-4">
            <div className="space-y-3">
              {exportConfigs.map(config => (
                <Card key={config.id} className={config.enabled ? 'border-green-500' : 'border-gray-200'}>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{config.name}</h4>
                            {config.enabled ? (
                              <Badge className="bg-green-600">Active</Badge>
                            ) : (
                              <Badge variant="secondary">Inactive</Badge>
                            )}
                          </div>
                          {config.enabled && (
                            <div className="space-y-1 text-sm text-gray-600">
                              <p><strong>Path:</strong> {config.folderPath}</p>
                              <p><strong>Structure:</strong> {config.organizationStructure}</p>
                              {config.autoExport && (
                                <Badge variant="outline" className="text-xs">Auto-export enabled</Badge>
                              )}
                            </div>
                          )}
                        </div>
                        {config.enabled && (
                          <Button variant="outline" size="sm" asChild>
                            <a href="#" target="_blank" rel="noopener">
                              <ExternalLink className="size-4 mr-1" />
                              Open Folder
                            </a>
                          </Button>
                        )}
                      </div>

                      {!config.enabled && (
                        <p className="text-sm text-gray-500">
                          Click "Configure Exports" to connect this platform
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2">
              <CardContent className="pt-4">
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Settings className="size-4 text-blue-600" />
                  Export Best Practices
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>✓ <strong>Google Drive:</strong> Best for team collaboration and version control</li>
                  <li>✓ <strong>ImageKit:</strong> Best for web delivery with automatic optimization</li>
                  <li>✓ <strong>Naming convention:</strong> Use descriptive names (platform-type-date.ext)</li>
                  <li>✓ <strong>Organization:</strong> Choose structure based on your workflow</li>
                  <li>✓ <strong>Backup:</strong> Enable multiple export destinations for redundancy</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
