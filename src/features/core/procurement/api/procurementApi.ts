import { useApiQuery, useApiMutation } from '@/hooks/use-query'
import type { Vendor } from '../types'

export function useVendors() {
  return useApiQuery<Vendor[]>(['vendors'], '/procurement/vendors')
}

export function useVendor(id: string) {
  return useApiQuery<Vendor>(['vendor', id], `/procurement/vendors/${id}`)
}

export function useCreateVendor() {
  return useApiMutation<Vendor, Partial<Vendor>>('/procurement/vendors', 'POST')
}

export function useDeleteVendor() {
  return useApiMutation<void, string>('/procurement/vendors', 'DELETE')
}
