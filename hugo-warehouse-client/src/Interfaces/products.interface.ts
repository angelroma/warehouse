export interface Product {
  id: number;
  categoryId: number;
  providerId: number;
  name: string;
  description: string;
  price: number;
  sku: string;
  color: string;
  size: number;
  weight: number;
  precision: number;
  brand: string;
  createdOn: Date;
  category?: any;
  operation: any[];
}