export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive';
}

export interface SalesOrder {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  orderDate: string;
  totalAmount: number;
  status: 'pending' | 'approved' | 'shipped' | 'delivered' | 'cancelled';
}