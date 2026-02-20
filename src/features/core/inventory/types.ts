export interface Item {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  unitPrice: number;
  reorderLevel: number;
  warehouseId: string;
  warehouseName: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export interface Warehouse {
  id: string;
  name: string;
  location: string;
  capacity: number;
  currentStock: number;
  isActive: boolean;
}