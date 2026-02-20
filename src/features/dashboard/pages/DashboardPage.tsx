import { useState } from 'react'
import {
  Users,
  ShoppingCart,
  Package,
  TrendingUp,
  ArrowRight,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { PageHeader } from '@/shared/components/PageHeader'
import { StatsCard } from '@/shared/components/StatsCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// --- Mock data -----------------------------------------------------------

const visitorData30 = [
  { date: 'Jun 2', visitors: 186, returning: 80 },
  { date: 'Jun 4', visitors: 305, returning: 200 },
  { date: 'Jun 6', visitors: 237, returning: 120 },
  { date: 'Jun 8', visitors: 273, returning: 190 },
  { date: 'Jun 10', visitors: 209, returning: 130 },
  { date: 'Jun 12', visitors: 314, returning: 140 },
  { date: 'Jun 14', visitors: 280, returning: 200 },
  { date: 'Jun 16', visitors: 250, returning: 160 },
  { date: 'Jun 18', visitors: 330, returning: 210 },
  { date: 'Jun 20', visitors: 290, returning: 180 },
  { date: 'Jun 22', visitors: 310, returning: 220 },
  { date: 'Jun 24', visitors: 270, returning: 170 },
  { date: 'Jun 26', visitors: 340, returning: 230 },
  { date: 'Jun 28', visitors: 300, returning: 190 },
  { date: 'Jun 30', visitors: 320, returning: 210 },
]

const visitorData7 = visitorData30.slice(-7)
const visitorData90 = [
  { date: 'Apr', visitors: 2800, returning: 1200 },
  { date: 'May', visitors: 3200, returning: 1500 },
  { date: 'Jun', visitors: 2900, returning: 1400 },
]

const quickLinks = [
  { name: 'Companies', href: '/companies', icon: Package },
  { name: 'Employees', href: '/hr', icon: Users },
  { name: 'Customers', href: '/sales/customers', icon: ShoppingCart },
  { name: 'Analytics', href: '/analytics/kpis', icon: TrendingUp },
]

const recentActivities = [
  { id: 1, action: 'New customer added', time: '2 minutes ago', type: 'success' as const },
  { id: 2, action: 'Order #1234 completed', time: '15 minutes ago', type: 'info' as const },
  { id: 3, action: 'Low stock alert: Item #567', time: '1 hour ago', type: 'warning' as const },
  { id: 4, action: 'Employee profile updated', time: '3 hours ago', type: 'info' as const },
]

// --- Helpers --------------------------------------------------------------

const timePeriods = [
  { label: 'Last 3 months', key: '3m' },
  { label: 'Last 30 days', key: '30d' },
  { label: 'Last 7 days', key: '7d' },
] as const

type PeriodKey = (typeof timePeriods)[number]['key']

const chartDataMap: Record<PeriodKey, typeof visitorData30> = {
  '3m': visitorData90,
  '30d': visitorData30,
  '7d': visitorData7,
}

// --- Component ------------------------------------------------------------

export default function DashboardPage() {
  const [activePeriod, setActivePeriod] = useState<PeriodKey>('30d')

  return (
    <div className="space-y-4 sm:space-y-6">
      <PageHeader title="Dashboard" />

      {/* ── Stats Cards ────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatsCard
          title="Total Revenue"
          value="$1,250.00"
          trend={12.5}
          trendLabel="Trending up this month"
          subtitle="Visitors for the last 6 months"
        />
        <StatsCard
          title="New Customers"
          value="1,234"
          trend={-20}
          trendLabel="Down 20% this period"
          subtitle="Acquisition needs attention"
        />
        <StatsCard
          title="Active Accounts"
          value="45,678"
          trend={12.5}
          trendLabel="Strong user retention"
          subtitle="Engagement exceed targets"
        />
        <StatsCard
          title="Growth Rate"
          value="4.5%"
          trend={4.5}
          trendLabel="Steady performance"
          subtitle="Meets growth projections"
        />
      </div>

      {/* ── Area Chart ─────────────────────────────────────── */}
      <Card>
        <CardHeader className="flex-row items-center justify-between pb-2 space-y-0">
          <div>
            <CardTitle className="text-base sm:text-lg">Total Visitors</CardTitle>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Total for the last{' '}
              {activePeriod === '3m' ? '3 months' : activePeriod === '30d' ? '30 days' : '7 days'}
            </p>
          </div>
          <div className="flex items-center gap-1 rounded-lg border bg-muted/40 p-0.5">
            {timePeriods.map((p) => (
              <button
                key={p.key}
                onClick={() => setActivePeriod(p.key)}
                className={cn(
                  'rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap',
                  activePeriod === p.key
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="pt-0 pb-4">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart
              data={chartDataMap[activePeriod]}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="gradientVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.6132 0.2294 291.7437)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="oklch(0.6132 0.2294 291.7437)" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="gradientReturning" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.7459 0.1483 156.4499)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="oklch(0.7459 0.1483 156.4499)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                className="text-xs fill-muted-foreground"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                className="text-xs fill-muted-foreground"
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--card)',
                  color: 'var(--card-foreground)',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="visitors"
                stroke="oklch(0.6132 0.2294 291.7437)"
                strokeWidth={2}
                fill="url(#gradientVisitors)"
              />
              <Area
                type="monotone"
                dataKey="returning"
                stroke="oklch(0.7459 0.1483 156.4499)"
                strokeWidth={2}
                fill="url(#gradientReturning)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ── Quick Actions + Activity ───────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-3 sm:gap-6">
        <Card className="lg:col-span-4">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3 sm:space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between gap-2 border-b pb-3 sm:pb-4 last:border-0 last:pb-0"
                >
                  <div className="space-y-0.5 sm:space-y-1 min-w-0 flex-1">
                    <p className="text-xs sm:text-sm font-medium leading-none truncate">
                      {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  <div
                    className={cn(
                      'h-2 w-2 rounded-full flex-shrink-0',
                      activity.type === 'success'
                        ? 'bg-green-500'
                        : activity.type === 'warning'
                          ? 'bg-yellow-500'
                          : 'bg-blue-500'
                    )}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader className="pb-2 sm:pb-4">
            <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid gap-1 sm:gap-2">
              {quickLinks.map((link) => (
                <Link key={link.name} to={link.href}>
                  <Button
                    variant="ghost"
                    className="w-full justify-between h-10 sm:h-auto"
                  >
                    <span className="flex items-center gap-2">
                      <link.icon className="h-4 w-4" />
                      <span className="text-xs sm:text-sm">{link.name}</span>
                    </span>
                    <ArrowRight className="h-4 w-4 hidden sm:block" />
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
