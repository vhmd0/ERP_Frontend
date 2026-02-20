import { useApiQuery, useApiMutation } from '@/hooks/use-query'
import type { Customer, SalesOrder } from '../types'

export function useCustomers() {
  return useApiQuery<Customer[]>(['customers'], '/sales/customers')
}

export function useSalesOrders() {
  return useApiQuery<SalesOrder[]>(['salesOrders'], '/sales/orders')
}

export function useCreateCustomer() {
  return useApiMutation<Customer, Partial<Customer>>('/sales/customers', 'POST')
}

export function useDeleteCustomer() {
  return useApiMutation<void, string>('/sales/customers', 'DELETE')
}
