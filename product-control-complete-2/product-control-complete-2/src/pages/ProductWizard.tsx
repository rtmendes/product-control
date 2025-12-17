import { ProductTypeSelector } from '@/components/products/ProductTypeSelector';

export default function ProductWizard() {
  const handleSelectType = (type: string) => {
    console.log('Selected product type:', type);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Product</h1>
        <ProductTypeSelector onSelect={handleSelectType} />
      </div>
    </div>
  );
}
