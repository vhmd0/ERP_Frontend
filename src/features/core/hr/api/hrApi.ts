import { useApiQuery, useApiMutation } from '@/hooks/use-query'
import type { Employee } from '../types'

export function useEmployees() {
  return useApiQuery<Employee[]>(['employees'], '/hr/employees')
}

export function useEmployee(id: string) {
  return useApiQuery<Employee>(['employee', id], `/hr/employees/${id}`)
}

export function useCreateEmployee() {
  return useApiMutation<Employee, Partial<Employee>>('/hr/employees', 'POST')
}

export function useDeleteEmployee() {
  return useApiMutation<void, string>('/hr/employees', 'DELETE')
}
