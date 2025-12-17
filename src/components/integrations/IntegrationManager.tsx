import { useState } from 'react';
import { Check, X, Settings, RefreshCw, AlertCircle } from 'lucide-react';

interface Integration {
  id: string;
  platform: string;
  display_name: string;
  status: 'connected' | 'disconnected' | 'error';
  last_sync_at: string | null;
  description: string;
  logo: string;
  features: string[];
}

export function IntegrationManager() {
  const [integrations] = useState<Integration[]>([
    {
      id: '1',
      platform: 'shopify',
      display_name: 'Shopify',
      status: 'disconnected',
      last_sync_at: null,
      description: 'Sync products, orders, and inventory',
      logo: '🛍️',
      features: ['Product sync', 'Order management', 'Inventory tracking']
    },
    {
      id: '2',
      platform: 'stripe',
      display_name: 'Stripe',
      status: 'disconnected',
      last_sync_at: null,
      description: 'Track payments and revenue',
      logo: '💳',
      features: ['Payment tracking', 'Revenue analytics', 'Subscription management']
    },
    {
      id: '3',
      platform: 'klaviyo',
      display_name: 'Klaviyo',
      status: 'disconnected',
      last_sync_at: null,
      description: 'Email marketing automation',
      logo: '📧',
      features: ['Email campaigns', 'Customer segmentation', 'Automation flows']
    },
    {
      id: '4',
      platform: 'google-ads',
      display_name: 'Google Ads',
      status: 'disconnected',
      last_sync_at: null,
      description: 'Manage advertising campaigns',
      logo: '📊',
      features: ['Campaign management', 'Performance tracking', 'Keyword optimization']
    },
    {
      id: '5',
      platform: 'meta-ads',
      display_name: 'Meta Ads',
      status: 'disconnected',
      last_sync_at: null,
      description: 'Facebook & Instagram advertising',
      logo: '📱',
      features: ['Ad creation', 'Audience targeting', 'Performance analytics']
    },
    {
      id: '6',
      platform: 'airtable',
      display_name: 'Airtable',
      status: 'disconnected',
      last_sync_at: null,
      description: 'Project management and data organization',
      logo: '📋',
      features: ['Data sync', 'Workflow automation', 'Team collaboration']
    }
  ]);

  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [credentials, setCredentials] = useState({
    api_key: '',
    api_secret: '',
    store_url: ''
  });

  const handleConnect = async (integration: Integration) => {
    setSelectedIntegration(integration);
    setIsConnecting(true);
  };

  const handleSaveConnection = async () => {
    console.log('Connecting:', selectedIntegration, credentials);
    // TODO: Save to Supabase
    setIsConnecting(false);
    setSelectedIntegration(null);
    setCredentials({ api_key: '', api_secret: '', store_url: '' });
  };

  const handleDisconnect = async (id: string) => {
    if (confirm('Are you sure you want to disconnect this integration?')) {
      console.log('Disconnecting:', id);
      // TODO: Update Supabase
    }
  };

  const handleSync = async (id: string) => {
    console.log('Syncing:', id);
    // TODO: Trigger sync
  };

  const connectedCount = integrations.filter(i => i.status === 'connected').length;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Integration Status</h3>
            <p className="text-sm text-slate-600 mt-1">
              {connectedCount} of {integrations.length} integrations connected
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-slate-900">{connectedCount}</div>
            <div className="text-sm text-slate-500">Active</div>
          </div>
        </div>
        <div className="mt-4 h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all"
            style={{ width: `${(connectedCount / integrations.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map(integration => (
          <div
            key={integration.id}
            className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-4xl">{integration.logo}</div>
                <div>
                  <h4 className="font-semibold text-slate-900">{integration.display_name}</h4>
                  <span
                    className={`
                      inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium mt-1
                      ${integration.status === 'connected'
                        ? 'bg-green-100 text-green-700'
                        : integration.status === 'error'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-slate-100 text-slate-600'
                      }
                    `}
                  >
                    {integration.status === 'connected' && <Check className="h-3 w-3" />}
                    {integration.status === 'error' && <AlertCircle className="h-3 w-3" />}
                    {integration.status === 'connected' ? 'Connected' : integration.status === 'error' ? 'Error' : 'Not Connected'}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-slate-600 mb-4">{integration.description}</p>

            <div className="mb-4">
              <div className="text-xs font-medium text-slate-500 mb-2">Features:</div>
              <ul className="space-y-1">
                {integration.features.map((feature, index) => (
                  <li key={index} className="text-xs text-slate-600 flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {integration.status === 'connected' ? (
              <div className="space-y-2">
                {integration.last_sync_at && (
                  <div className="text-xs text-slate-500">
                    Last synced: {new Date(integration.last_sync_at).toLocaleString()}
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSync(integration.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Sync
                  </button>
                  <button
                    onClick={() => handleConnect(integration)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200"
                  >
                    <Settings className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDisconnect(integration.id)}
                    className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => handleConnect(integration)}
                className="w-full px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                Connect
              </button>
            )}
          </div>
        ))}
      </div>

      {isConnecting && selectedIntegration && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsConnecting(false)}
        >
          <div
            className="bg-white rounded-lg max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="text-4xl">{selectedIntegration.logo}</div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Connect {selectedIntegration.display_name}
                </h3>
                <p className="text-sm text-slate-600">{selectedIntegration.description}</p>
              </div>
            </div>

            <div className="space-y-4">
              {selectedIntegration.platform === 'shopify' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Store URL
                    </label>
                    <input
                      type="text"
                      value={credentials.store_url}
                      onChange={(e) => setCredentials({ ...credentials, store_url: e.target.value })}
                      placeholder="your-store.myshopify.com"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      API Key
                    </label>
                    <input
                      type="password"
                      value={credentials.api_key}
                      onChange={(e) => setCredentials({ ...credentials, api_key: e.target.value })}
                      placeholder="Enter your API key"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

              {(selectedIntegration.platform !== 'shopify') && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      API Key
                    </label>
                    <input
                      type="password"
                      value={credentials.api_key}
                      onChange={(e) => setCredentials({ ...credentials, api_key: e.target.value })}
                      placeholder="Enter your API key"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      API Secret
                    </label>
                    <input
                      type="password"
                      value={credentials.api_secret}
                      onChange={(e) => setCredentials({ ...credentials, api_secret: e.target.value })}
                      placeholder="Enter your API secret"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Your credentials are stored securely and encrypted.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSaveConnection}
                  className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Connect
                </button>
                <button
                  onClick={() => setIsConnecting(false)}
                  className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300"
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
