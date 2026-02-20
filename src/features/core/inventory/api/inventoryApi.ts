import { useApiQuery, useApiMutation } from '@/hooks/use-query'
import type { Item } from '../types'

export function useItems() {
  return useApiQuery<Item[]>(['items'], '/inventory/items')
}

export function useItem(id: string) {
  return useApiQuery<Item>(['item', id], `/inventory/items/${id}`)
}

export function useCreateItem() {
  return useApiMutation<Item, Partial<Item>>('/inventory/items', 'POST')
}

export function useDeleteItem() {
  return useApiMutation<void, string>('/inventory/items', 'DELETE')
}
