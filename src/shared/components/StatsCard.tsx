import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  trend?: number
  trendLabel?: string
  subtitle?: string
  icon?: React.ReactNode
  className?: string
}

export function StatsCard({
  title,
  value,
  trend,
  trendLabel,
  subtitle,
  icon,
  className,
}: StatsCardProps) {
  const isPositive = trend !== undefined && trend > 0

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">
            {title}
          </p>
          {trend !== undefined && (
            <div
              className={cn(
                'flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium shrink-0',
                isPositive
                  ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                  : 'bg-red-500/10 text-red-600 dark:text-red-400'
              )}
            >
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {isPositive ? '+' : ''}
              {trend}%
            </div>
          )}
        </div>

        <p className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
          {value}
        </p>

        {(trendLabel || subtitle) && (
          <div className="space-y-0.5">
            {trendLabel && (
              <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                {trendLabel}
                {isPositive !== undefined && (
                  isPositive ? (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )
                )}
              </p>
            )}
            {subtitle && (
              <p className="text-xs text-muted-foreground/70">{subtitle}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
