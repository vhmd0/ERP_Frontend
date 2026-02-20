import { Plus } from 'lucide-react'
import { PageHeader } from '@/shared/components/PageHeader'
import { DataTable } from '@/shared/components/DataTable'
import { StatusBadge } from '@/shared/components/StatusBadge'
import { Button } from '@/components/ui/button'
import { useVendors } from '../api/procurementApi'
import type { Vendor } from '../types'

export default function VendorsPage() {
  const { data: vendors = [], isLoading } = useVendors()

  const columns = [
    { id: 'name' as keyof Vendor, label: 'Vendor Name' },
    { id: 'email' as keyof Vendor, label: 'Email' },
    { id: 'phone' as keyof Vendor, label: 'Phone' },
    { id: 'category' as keyof Vendor, label: 'Category' },
    {
      id: 'rating' as keyof Vendor,
      label: 'Rating',
      format: (value: number) => `${value}/5`,
    },
    {
      id: 'status' as keyof Vendor,
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
        title="Vendors"
        breadcrumbs={[{ label: 'Procurement' }, { label: 'Vendors' }]}
        actions={
          <Button>
            <Plus className="h-4 w-4" />
            Add Vendor
          </Button>
        }
      />
      <DataTable columns={columns} data={vendors} />
    </div>
  )
}
