import { useState } from 'react'
import { Plus } from 'lucide-react'
import { PageHeader } from '@/shared/components/PageHeader'
import { DataTable } from '@/shared/components/DataTable'
import { StatusBadge } from '@/shared/components/StatusBadge'
import { ConfirmDialog } from '@/shared/components/ConfirmDialog'
import { Button } from '@/components/ui/button'
import { useCompanies, useDeleteCompany } from '../api/companyApi'
import type { Company } from '../types'

export default function CompaniesPage() {
  const { data: companies = [], isLoading } = useCompanies()
  const { mutate: deleteCompany } = useDeleteCompany()
  
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [companyToDelete, setCompanyToDelete] = useState<Company | null>(null)

  const handleDelete = (company: Company) => {
    setCompanyToDelete(company)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (companyToDelete) {
      deleteCompany(companyToDelete.id)
      setDeleteDialogOpen(false)
      setCompanyToDelete(null)
    }
  }

  const columns = [
    { id: 'name' as keyof Company, label: 'Company Name' },
    { id: 'email' as keyof Company, label: 'Email' },
    { id: 'phone' as keyof Company, label: 'Phone' },
    { id: 'address' as keyof Company, label: 'Address' },
    {
      id: 'isActive' as keyof Company,
      label: 'Status',
      format: (value: boolean) => <StatusBadge status={value ? 'active' : 'inactive'} />,
    },
  ]

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div>
      <PageHeader
        title="Companies"
        breadcrumbs={[{ label: 'Core' }, { label: 'Companies' }]}
        actions={
          <Button>
            <Plus className="h-4 w-4" />
            Add Company
          </Button>
        }
      />
      <DataTable columns={columns} data={companies} onDelete={handleDelete} />
      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete Company"
        message="Are you sure you want to delete this company? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteDialogOpen(false)}
      />
    </div>
  )
}
