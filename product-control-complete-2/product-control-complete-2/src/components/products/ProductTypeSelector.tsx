import React from 'react';

export interface ProductType {
  id: string;
  name: string;
  description: string;
}

interface Props {
  onSelect: (type: string) => void;
}

export const ProductTypeSelector: React.FC<Props> = ({ onSelect }) => {
  const types: ProductType[] = [
    { id: 'physical-pod', name: 'Physical POD Product', description: 'Print-on-demand merchandise' },
    { id: 'digital-offer', name: 'Digital Offer', description: 'Online courses, ebooks' },
    { id: 'bundle', name: 'Product Bundle', description: 'Multiple products packaged together' },
    { id: 'service', name: 'Service', description: 'Consulting, coaching' }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {types.map(type => (
        <div key={type.id} onClick={() => onSelect(type.id)} 
             className="p-6 border rounded-lg cursor-pointer hover:bg-gray-50">
          <h3 className="font-bold text-lg">{type.name}</h3>
          <p className="text-gray-600">{type.description}</p>
        </div>
      ))}
    </div>
  );
};
