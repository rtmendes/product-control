import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Figma, ExternalLink, Copy, Check } from 'lucide-react';

interface FigmaIntegrationProps {
  figmaUrl?: string;
  onUrlChange: (url: string) => void;
}

export function FigmaIntegration({ figmaUrl, onUrlChange }: FigmaIntegrationProps) {
  const [url, setUrl] = useState(figmaUrl || '');
  const [embedMode, setEmbedMode] = useState<'figma' | 'figjam'>('figma');
  const [copied, setCopied] = useState(false);

  const handleSaveUrl = () => {
    onUrlChange(url);
  };

  const convertToEmbedUrl = (inputUrl: string): string => {
    if (!inputUrl) return '';
    
    // Convert Figma file URL to embed URL
    if (inputUrl.includes('figma.com/file/')) {
      return inputUrl.replace('figma.com/file/', 'figma.com/embed?embed_host=launchflow&url=') + '&hide-ui=1';
    }
    
    // Convert FigJam URL to embed URL
    if (inputUrl.includes('figma.com/board/')) {
      return inputUrl.replace('figma.com/board/', 'figma.com/embed?embed_host=launchflow&url=') + '&hide-ui=1';
    }
    
    return inputUrl;
  };

  const embedUrl = convertToEmbedUrl(figmaUrl || '');

  const copyEmbedCode = () => {
    const code = `<iframe src="${embedUrl}" width="100%" height="600" frameborder="0" allowfullscreen></iframe>`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Figma className="size-5" />
          Figma / FigJam Whiteboard Integration
        </CardTitle>
        <p className="text-sm text-gray-600">
          Embed Figma files or FigJam boards directly into your workflow for collaborative design
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={embedMode} onValueChange={(v) => setEmbedMode(v as 'figma' | 'figjam')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="figma">Figma File</TabsTrigger>
            <TabsTrigger value="figjam">FigJam Board</TabsTrigger>
          </TabsList>

          <TabsContent value="figma" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Figma File URL</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="https://www.figma.com/file/..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <Button onClick={handleSaveUrl}>
                  Save
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                💡 Share your Figma file with "Anyone with the link can view" and paste the URL here
              </p>
            </div>

            {embedUrl && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Live Figma File</Badge>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={copyEmbedCode}>
                      {copied ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                      {copied ? 'Copied!' : 'Copy Embed'}
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={figmaUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="size-4 mr-1" />
                        Open in Figma
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="relative w-full h-[600px] bg-gray-100 rounded-lg overflow-hidden border-2">
                  <iframe
                    src={embedUrl}
                    className="w-full h-full"
                    allowFullScreen
                    title="Figma Embed"
                  />
                </div>
              </div>
            )}

            {!embedUrl && (
              <div className="p-8 border-2 border-dashed rounded-lg text-center">
                <Figma className="size-16 mx-auto mb-3 text-gray-400" />
                <h3 className="font-medium mb-2">No Figma File Connected</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Add a Figma file URL to embed your designs directly in the workflow
                </p>
                <div className="space-y-2 text-left max-w-md mx-auto">
                  <p className="text-sm font-medium">How to connect:</p>
                  <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                    <li>Open your Figma file</li>
                    <li>Click "Share" in the top right</li>
                    <li>Set to "Anyone with the link can view"</li>
                    <li>Copy the file URL</li>
                    <li>Paste it in the field above</li>
                  </ol>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="figjam" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>FigJam Board URL</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="https://www.figma.com/board/..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <Button onClick={handleSaveUrl}>
                  Save
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                💡 Share your FigJam board with "Anyone with the link can edit" for full collaboration
              </p>
            </div>

            {embedUrl && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Live FigJam Board</Badge>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={copyEmbedCode}>
                      {copied ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                      {copied ? 'Copied!' : 'Copy Embed'}
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={figmaUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="size-4 mr-1" />
                        Open in FigJam
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="relative w-full h-[600px] bg-gray-100 rounded-lg overflow-hidden border-2">
                  <iframe
                    src={embedUrl}
                    className="w-full h-full"
                    allowFullScreen
                    title="FigJam Embed"
                  />
                </div>
              </div>
            )}

            {!embedUrl && (
              <div className="p-8 border-2 border-dashed rounded-lg text-center">
                <Figma className="size-16 mx-auto mb-3 text-gray-400" />
                <h3 className="font-medium mb-2">No FigJam Board Connected</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Add a FigJam board URL to collaborate on your whiteboard directly in the workflow
                </p>
                <div className="space-y-2 text-left max-w-md mx-auto">
                  <p className="text-sm font-medium">How to connect:</p>
                  <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                    <li>Open your FigJam board</li>
                    <li>Click "Share" in the top right</li>
                    <li>Set to "Anyone with the link can edit" (for collaboration)</li>
                    <li>Copy the board URL</li>
                    <li>Paste it in the field above</li>
                  </ol>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="p-4 bg-purple-50 rounded-lg border">
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Figma className="size-4 text-purple-600" />
            Why Use Figma/FigJam Integration?
          </h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>✓ <strong>Real-time collaboration</strong> - Work with your team simultaneously</li>
            <li>✓ <strong>All Figma features</strong> - Full access to design tools, plugins, and widgets</li>
            <li>✓ <strong>Version history</strong> - Track changes and revert when needed</li>
            <li>✓ <strong>Commenting</strong> - Leave feedback directly on designs</li>
            <li>✓ <strong>Centralized workflow</strong> - Keep all project assets in one place</li>
            <li>✓ <strong>Auto-sync</strong> - Changes made in Figma appear here instantly</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
