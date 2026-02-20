import { useApiQuery, useApiMutation } from '@/hooks/use-query'
import type { Company } from '../types'

export function useCompanies() {
  return useApiQuery<Company[]>(['companies'], '/companies')
}

export function useCompany(id: string) {
  return useApiQuery<Company>(['company', id], `/companies/${id}`)
}

export function useCreateCompany() {
  return useApiMutation<Company, Partial<Company>>('/companies', 'POST')
}

export function useUpdateCompany() {
  return useApiMutation<Company, { id: string; data: Partial<Company> }>(
    '/companies',
    'PUT'
  )
}

export function useDeleteCompany() {
  return useApiMutation<void, string>('/companies', 'DELETE')
}
