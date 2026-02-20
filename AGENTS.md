# AGENTS.md

Guidelines for AI coding agents working in this ERP Frontend codebase.

## Build Commands

```bash
npm run dev          # Start development server (port 3000)
npm run build        # Type-check and build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint on all TS/TSX files
```

Note: No test framework is currently configured. Tests should be added using Vitest or Jest.

## Project Overview

This is an ERP (Enterprise Resource Planning) system frontend built with:
- **React 18** with TypeScript
- **Zustand** for state management
- **TanStack Query** for data fetching and caching
- **shadcn/ui** for UI components (Tailwind CSS + Radix UI)
- **lucide-react** for icons
- **React Router v6** for routing
- **Vite** as the build tool
- **Tailwind CSS v4** for styling

The frontend connects to an ASP.NET Core 8.0 backend API.

## Project Structure

```
src/
├── components/
│   └── ui/                # shadcn/ui components
├── features/              # Feature-based modules
│   ├── auth/              # Authentication
│   ├── dashboard/         # Main dashboard page
│   ├── core/              # Core business modules
│   │   ├── company/       # Company management
│   │   ├── hr/            # Human resources
│   │   ├── inventory/     # Inventory management
│   │   ├── sales/         # Sales (customers, orders)
│   │   └── procurement/   # Procurement (vendors)
│   └── analytics/         # Reports & analytics
├── shared/                # Shared utilities and components
│   ├── components/        # Reusable components
│   └── hooks/             # Custom React hooks
├── layouts/               # Layout components
│   ├── MainLayout.tsx
│   ├── AuthLayout.tsx
│   └── components/
│       ├── Header.tsx
│       └── Sidebar.tsx
├── stores/                # Zustand stores
│   ├── auth-store.ts
│   └── ui-store.ts
├── lib/                   # Utilities
│   ├── api-client.ts      # Axios-based API client
│   ├── query-client.ts    # TanStack Query configuration
│   └── utils.ts           # Utility functions (cn)
├── hooks/                 # Global hooks
│   └── use-query.ts       # TanStack Query hooks
├── routes/                # Route configuration
├── App.tsx
└── main.tsx
```

## Path Aliases

Configured in `tsconfig.json` and `vite.config.ts`:

```typescript
'@/*'        → './src/*'
'@features/*' → './src/features/*'
'@shared/*'   → './src/shared/*'
'@layouts/*'  → './src/layouts/*'
```

Always use path aliases instead of relative imports for cross-module references.

## Code Style Guidelines

### Imports

Order imports as follows (separated by blank lines):

1. React and React-related imports
2. Third-party libraries (lucide-react, TanStack Query, Router, etc.)
3. Internal aliases (using `@/`, `@features/`, etc.)
4. Relative imports (same directory)
5. Type imports (use `import type`)

```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/shared/components/DataTable';
import { useCompanies } from '../api/companyApi';
import type { Company } from '../types';
```

### Components

- **Page components**: Use `export default function PageName()`
- **Shared components**: Use `export function ComponentName()`
- Use functional components with hooks only
- Prefer named exports for reusable components

### TypeScript

- Use `interface` for object types, `type` for unions/intersections
- Export all types from a `types.ts` file in each feature
- Use strict typing; avoid `any` except where necessary for flexibility

```typescript
export interface Company {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
}
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `DataTable`, `PageHeader` |
| Functions | camelCase | `handleSubmit`, `onRowClick` |
| Variables | camelCase | `companies`, `isLoading` |
| Files (components) | PascalCase.tsx | `LoginPage.tsx` |
| Files (utilities) | camelCase.ts | `utils.ts` |
| Files (types) | lowercase | `types.ts` |
| Files (API) | camelCase with Api suffix | `companyApi.ts` |

### State Management (Zustand)

```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  token: string | null;
  setCredentials: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setCredentials: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    { name: 'auth-storage' }
  )
);
```

### Data Fetching (TanStack Query)

```typescript
import { useApiQuery, useApiMutation } from '@/hooks/use-query';
import type { Company } from '../types';

export function useCompanies() {
  return useApiQuery<Company[]>(['companies'], '/companies');
}

export function useCreateCompany() {
  return useApiMutation<Company, Partial<Company>>('/companies', 'POST');
}

// Usage in components:
const { data: companies, isLoading } = useCompanies();
const { mutate: createCompany } = useCreateCompany();
```

### shadcn/ui Styling

Use Tailwind CSS classes with the `cn()` utility for conditional styling:

```typescript
import { cn } from '@/lib/utils';

<div className={cn('flex items-center gap-2', isActive && 'bg-primary')}>
```

### File Organization Within Features

```
feature/
├── api/           # TanStack Query hooks
│   └── featureApi.ts
├── pages/         # Page components
│   └── FeaturePage.tsx
├── types.ts       # TypeScript interfaces/types
└── hooks.ts       # Feature-specific hooks (if needed)
```

## Environment Variables

Required environment variables in `.env.development`:

```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=ERP System
```

Access via `import.meta.env.VITE_VARIABLE_NAME`.

## Before Committing

1. Run `npm run lint` and fix all errors
2. Ensure TypeScript compiles without errors (`npm run build`)
3. Test the feature in the browser with `npm run dev`

## Backend Integration

- Backend runs on `http://localhost:5000` by default
- API endpoints follow REST conventions: `/api/{module}/{resource}`
- JWT authentication with Bearer token in Authorization header
- Tokens are stored in localStorage via Zustand persist middleware
