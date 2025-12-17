import React from 'react';

export const Overview: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Product Control Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-6 bg-white border rounded-lg">
          <h3 className="text-gray-600">Total Products</h3>
          <p className="text-3xl font-bold">24</p>
        </div>
        <div className="p-6 bg-white border rounded-lg">
          <h3 className="text-gray-600">Assets Generated</h3>
          <p className="text-3xl font-bold">1,240</p>
        </div>
        <div className="p-6 bg-white border rounded-lg">
          <h3 className="text-gray-600">Revenue</h3>
          <p className="text-3xl font-bold">$45,200</p>
        </div>
      </div>
    </div>
  );
};
