import { useState } from 'react'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  BarChart2,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { PageHeader } from '@/shared/components/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

// ── Data ──────────────────────────────────────────────────────────────────────

const monthlyData = [
  { month: 'Jan', revenue: 42000, orders: 240, customers: 180 },
  { month: 'Feb', revenue: 38000, orders: 198, customers: 155 },
  { month: 'Mar', revenue: 55000, orders: 320, customers: 210 },
  { month: 'Apr', revenue: 48000, orders: 280, customers: 195 },
  { month: 'May', revenue: 63000, orders: 390, customers: 260 },
  { month: 'Jun', revenue: 57000, orders: 350, customers: 240 },
  { month: 'Jul', revenue: 71000, orders: 420, customers: 295 },
  { month: 'Aug', revenue: 65000, orders: 380, customers: 270 },
]

const conversionData = [
  { month: 'Jan', rate: 3.2 },
  { month: 'Feb', rate: 2.8 },
  { month: 'Mar', rate: 4.1 },
  { month: 'Apr', rate: 3.7 },
  { month: 'May', rate: 4.8 },
  { month: 'Jun', rate: 4.3 },
  { month: 'Jul', rate: 5.2 },
  { month: 'Aug', rate: 4.9 },
]

// ── Sub-components ────────────────────────────────────────────────────────────

interface KpiCardProps {
  title: string
  value: string
  change: number
  changeLabel: string
  icon: React.ReactNode
  color: string
}

function KpiCard({ title, value, change, changeLabel, icon, color }: KpiCardProps) {
  const positive = change >= 0
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', color)}>
            {icon}
          </div>
          <span
            className={cn(
              'flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold',
              positive
                ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                : 'bg-red-500/10 text-red-600 dark:text-red-400'
            )}
          >
            {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {positive ? '+' : ''}{change}%
          </span>
        </div>
        <p className="text-2xl font-bold tracking-tight">{value}</p>
        <p className="text-sm font-medium text-muted-foreground mt-0.5">{title}</p>
        <p className="text-xs text-muted-foreground/60 mt-1">{changeLabel}</p>
      </CardContent>
    </Card>
  )
}

const tooltipStyle = {
  borderRadius: '10px',
  border: '1px solid var(--border)',
  backgroundColor: 'var(--card)',
  color: 'var(--card-foreground)',
  fontSize: '12px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function KPIsPage() {
  const [activeTab, setActiveTab] = useState<'revenue' | 'orders' | 'customers'>('revenue')

  const tabs = [
    { key: 'revenue', label: 'Revenue' },
    { key: 'orders',  label: 'Orders' },
    { key: 'customers', label: 'Customers' },
  ] as const

  return (
    <div className="space-y-6">
      <PageHeader
        title="Key Performance Indicators"
        breadcrumbs={[{ label: 'Analytics' }, { label: 'KPIs' }]}
      />

      {/* ── KPI Summary Cards ─────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <KpiCard
          title="Total Revenue"
          value="$439K"
          change={14.5}
          changeLabel="vs last 8 months"
          icon={<DollarSign className="h-5 w-5 text-violet-600 dark:text-violet-400" />}
          color="bg-violet-500/10"
        />
        <KpiCard
          title="Total Orders"
          value="2,578"
          change={8.2}
          changeLabel="vs last 8 months"
          icon={<ShoppingCart className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
          color="bg-blue-500/10"
        />
        <KpiCard
          title="New Customers"
          value="1,605"
          change={11.3}
          changeLabel="vs last 8 months"
          icon={<Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
          color="bg-emerald-500/10"
        />
        <KpiCard
          title="Avg. Conversion"
          value="4.1%"
          change={-2.4}
          changeLabel="vs last 8 months"
          icon={<BarChart2 className="h-5 w-5 text-amber-600 dark:text-amber-400" />}
          color="bg-amber-500/10"
        />
      </div>

      {/* ── Main Trend Chart ──────────────────────────────── */}
      <Card>
        <CardHeader className="flex-row items-center justify-between pb-2 space-y-0">
          <div>
            <CardTitle className="text-base sm:text-lg">Performance Trend</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">Jan – Aug overview</p>
          </div>
          <div className="flex items-center gap-1 rounded-lg border bg-muted/40 p-0.5">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={cn(
                  'rounded-md px-3 py-1 text-xs font-medium transition-colors',
                  activeTab === t.key
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="pt-0 pb-4">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="kpiGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.6132 0.2294 291.7437)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="oklch(0.6132 0.2294 291.7437)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} className="text-xs fill-muted-foreground" />
              <YAxis tickLine={false} axisLine={false} className="text-xs fill-muted-foreground" />
              <Tooltip contentStyle={tooltipStyle} />
              <Area
                type="monotone"
                dataKey={activeTab}
                stroke="oklch(0.6132 0.2294 291.7437)"
                strokeWidth={2.5}
                fill="url(#kpiGrad)"
                dot={{ r: 3, fill: 'oklch(0.6132 0.2294 291.7437)', strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* ── Bottom Row ────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

        {/* Orders Bar Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm sm:text-base">Orders by Month</CardTitle>
            <p className="text-xs text-muted-foreground">Monthly order volume comparison</p>
          </CardHeader>
          <CardContent className="pt-0 pb-4">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={monthlyData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} className="text-xs fill-muted-foreground" />
                <YAxis tickLine={false} axisLine={false} className="text-xs fill-muted-foreground" />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar
                  dataKey="orders"
                  fill="oklch(0.6132 0.2294 291.7437)"
                  radius={[4, 4, 0, 0]}
                  opacity={0.85}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conversion Rate Line Chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm sm:text-base">Conversion Rate</CardTitle>
            <p className="text-xs text-muted-foreground">Monthly % of visitors who converted</p>
          </CardHeader>
          <CardContent className="pt-0 pb-4">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={conversionData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} className="text-xs fill-muted-foreground" />
                <YAxis tickLine={false} axisLine={false} className="text-xs fill-muted-foreground" unit="%" />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`, 'Rate']} />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="oklch(0.7459 0.1483 156.4499)"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: 'oklch(0.7459 0.1483 156.4499)', strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
