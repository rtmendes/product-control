import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ShoppingCart } from 'lucide-react';
import type { EcommercePlatformConfig as PlatformConfig } from '../App';

interface EcommercePlatformConfigProps {
  config: PlatformConfig | undefined;
  onChange: (config: PlatformConfig) => void;
}

export function EcommercePlatformConfig({ config, onChange }: EcommercePlatformConfigProps) {
  const currentConfig: PlatformConfig = config || {
    platform: 'shopify',
  };

  const updateConfig = (updates: Partial<PlatformConfig>) => {
    onChange({ ...currentConfig, ...updates });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="size-5" />
          Ecommerce Platform Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Platform</Label>
          <Select
            value={currentConfig.platform}
            onValueChange={(value: PlatformConfig['platform']) => 
              updateConfig({ platform: value, customPlatform: value === 'other' ? currentConfig.customPlatform : undefined })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="shopify">Shopify</SelectItem>
              <SelectItem value="ezsite">EZsite</SelectItem>
              <SelectItem value="thrivecart">Thrivecart</SelectItem>
              <SelectItem value="ghl">GoHighLevel (GHL)</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {currentConfig.platform === 'other' && (
          <div className="space-y-2">
            <Label>Custom Platform Name</Label>
            <Input
              placeholder="Enter custom platform name"
              value={currentConfig.customPlatform || ''}
              onChange={(e) => updateConfig({ customPlatform: e.target.value })}
            />
          </div>
        )}

        <div className="space-y-2">
          <Label>Store URL</Label>
          <Input
            type="url"
            placeholder="https://your-store.com"
            value={currentConfig.url || ''}
            onChange={(e) => updateConfig({ url: e.target.value })}
          />
        </div>

        <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-900">
          <div className="space-y-1">
            <p><strong>Platform Setup Tips:</strong></p>
            <ul className="list-disc list-inside space-y-0.5 ml-2">
              {currentConfig.platform === 'shopify' && (
                <>
                  <li>Set up your Shopify account and select a plan</li>
                  <li>Choose a theme and customize your store design</li>
                  <li>Configure payment gateways (Shopify Payments, PayPal, etc.)</li>
                  <li>Set up shipping zones and rates</li>
                </>
              )}
              {currentConfig.platform === 'ezsite' && (
                <>
                  <li>Create your EZsite account and domain</li>
                  <li>Use drag-and-drop builder for page creation</li>
                  <li>Integrate payment processors</li>
                  <li>Set up email automation sequences</li>
                </>
              )}
              {currentConfig.platform === 'thrivecart' && (
                <>
                  <li>Configure cart settings and payment processors</li>
                  <li>Create product pages and sales funnels</li>
                  <li>Set up upsells and bump offers</li>
                  <li>Configure affiliate program if needed</li>
                </>
              )}
              {currentConfig.platform === 'ghl' && (
                <>
                  <li>Set up your GHL account and sub-account</li>
                  <li>Create funnels and landing pages</li>
                  <li>Configure CRM and pipeline</li>
                  <li>Set up automation workflows</li>
                </>
              )}
              {currentConfig.platform === 'other' && (
                <>
                  <li>Configure your platform according to documentation</li>
                  <li>Set up payment processing</li>
                  <li>Configure shipping if applicable</li>
                  <li>Test checkout process thoroughly</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
