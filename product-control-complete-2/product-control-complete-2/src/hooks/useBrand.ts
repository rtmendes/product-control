import { useState, useEffect } from 'react';

export const useBrand = () => {
  const [brand, setBrand] = useState(null);

  const fetchBrand = async () => {
    const res = await fetch('/api/brand/guidelines');
    const data = await res.json();
    setBrand(data);
  };

  useEffect(() => { fetchBrand(); }, []);

  return { brand, refetch: fetchBrand };
};
