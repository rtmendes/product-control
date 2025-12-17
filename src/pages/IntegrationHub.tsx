import { IntegrationManager } from '@/components/integrations/IntegrationManager';

export default function IntegrationHub() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Integrations</h1>
        <p className="text-slate-600 mt-2">Connect your tools and platforms to automate workflows</p>
      </div>
      <IntegrationManager />
    </div>
  );
}
