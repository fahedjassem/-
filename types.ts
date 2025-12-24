
export enum AppPages {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  DASHBOARD = 'DASHBOARD',
  INVENTORY = 'INVENTORY',
  EMPLOYEES = 'EMPLOYEES',
  SALES = 'SALES',
  REPORTS = 'REPORTS',
  BACKUP = 'BACKUP'
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  nationalId?: string;
  address?: string;
  socialStatus?: 'single' | 'married' | 'divorced' | 'widowed';
  salary?: number;
  role: 'admin' | 'manager' | 'senior_tech' | 'junior_tech' | 'sales' | 'accountant' | 'employee';
  specialty?: 'programming' | 'cutting' | 'smart_locks' | 'auto_unlock' | 'sales' | 'all';
  joinDate?: string;
  password?: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'house' | 'car' | 'programming' | 'accessory';
  price: number;
  cost: number;
  stock: number;
  code: string;
}

export interface SaleItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Sale {
  id: string;
  date: string;
  items: SaleItem[];
  total: number;
  discount: number;
  tax: number;
  grandTotal: number;
  employeeId: string;
  employeeName: string;
}
