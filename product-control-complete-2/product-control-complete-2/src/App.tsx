import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SignIn, SignUp, useUser } from '@clerk/clerk-react';
import { Toaster } from '@/components/ui/toaster';
import Dashboard from '@/pages/Dashboard';
import ProductWizard from '@/pages/ProductWizard';
import BrandSettings from '@/pages/BrandSettings';
import RevenueTracker from '@/pages/RevenueTracker';
import IntegrationHub from '@/pages/IntegrationHub';
import AssetLibrary from '@/pages/AssetLibrary';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
          <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />
          
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/create-product"
            element={
              <ProtectedRoute>
                <ProductWizard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/brand-settings"
            element={
              <ProtectedRoute>
                <BrandSettings />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/revenue"
            element={
              <ProtectedRoute>
                <RevenueTracker />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/integrations"
            element={
              <ProtectedRoute>
                <IntegrationHub />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/assets"
            element={
              <ProtectedRoute>
                <AssetLibrary />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
