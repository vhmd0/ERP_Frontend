import { Plus } from 'lucide-react'
import { PageHeader } from '@/shared/components/PageHeader'
import { DataTable } from '@/shared/components/DataTable'
import { StatusBadge } from '@/shared/components/StatusBadge'
import { Button } from '@/components/ui/button'
import { useCustomers } from '../api/salesApi'
import type { Customer } from '../types'

export default function CustomersPage() {
  const { data: customers = [], isLoading } = useCustomers()

  const columns = [
    { id: 'name' as keyof Customer, label: 'Customer Name' },
    { id: 'email' as keyof Customer, label: 'Email' },
    { id: 'phone' as keyof Customer, label: 'Phone' },
    { id: 'company' as keyof Customer, label: 'Company' },
    { id: 'totalOrders' as keyof Customer, label: 'Total Orders' },
    {
      id: 'totalSpent' as keyof Customer,
      label: 'Total Spent',
      format: (value: number) => `$${value.toLocaleString()}`,
    },
    {
      id: 'status' as keyof Customer,
      label: 'Status',
      format: (value: string) => <StatusBadge status={value as 'active' | 'inactive'} />,
    },
  ]

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div>
      <PageHeader
        title="Customers"
        breadcrumbs={[{ label: 'Sales' }, { label: 'Customers' }]}
        actions={
          <Button>
            <Plus className="h-4 w-4" />
            Add Customer
          </Button>
        }
      />
      <DataTable columns={columns} data={customers} />
    </div>
  )
}
