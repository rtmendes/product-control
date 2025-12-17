export interface Product {
  id: string;
  name: string;
  description: string;
  productType: string;
  status: 'draft' | 'published';
  createdAt: Date;
}

export interface Asset {
  id: string;
  productId: string;
  assetType: string;
  content: any;
  status: string;
}
