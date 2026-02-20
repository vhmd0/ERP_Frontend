import { Plus } from 'lucide-react'
import { PageHeader } from '@/shared/components/PageHeader'
import { DataTable } from '@/shared/components/DataTable'
import { StatusBadge } from '@/shared/components/StatusBadge'
import { Button } from '@/components/ui/button'
import { useItems } from '../api/inventoryApi'
import type { Item } from '../types'

export default function InventoryPage() {
  const { data: items = [], isLoading } = useItems()

  const columns = [
    { id: 'name' as keyof Item, label: 'Item Name' },
    { id: 'sku' as keyof Item, label: 'SKU' },
    { id: 'category' as keyof Item, label: 'Category' },
    { id: 'quantity' as keyof Item, label: 'Quantity' },
    {
      id: 'unitPrice' as keyof Item,
      label: 'Price',
      format: (value: number) => `$${value.toFixed(2)}`,
    },
    { id: 'warehouseName' as keyof Item, label: 'Warehouse' },
    {
      id: 'status' as keyof Item,
      label: 'Status',
      format: (value: string) => (
        <StatusBadge status={value as 'in-stock' | 'low-stock' | 'out-of-stock'} />
      ),
    },
  ]

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div>
      <PageHeader
        title="Inventory"
        breadcrumbs={[{ label: 'Inventory' }, { label: 'Items' }]}
        actions={
          <Button>
            <Plus className="h-4 w-4" />
            Add Item
          </Button>
        }
      />
      <DataTable columns={columns} data={items} />
    </div>
  )
}
