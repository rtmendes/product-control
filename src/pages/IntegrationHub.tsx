export default function IntegrationHub() {
  const integrations = [
    {
      name: 'Shopify',
      description: 'Sync products and inventory',
      status: 'Not Connected',
      logo: '🛍️'
    },
    {
      name: 'Stripe',
      description: 'Track payment and revenue',
      status: 'Not Connected',
      logo: '💳'
    },
    {
      name: 'Klaviyo',
      description: 'Email marketing automation',
      status: 'Not Connected',
      logo: '📧'
    },
    {
      name: 'Google Ads',
      description: 'Advertising campaigns',
      status: 'Not Connected',
      logo: '📊'
    },
    {
      name: 'Meta Ads',
      description: 'Facebook & Instagram ads',
      status: 'Not Connected',
      logo: '📱'
    },
    {
      name: 'Airtable',
      description: 'Project management & data',
      status: 'Not Connected',
      logo: '📋'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Integrations</h1>
        <p className="text-slate-600 mt-2">Connect your tools and platforms to automate workflows</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map((integration) => (
          <div
            key={integration.name}
            className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">{integration.logo}</div>
              <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded">
                {integration.status}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">
              {integration.name}
            </h3>
            <p className="text-sm text-slate-600 mb-4">{integration.description}</p>
            <button className="w-full px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
              Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
