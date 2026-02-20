import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query'
import { api } from '@/lib/api-client'

export function useApiQuery<T>(
  queryKey: unknown[],
  url: string,
  options?: Omit<UseQueryOptions<T, Error, T>, 'queryKey' | 'queryFn'>
) {
  return useQuery<T, Error>({
    queryKey,
    queryFn: () => api.get<T>(url),
    ...options,
  })
}

export function useApiMutation<T, TData = unknown>(
  url: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST',
  options?: Omit<UseMutationOptions<T, Error, TData>, 'mutationFn'>
) {
  const queryClient = useQueryClient()

  return useMutation<T, Error, TData>({
    mutationFn: (data: TData) => {
      switch (method) {
        case 'POST':
          return api.post<T>(url, data)
        case 'PUT':
          return api.put<T>(url, data)
        case 'PATCH':
          return api.patch<T>(url, data)
        case 'DELETE':
          return api.delete<T>(url)
        default:
          return api.post<T>(url, data)
      }
    },
    ...options,
    onSuccess: (...args) => {
      queryClient.invalidateQueries()
      options?.onSuccess?.(...args)
    },
  })
}

export { useQuery, useMutation, useQueryClient }
