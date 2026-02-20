import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

type StatusType = 'active' | 'inactive' | 'pending' | 'approved' | 'rejected' | 'in-stock' | 'low-stock' | 'out-of-stock' | 'shipped' | 'delivered' | 'cancelled'

interface StatusBadgeProps {
  status: StatusType
  label?: string
  className?: string
}

const statusVariants: Record<StatusType, 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning'> = {
  active: 'success',
  inactive: 'secondary',
  pending: 'warning',
  approved: 'success',
  rejected: 'destructive',
  'in-stock': 'success',
  'low-stock': 'warning',
  'out-of-stock': 'destructive',
  shipped: 'default',
  delivered: 'success',
  cancelled: 'destructive',
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  return (
    <Badge variant={statusVariants[status]} className={cn('capitalize', className)}>
      {label || status.replace('-', ' ')}
    </Badge>
  )
}
