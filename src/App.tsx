import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Dashboard from '@/pages/Dashboard';
import ProductWizard from '@/pages/ProductWizard';
import BrandSettings from '@/pages/BrandSettings';
import RevenueTracker from '@/pages/RevenueTracker';
import IntegrationHub from '@/pages/IntegrationHub';
import AssetLibrary from '@/pages/AssetLibrary';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create-product" element={<ProductWizard />} />
          <Route path="/brand-settings" element={<BrandSettings />} />
          <Route path="/revenue" element={<RevenueTracker />} />
          <Route path="/integrations" element={<IntegrationHub />} />
          <Route path="/assets" element={<AssetLibrary />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
