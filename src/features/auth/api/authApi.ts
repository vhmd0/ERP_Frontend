import { useApiMutation } from '@/hooks/use-query'
import type { LoginRequest, LoginResponse, User } from '../types'

export function useLogin() {
  return useApiMutation<LoginResponse, LoginRequest>('/auth/login', 'POST')
}

export function useLogout() {
  return useApiMutation<void, void>('/auth/logout', 'POST')
}

export type { User, LoginRequest, LoginResponse }
