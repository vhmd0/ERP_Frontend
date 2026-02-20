import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'

import LoginPage from '@/features/auth/pages/LoginPage'
import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import CompaniesPage from '@/features/core/company/pages/CompaniesPage'
import EmployeesPage from '@/features/core/hr/pages/EmployeesPage'
import InventoryPage from '@/features/core/inventory/pages/InventoryPage'
import CustomersPage from '@/features/core/sales/pages/CustomersPage'
import OrdersPage from '@/features/core/sales/pages/OrdersPage'
import VendorsPage from '@/features/core/procurement/pages/VendorsPage'
import KPIsPage from '@/features/analytics/pages/KPIsPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/hr" element={<EmployeesPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/sales/customers" element={<CustomersPage />} />
        <Route path="/sales/orders" element={<OrdersPage />} />
        <Route path="/procurement/vendors" element={<VendorsPage />} />
        <Route path="/analytics/kpis" element={<KPIsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
