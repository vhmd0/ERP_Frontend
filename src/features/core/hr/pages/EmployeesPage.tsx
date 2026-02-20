import { useState } from 'react'
import { Plus } from 'lucide-react'
import { PageHeader } from '@/shared/components/PageHeader'
import { DataTable } from '@/shared/components/DataTable'
import { StatusBadge } from '@/shared/components/StatusBadge'
import { ConfirmDialog } from '@/shared/components/ConfirmDialog'
import { Button } from '@/components/ui/button'
import { useEmployees, useDeleteEmployee } from '../api/hrApi'
import type { Employee } from '../types'

export default function EmployeesPage() {
  const { data: employees = [], isLoading } = useEmployees()
  const { mutate: deleteEmployee } = useDeleteEmployee()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null)

  const handleDelete = (employee: Employee) => {
    setEmployeeToDelete(employee)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (employeeToDelete) {
      deleteEmployee(employeeToDelete.id)
      setDeleteDialogOpen(false)
      setEmployeeToDelete(null)
    }
  }

  const columns = [
    {
      id: 'firstName' as keyof Employee,
      label: 'Name',
      format: (_: string, row?: Employee) => `${row?.firstName} ${row?.lastName}`,
    },
    { id: 'email' as keyof Employee, label: 'Email' },
    { id: 'phone' as keyof Employee, label: 'Phone' },
    { id: 'jobTitle' as keyof Employee, label: 'Job Title' },
    { id: 'department' as keyof Employee, label: 'Department' },
    {
      id: 'status' as keyof Employee,
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
        title="Employees"
        breadcrumbs={[{ label: 'HR' }, { label: 'Employees' }]}
        actions={
          <Button>
            <Plus className="h-4 w-4" />
            Add Employee
          </Button>
        }
      />
      <DataTable columns={columns} data={employees} onDelete={handleDelete} />
      <ConfirmDialog
        open={deleteDialogOpen}
        title="Delete Employee"
        message="Are you sure you want to delete this employee?"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteDialogOpen(false)}
      />
    </div>
  )
}
