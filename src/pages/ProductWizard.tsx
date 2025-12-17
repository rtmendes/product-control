import { ProductTypeSelector } from '@/components/products/ProductTypeSelector';

export default function ProductWizard() {
  const handleSelectType = (type: string) => {
    console.log('Selected product type:', type);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-3xl font-bold text-slate-900">Create New Product</h1>
      <ProductTypeSelector onSelect={handleSelectType} />
    </div>
  );
}
