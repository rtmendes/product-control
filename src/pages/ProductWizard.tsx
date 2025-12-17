import { ProductWizard as ProductWizardComponent } from '@/components/products/ProductWizard';

export default function ProductWizard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Create New Product</h1>
        <p className="text-slate-600 mt-2">Follow the steps to create and launch your product with AI assistance</p>
      </div>
      <ProductWizardComponent />
    </div>
  );
}
