export interface Company {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  isActive: boolean;
  createdAt: string;
}

export interface CompanyFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}