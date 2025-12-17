import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { BarChart3, Plus, Trash2, Link2, TrendingUp, MousePointerClick, Copy } from 'lucide-react';
import { Separator } from './ui/separator';
import type { TrackingMetric, UTMConfig } from '../App';

interface AdTrackingConfigProps {
  metrics: TrackingMetric[];
  onChange: (metrics: TrackingMetric[]) => void;
}

export function AdTrackingConfig({ metrics, onChange }: AdTrackingConfigProps) {
  const [expandedMetric, setExpandedMetric] = useState<string | null>(null);

  const addMetric = () => {
    const newMetric: TrackingMetric = {
      id: Date.now().toString(),
      name: 'New Campaign',
      type: 'both',
      platform: '',
      engagementTracking: true,
      conversionTracking: true,
      notes: '',
    };
    onChange([...metrics, newMetric]);
    setExpandedMetric(newMetric.id);
  };

  const updateMetric = (id: string, updates: Partial<TrackingMetric>) => {
    onChange(metrics.map(m => m.id === id ? { ...m, ...updates } : m));
  };

  const deleteMetric = (id: string) => {
    onChange(metrics.filter(m => m.id !== id));
    if (expandedMetric === id) {
      setExpandedMetric(null);
    }
  };

  const updateUTM = (metricId: string, utmUpdates: Partial<UTMConfig>) => {
    const metric = metrics.find(m => m.id === metricId);
    if (metric) {
      const currentUTM = metric.utmConfig || {
        source: '',
        medium: '',
        campaign: '',
      };
      updateMetric(metricId, {
        utmConfig: { ...currentUTM, ...utmUpdates }
      });
    }
  };

  const generateUTMUrl = (utm: UTMConfig, baseUrl: string = 'https://yoursite.com') => {
    const params = new URLSearchParams();
    if (utm.source) params.append('utm_source', utm.source);
    if (utm.medium) params.append('utm_medium', utm.medium);
    if (utm.campaign) params.append('utm_campaign', utm.campaign);
    if (utm.term) params.append('utm_term', utm.term);
    if (utm.content) params.append('utm_content', utm.content);
    
    return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="size-5" />
            Campaign Tracking & Analytics
          </CardTitle>
          <Button onClick={addMetric} size="sm">
            <Plus className="size-4 mr-2" />
            Add Campaign
          </Button>
        </div>
        <p className="text-sm text-gray-600">
          Track paid and organic campaigns with UTM parameters, engagement metrics, and conversion data
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed rounded-lg">
            <BarChart3 className="size-12 mx-auto mb-3 text-gray-400" />
            <p className="text-gray-600 mb-4">No tracking campaigns yet</p>
            <Button onClick={addMetric} variant="outline">
              <Plus className="size-4 mr-2" />
              Create Your First Campaign
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {metrics.map((metric) => (
              <Card key={metric.id} className="border-2">
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Input
                            placeholder="Campaign Name"
                            value={metric.name}
                            onChange={(e) => updateMetric(metric.id, { name: e.target.value })}
                            className="max-w-md"
                          />
                          <Badge variant={
                            metric.type === 'paid' ? 'default' : 
                            metric.type === 'organic' ? 'secondary' : 
                            'outline'
                          }>
                            {metric.type === 'paid' ? '💰 Paid' : 
                             metric.type === 'organic' ? '🌱 Organic' : 
                             '🔄 Both'}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setExpandedMetric(
                            expandedMetric === metric.id ? null : metric.id
                          )}
                        >
                          {expandedMetric === metric.id ? 'Collapse' : 'Expand'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteMetric(metric.id)}
                        >
                          <Trash2 className="size-4 text-red-600" />
                        </Button>
                      </div>
                    </div>

                    {expandedMetric === metric.id && (
                      <div className="space-y-4 pt-4 border-t">
                        {/* Basic Info */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Campaign Type</Label>
                            <Select
                              value={metric.type}
                              onValueChange={(value: 'paid' | 'organic' | 'both') => 
                                updateMetric(metric.id, { type: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="paid">Paid Traffic</SelectItem>
                                <SelectItem value="organic">Organic Traffic</SelectItem>
                                <SelectItem value="both">Both Paid & Organic</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>Platform</Label>
                            <Select
                              value={metric.platform}
                              onValueChange={(value) => updateMetric(metric.id, { platform: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select platform" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="google">Google Ads</SelectItem>
                                <SelectItem value="facebook">Facebook</SelectItem>
                                <SelectItem value="instagram">Instagram</SelectItem>
                                <SelectItem value="youtube">YouTube</SelectItem>
                                <SelectItem value="tiktok">TikTok</SelectItem>
                                <SelectItem value="linkedin">LinkedIn</SelectItem>
                                <SelectItem value="twitter">Twitter/X</SelectItem>
                                <SelectItem value="pinterest">Pinterest</SelectItem>
                                <SelectItem value="email">Email</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <Separator />

                        {/* UTM Parameters */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Link2 className="size-4 text-blue-600" />
                            <Label>UTM Parameters</Label>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-2">
                              <Label className="text-sm">
                                Source <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                placeholder="e.g., facebook, google, newsletter"
                                value={metric.utmConfig?.source || ''}
                                onChange={(e) => updateUTM(metric.id, { source: e.target.value })}
                              />
                              <p className="text-xs text-gray-500">Traffic source identifier</p>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-sm">
                                Medium <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                placeholder="e.g., cpc, email, social, organic"
                                value={metric.utmConfig?.medium || ''}
                                onChange={(e) => updateUTM(metric.id, { medium: e.target.value })}
                              />
                              <p className="text-xs text-gray-500">Marketing medium</p>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-sm">
                                Campaign <span className="text-red-500">*</span>
                              </Label>
                              <Input
                                placeholder="e.g., spring_sale, product_launch"
                                value={metric.utmConfig?.campaign || ''}
                                onChange={(e) => updateUTM(metric.id, { campaign: e.target.value })}
                              />
                              <p className="text-xs text-gray-500">Campaign name</p>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-sm">Term (optional)</Label>
                              <Input
                                placeholder="e.g., running+shoes, paid keywords"
                                value={metric.utmConfig?.term || ''}
                                onChange={(e) => updateUTM(metric.id, { term: e.target.value })}
                              />
                              <p className="text-xs text-gray-500">Paid keywords</p>
                            </div>

                            <div className="space-y-2 col-span-2">
                              <Label className="text-sm">Content (optional)</Label>
                              <Input
                                placeholder="e.g., ad-variant-a, header-link"
                                value={metric.utmConfig?.content || ''}
                                onChange={(e) => updateUTM(metric.id, { content: e.target.value })}
                              />
                              <p className="text-xs text-gray-500">
                                Differentiate ads or links pointing to the same URL
                              </p>
                            </div>
                          </div>

                          {/* Generated URL */}
                          {metric.utmConfig && metric.utmConfig.source && metric.utmConfig.medium && metric.utmConfig.campaign && (
                            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <Label className="text-sm flex items-center gap-2">
                                  <Link2 className="size-4" />
                                  Generated Tracking URL
                                </Label>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => copyToClipboard(generateUTMUrl(metric.utmConfig!))}
                                >
                                  <Copy className="size-3 mr-1" />
                                  Copy
                                </Button>
                              </div>
                              <code className="text-xs break-all bg-white p-2 rounded block">
                                {generateUTMUrl(metric.utmConfig)}
                              </code>
                              <p className="text-xs text-gray-600 mt-2">
                                💡 Replace "yoursite.com" with your actual landing page URL
                              </p>
                            </div>
                          )}
                        </div>

                        <Separator />

                        {/* Tracking Options */}
                        <div className="space-y-3">
                          <Label className="flex items-center gap-2">
                            <TrendingUp className="size-4 text-green-600" />
                            Tracking Metrics
                          </Label>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <div className="font-medium text-sm">Engagement Tracking</div>
                                <p className="text-xs text-gray-500">
                                  Track likes, comments, shares, views
                                </p>
                              </div>
                              <Switch
                                checked={metric.engagementTracking}
                                onCheckedChange={(checked) => 
                                  updateMetric(metric.id, { engagementTracking: checked })
                                }
                              />
                            </div>

                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <div className="font-medium text-sm">Conversion Tracking</div>
                                <p className="text-xs text-gray-500">
                                  Track clicks, leads, purchases, ROI
                                </p>
                              </div>
                              <Switch
                                checked={metric.conversionTracking}
                                onCheckedChange={(checked) => 
                                  updateMetric(metric.id, { conversionTracking: checked })
                                }
                              />
                            </div>
                          </div>
                        </div>

                        {/* Metrics to Track */}
                        <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
                          <h4 className="font-medium mb-3 flex items-center gap-2">
                            <MousePointerClick className="size-4 text-green-600" />
                            Recommended Metrics to Track
                          </h4>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="space-y-1">
                              <p className="font-medium text-gray-700">Engagement Metrics:</p>
                              <ul className="text-gray-600 space-y-0.5 ml-4 list-disc">
                                <li>Impressions</li>
                                <li>Reach</li>
                                <li>Engagement Rate</li>
                                <li>Likes/Reactions</li>
                                <li>Comments</li>
                                <li>Shares</li>
                                <li>Saves</li>
                                <li>Video Views</li>
                              </ul>
                            </div>
                            <div className="space-y-1">
                              <p className="font-medium text-gray-700">Conversion Metrics:</p>
                              <ul className="text-gray-600 space-y-0.5 ml-4 list-disc">
                                <li>Click-through Rate (CTR)</li>
                                <li>Cost per Click (CPC)</li>
                                <li>Conversion Rate</li>
                                <li>Cost per Acquisition (CPA)</li>
                                <li>Return on Ad Spend (ROAS)</li>
                                <li>Revenue</li>
                                <li>Leads Generated</li>
                                <li>Customer Lifetime Value</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        {/* Notes */}
                        <div className="space-y-2">
                          <Label>Campaign Notes</Label>
                          <Textarea
                            placeholder="Add notes about this campaign, testing results, insights, etc."
                            value={metric.notes}
                            onChange={(e) => updateMetric(metric.id, { notes: e.target.value })}
                            rows={3}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Quick Reference */}
        {metrics.length > 0 && (
          <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <TrendingUp className="size-4 text-purple-600" />
              UTM Best Practices
            </h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✓ Use lowercase and replace spaces with underscores or hyphens</li>
              <li>✓ Be consistent with naming conventions across campaigns</li>
              <li>✓ Use descriptive names that you'll understand months later</li>
              <li>✓ Track different ad variations using utm_content parameter</li>
              <li>✓ Integrate with Google Analytics or your analytics platform</li>
              <li>✓ Document your UTM naming conventions for your team</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
