import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Facebook, Instagram, Youtube, Linkedin, BookOpen, Target, DollarSign, Megaphone, Lightbulb, BarChart3, FileText, Palette } from 'lucide-react';
import { Separator } from './ui/separator';
import { AdTrackingConfig } from './AdTrackingConfig';
import { AdCopywritingConfig } from './AdCopywritingConfig';
import { BrandingMoodBoard } from './BrandingMoodBoard';
import type { MarketingConfig, MarketingPlatform, AdPlatform } from '../App';

interface MarketingPromotionConfigProps {
  config: MarketingConfig | undefined;
  onChange: (config: MarketingConfig) => void;
}

const platformIcons: Record<string, any> = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  tiktok: Megaphone,
  linkedin: Linkedin,
  blog: BookOpen,
  google: Target,
};

const defaultMarketingPlatforms: MarketingPlatform[] = [
  { platform: 'facebook', enabled: false, handle: '', contactInfo: '' },
  { platform: 'instagram', enabled: false, handle: '', contactInfo: '' },
  { platform: 'youtube', enabled: false, handle: '', contactInfo: '' },
  { platform: 'tiktok', enabled: false, handle: '', contactInfo: '' },
  { platform: 'linkedin', enabled: false, handle: '', contactInfo: '' },
  { platform: 'blog', enabled: false, handle: '', contactInfo: '' },
];

const defaultAdPlatforms: AdPlatform[] = [
  { platform: 'google', type: 'organic', enabled: false, knowledgeBaseEnabled: false },
  { platform: 'facebook', type: 'organic', enabled: false, knowledgeBaseEnabled: false },
  { platform: 'instagram', type: 'organic', enabled: false, knowledgeBaseEnabled: false },
  { platform: 'youtube', type: 'organic', enabled: false, knowledgeBaseEnabled: false },
  { platform: 'tiktok', type: 'organic', enabled: false, knowledgeBaseEnabled: false },
  { platform: 'linkedin', type: 'organic', enabled: false, knowledgeBaseEnabled: false },
];

export function MarketingPromotionConfig({ config, onChange }: MarketingPromotionConfigProps) {
  const currentConfig: MarketingConfig = config || {
    platforms: defaultMarketingPlatforms,
    adPlatforms: defaultAdPlatforms,
  };

  const updateConfig = (updates: Partial<MarketingConfig>) => {
    onChange({ ...currentConfig, ...updates });
  };

  const updateMarketingPlatform = (index: number, updates: Partial<MarketingPlatform>) => {
    const updatedPlatforms = [...currentConfig.platforms];
    updatedPlatforms[index] = { ...updatedPlatforms[index], ...updates };
    updateConfig({ platforms: updatedPlatforms });
  };

  const updateAdPlatform = (index: number, updates: Partial<AdPlatform>) => {
    const updatedAdPlatforms = [...currentConfig.adPlatforms];
    updatedAdPlatforms[index] = { ...updatedAdPlatforms[index], ...updates };
    updateConfig({ adPlatforms: updatedAdPlatforms });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Megaphone className="size-5" />
          Marketing & Promotion Configuration
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="platforms" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="platforms">Social Platforms</TabsTrigger>
            <TabsTrigger value="advertising">Advertising</TabsTrigger>
            <TabsTrigger value="strategy">Strategy & Goals</TabsTrigger>
          </TabsList>

          <TabsContent value="platforms" className="space-y-4 mt-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Enable Social Media Platforms</Label>
                <Badge variant="secondary">
                  {currentConfig.platforms.filter(p => p.enabled).length} Active
                </Badge>
              </div>
              
              {currentConfig.platforms.map((platform, index) => {
                const Icon = platformIcons[platform.platform];
                
                return (
                  <Card key={platform.platform} className={platform.enabled ? 'border-blue-300 bg-blue-50' : ''}>
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {Icon && <Icon className="size-5" />}
                            <Label className="capitalize">{platform.platform}</Label>
                          </div>
                          <Switch
                            checked={platform.enabled}
                            onCheckedChange={(enabled) => updateMarketingPlatform(index, { enabled })}
                          />
                        </div>

                        {platform.enabled && (
                          <div className="space-y-3 pt-2 border-t">
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-2">
                                <Label className="text-sm">
                                  {platform.platform === 'blog' ? 'Blog URL' : 'Handle/Username'}
                                </Label>
                                <Input
                                  placeholder={platform.platform === 'blog' ? 'https://blog.com' : '@username'}
                                  value={platform.handle}
                                  onChange={(e) => updateMarketingPlatform(index, { handle: e.target.value })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label className="text-sm">Contact/Profile URL</Label>
                                <Input
                                  placeholder="https://..."
                                  value={platform.contactInfo}
                                  onChange={(e) => updateMarketingPlatform(index, { contactInfo: e.target.value })}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="advertising" className="space-y-4 mt-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Advertising Platforms & Strategy</Label>
                <Badge variant="secondary">
                  {currentConfig.adPlatforms.filter(p => p.enabled).length} Active
                </Badge>
              </div>

              {currentConfig.adPlatforms.map((adPlatform, index) => {
                const Icon = platformIcons[adPlatform.platform];
                
                return (
                  <Card key={adPlatform.platform} className={adPlatform.enabled ? 'border-green-300 bg-green-50' : ''}>
                    <CardContent className="pt-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {Icon && <Icon className="size-5" />}
                            <Label className="capitalize">{adPlatform.platform} Ads</Label>
                          </div>
                          <Switch
                            checked={adPlatform.enabled}
                            onCheckedChange={(enabled) => updateAdPlatform(index, { enabled })}
                          />
                        </div>

                        {adPlatform.enabled && (
                          <div className="space-y-3 pt-2 border-t">
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-2">
                                <Label className="text-sm">Campaign Type</Label>
                                <Select
                                  value={adPlatform.type}
                                  onValueChange={(value: 'organic' | 'ppc') => 
                                    updateAdPlatform(index, { type: value })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="organic">Organic</SelectItem>
                                    <SelectItem value="ppc">PPC (Paid Advertising)</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              {adPlatform.type === 'ppc' && (
                                <div className="space-y-2">
                                  <Label className="text-sm">Budget</Label>
                                  <Input
                                    placeholder="$500/month"
                                    value={adPlatform.budget || ''}
                                    onChange={(e) => updateAdPlatform(index, { budget: e.target.value })}
                                  />
                                </div>
                              )}
                            </div>

                            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                              <div className="flex items-center gap-2">
                                <Lightbulb className="size-4 text-yellow-600" />
                                <Label className="text-sm">Load Knowledge Base & Ad Frameworks</Label>
                              </div>
                              <Switch
                                checked={adPlatform.knowledgeBaseEnabled}
                                onCheckedChange={(enabled) => 
                                  updateAdPlatform(index, { knowledgeBaseEnabled: enabled })
                                }
                              />
                            </div>

                            {adPlatform.knowledgeBaseEnabled && (
                              <div className="p-3 bg-yellow-50 rounded-lg text-sm">
                                <p className="font-medium mb-2">Knowledge Base Resources Loaded:</p>
                                <ul className="list-disc list-inside space-y-1 text-gray-700">
                                  <li>{adPlatform.platform.charAt(0).toUpperCase() + adPlatform.platform.slice(1)} Ad Framework Templates</li>
                                  <li>Targeting & Audience Research SOPs</li>
                                  <li>Ad Copywriting Best Practices</li>
                                  <li>Creative Testing Protocols</li>
                                  {adPlatform.type === 'ppc' && (
                                    <>
                                      <li>Budget Optimization Strategies</li>
                                      <li>Bid Management Guidelines</li>
                                      <li>Conversion Tracking Setup</li>
                                    </>
                                  )}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="strategy" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Target className="size-4" />
                  Marketing Strategy
                </Label>
                <Select
                  value={currentConfig.strategy || ''}
                  onValueChange={(value) => updateConfig({ strategy: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select marketing strategy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="brand-awareness">Brand Awareness</SelectItem>
                    <SelectItem value="lead-generation">Lead Generation</SelectItem>
                    <SelectItem value="sales-conversion">Sales & Conversion</SelectItem>
                    <SelectItem value="customer-retention">Customer Retention</SelectItem>
                    <SelectItem value="product-launch">Product Launch</SelectItem>
                    <SelectItem value="content-marketing">Content Marketing</SelectItem>
                    <SelectItem value="influencer-marketing">Influencer Marketing</SelectItem>
                    <SelectItem value="multi-channel">Multi-Channel Mix</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Target className="size-4" />
                  Marketing Goal
                </Label>
                <Textarea
                  placeholder="Describe your marketing goals and objectives... (e.g., Acquire 1,000 new customers in Q1, Increase brand awareness by 50%, Generate 500 qualified leads per month)"
                  value={currentConfig.goal || ''}
                  onChange={(e) => updateConfig({ goal: e.target.value })}
                  rows={3}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <DollarSign className="size-4" />
                  Budget Strategy
                </Label>
                <Select
                  value={currentConfig.budgetStrategy || ''}
                  onValueChange={(value) => updateConfig({ budgetStrategy: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget strategy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bootstrap">Bootstrap / Minimal Budget (Under $500/mo)</SelectItem>
                    <SelectItem value="small">Small Budget ($500-$2,000/mo)</SelectItem>
                    <SelectItem value="medium">Medium Budget ($2,000-$10,000/mo)</SelectItem>
                    <SelectItem value="large">Large Budget ($10,000-$50,000/mo)</SelectItem>
                    <SelectItem value="enterprise">Enterprise Budget ($50,000+/mo)</SelectItem>
                    <SelectItem value="variable">Variable / Performance-Based</SelectItem>
                    <SelectItem value="roi-driven">ROI-Driven (Scale with results)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Lightbulb className="size-4" />
                  Ad Framework
                </Label>
                <Select
                  value={currentConfig.adFramework || ''}
                  onValueChange={(value) => updateConfig({ adFramework: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select ad framework" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aida">AIDA (Attention, Interest, Desire, Action)</SelectItem>
                    <SelectItem value="pas">PAS (Problem, Agitate, Solution)</SelectItem>
                    <SelectItem value="bab">BAB (Before, After, Bridge)</SelectItem>
                    <SelectItem value="fab">FAB (Features, Advantages, Benefits)</SelectItem>
                    <SelectItem value="4ps">4 P's (Picture, Promise, Prove, Push)</SelectItem>
                    <SelectItem value="storytelling">Storytelling Framework</SelectItem>
                    <SelectItem value="ugc">UGC (User Generated Content)</SelectItem>
                    <SelectItem value="testimonial">Social Proof & Testimonials</SelectItem>
                    <SelectItem value="educational">Educational / How-To</SelectItem>
                    <SelectItem value="comparison">Comparison / VS Competitor</SelectItem>
                    <SelectItem value="scarcity">Scarcity & Urgency</SelectItem>
                    <SelectItem value="custom">Custom Framework</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {currentConfig.adFramework && (
                <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Lightbulb className="size-4 text-purple-600" />
                    Framework Guidelines
                  </h4>
                  <div className="text-sm text-gray-700 space-y-2">
                    {currentConfig.adFramework === 'aida' && (
                      <ul className="list-disc list-inside space-y-1">
                        <li><strong>Attention:</strong> Grab attention with bold hook</li>
                        <li><strong>Interest:</strong> Build interest with compelling facts</li>
                        <li><strong>Desire:</strong> Create desire by showing benefits</li>
                        <li><strong>Action:</strong> Clear call-to-action</li>
                      </ul>
                    )}
                    {currentConfig.adFramework === 'pas' && (
                      <ul className="list-disc list-inside space-y-1">
                        <li><strong>Problem:</strong> Identify the customer's pain point</li>
                        <li><strong>Agitate:</strong> Amplify the problem's impact</li>
                        <li><strong>Solution:</strong> Present your product as the solution</li>
                      </ul>
                    )}
                    {currentConfig.adFramework === 'bab' && (
                      <ul className="list-disc list-inside space-y-1">
                        <li><strong>Before:</strong> Show current frustrating situation</li>
                        <li><strong>After:</strong> Paint picture of ideal outcome</li>
                        <li><strong>Bridge:</strong> Show how your product gets them there</li>
                      </ul>
                    )}
                    {currentConfig.adFramework === 'storytelling' && (
                      <ul className="list-disc list-inside space-y-1">
                        <li>Share relatable customer journey or founder story</li>
                        <li>Include emotional connection and transformation</li>
                        <li>End with clear next step for audience</li>
                      </ul>
                    )}
                    {!['aida', 'pas', 'bab', 'storytelling'].includes(currentConfig.adFramework) && (
                      <p>Use this framework to structure your ad creative and messaging for maximum impact.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}