import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Toaster } from '@/components/ui/toaster';
import { ModernSidebar } from '@/components/layout/ModernSidebar';
import Dashboard from '@/pages/Dashboard';
import ProductWizard from '@/pages/ProductWizard';
import BrandSettings from '@/pages/BrandSettings';
import RevenueTracker from '@/pages/RevenueTracker';
import IntegrationHub from '@/pages/IntegrationHub';
import AssetLibrary from '@/pages/AssetLibrary';
import AIPrompts from '@/pages/AIPrompts';
import Workflows from '@/pages/Workflows';
import Projects from '@/pages/Projects';
import LaunchFlow from '@/pages/LaunchFlow';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <div className="flex h-screen bg-slate-50">
          <ModernSidebar />
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto p-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/create-product" element={<ProductWizard />} />
                <Route path="/brand-settings" element={<BrandSettings />} />
                <Route path="/revenue" element={<RevenueTracker />} />
                <Route path="/integrations" element={<IntegrationHub />} />
                <Route path="/assets" element={<AssetLibrary />} />
                <Route path="/ai-prompts" element={<AIPrompts />} />
                <Route path="/workflows" element={<Workflows />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/launchflow" element={<LaunchFlow />} />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
      <Toaster />
    </DndProvider>
  );
}

export default App;
