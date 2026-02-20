import { Plus } from 'lucide-react'
import { PageHeader } from '@/shared/components/PageHeader'
import { DataTable } from '@/shared/components/DataTable'
import { StatusBadge } from '@/shared/components/StatusBadge'
import { Button } from '@/components/ui/button'
import { useSalesOrders } from '../api/salesApi'
import type { SalesOrder } from '../types'

export default function OrdersPage() {
  const { data: orders = [], isLoading } = useSalesOrders()

  const columns = [
    { id: 'orderNumber' as keyof SalesOrder, label: 'Order #' },
    { id: 'customerName' as keyof SalesOrder, label: 'Customer' },
    {
      id: 'orderDate' as keyof SalesOrder,
      label: 'Order Date',
      format: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      id: 'totalAmount' as keyof SalesOrder,
      label: 'Amount',
      format: (value: number) => `$${value.toLocaleString()}`,
    },
    {
      id: 'status' as keyof SalesOrder,
      label: 'Status',
      format: (value: string) => (
        <StatusBadge status={value as 'pending' | 'approved' | 'shipped' | 'delivered' | 'cancelled'} />
      ),
    },
  ]

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div>
      <PageHeader
        title="Sales Orders"
        breadcrumbs={[{ label: 'Sales' }, { label: 'Orders' }]}
        actions={
          <Button>
            <Plus className="h-4 w-4" />
            New Order
          </Button>
        }
      />
      <DataTable columns={columns} data={orders} />
    </div>
  )
}
