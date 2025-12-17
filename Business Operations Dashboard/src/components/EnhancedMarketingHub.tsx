import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Megaphone, BarChart3, FileText, Palette, Figma, ImageIcon, FolderOpen } from 'lucide-react';
import { MarketingPromotionConfig } from './MarketingPromotionConfig';
import { AdTrackingConfig } from './AdTrackingConfig';
import { AdCopywritingConfig } from './AdCopywritingConfig';
import { BrandingMoodBoard } from './BrandingMoodBoard';
import { FigmaIntegration } from './FigmaIntegration';
import { SocialMediaAssetSpecs } from './SocialMediaAssetSpecs';
import { AssetExportManager } from './AssetExportManager';
import type { MarketingConfig, Product } from '../App';

interface EnhancedMarketingHubProps {
  config: MarketingConfig | undefined;
  onChange: (config: MarketingConfig) => void;
  projectName: string;
}

const defaultConfig: MarketingConfig = {
  platforms: [
    { platform: 'facebook', enabled: false, handle: '', contactInfo: '' },
    { platform: 'instagram', enabled: false, handle: '', contactInfo: '' },
    { platform: 'youtube', enabled: false, handle: '', contactInfo: '' },
    { platform: 'tiktok', enabled: false, handle: '', contactInfo: '' },
    { platform: 'linkedin', enabled: false, handle: '', contactInfo: '' },
    { platform: 'blog', enabled: false, handle: '', contactInfo: '' },
  ],
  adPlatforms: [
    { platform: 'google', type: 'organic', enabled: false, knowledgeBaseEnabled: false },
    { platform: 'facebook', type: 'organic', enabled: false, knowledgeBaseEnabled: false },
    { platform: 'instagram', type: 'organic', enabled: false, knowledgeBaseEnabled: false },
    { platform: 'youtube', type: 'organic', enabled: false, knowledgeBaseEnabled: false },
    { platform: 'tiktok', type: 'organic', enabled: false, knowledgeBaseEnabled: false },
    { platform: 'linkedin', type: 'organic', enabled: false, knowledgeBaseEnabled: false },
  ],
  trackingMetrics: [],
};

export function EnhancedMarketingHub({ config, onChange, projectName }: EnhancedMarketingHubProps) {
  const currentConfig = config || defaultConfig;

  const updateConfig = (updates: Partial<MarketingConfig>) => {
    onChange({ ...currentConfig, ...updates });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Megaphone className="size-6" />
          Marketing & Branding Hub
        </CardTitle>
        <p className="text-sm text-gray-600">
          Comprehensive marketing configuration with social platforms, advertising, tracking, copywriting, and branding
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="platforms" className="w-full">
          <TabsList className="grid w-full grid-cols-7 gap-1">
            <TabsTrigger value="platforms" className="gap-1 text-xs">
              <Megaphone className="size-3" />
              Platforms
            </TabsTrigger>
            <TabsTrigger value="tracking" className="gap-1 text-xs">
              <BarChart3 className="size-3" />
              Tracking
            </TabsTrigger>
            <TabsTrigger value="copywriting" className="gap-1 text-xs">
              <FileText className="size-3" />
              Copywriting
            </TabsTrigger>
            <TabsTrigger value="branding" className="gap-1 text-xs">
              <Palette className="size-3" />
              Branding
            </TabsTrigger>
            <TabsTrigger value="figma" className="gap-1 text-xs">
              <Figma className="size-3" />
              Figma
            </TabsTrigger>
            <TabsTrigger value="specs" className="gap-1 text-xs">
              <ImageIcon className="size-3" />
              Specs
            </TabsTrigger>
            <TabsTrigger value="export" className="gap-1 text-xs">
              <FolderOpen className="size-3" />
              Export
            </TabsTrigger>
          </TabsList>

          <TabsContent value="platforms" className="mt-6">
            <MarketingPromotionConfig config={currentConfig} onChange={onChange} />
          </TabsContent>

          <TabsContent value="tracking" className="mt-6">
            <AdTrackingConfig
              metrics={currentConfig.trackingMetrics || []}
              onChange={(metrics) => updateConfig({ trackingMetrics: metrics })}
            />
          </TabsContent>

          <TabsContent value="copywriting" className="mt-6">
            <AdCopywritingConfig
              selectedStrategies={currentConfig.adPlatforms
                .flatMap(p => p.selectedStrategies || [])
                .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)}
              selectedWritingStyles={currentConfig.adPlatforms
                .flatMap(p => p.writingStyles || [])
                .filter((v, i, a) => a.findIndex(t => t.id === v.id) === i)}
              onStrategiesChange={(strategies) => {
                const updatedAdPlatforms = currentConfig.adPlatforms.map(p => 
                  p.enabled ? { ...p, selectedStrategies: strategies } : p
                );
                updateConfig({ adPlatforms: updatedAdPlatforms });
              }}
              onWritingStylesChange={(styles) => {
                const updatedAdPlatforms = currentConfig.adPlatforms.map(p => 
                  p.enabled ? { ...p, writingStyles: styles } : p
                );
                updateConfig({ adPlatforms: updatedAdPlatforms });
              }}
            />
          </TabsContent>

          <TabsContent value="branding" className="mt-6">
            <BrandingMoodBoard
              canvas={currentConfig.brandingCanvas}
              onChange={(canvas) => updateConfig({ brandingCanvas: canvas })}
            />
          </TabsContent>

          <TabsContent value="figma" className="mt-6">
            <FigmaIntegration
              figmaUrl={currentConfig.brandingCanvas?.figmaUrl}
              onUrlChange={(url) => {
                const updatedCanvas = {
                  ...(currentConfig.brandingCanvas || { assets: [] }),
                  figmaUrl: url,
                };
                updateConfig({ brandingCanvas: updatedCanvas });
              }}
            />
          </TabsContent>

          <TabsContent value="specs" className="mt-6">
            <SocialMediaAssetSpecs />
          </TabsContent>

          <TabsContent value="export" className="mt-6">
            <AssetExportManager projectName={projectName} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
