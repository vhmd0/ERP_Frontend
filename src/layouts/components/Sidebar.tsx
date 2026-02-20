import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Building2,
  Users,
  Package,
  ShoppingCart,
  Truck,
  BarChart3,
  Settings,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/stores/ui-store'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Companies', href: '/companies', icon: Building2 },
  { name: 'HR', href: '/hr', icon: Users },
  { name: 'Inventory', href: '/inventory', icon: Package },
  { name: 'Customers', href: '/sales/customers', icon: ShoppingCart },
  { name: 'Orders', href: '/sales/orders', icon: ShoppingCart },
  { name: 'Vendors', href: '/procurement/vendors', icon: Truck },
  { name: 'Analytics', href: '/analytics/kpis', icon: BarChart3 },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
  isMobile?: boolean
}

export function Sidebar({ isOpen = true, onClose, isMobile = false }: SidebarProps) {
  const location = useLocation()
  const { sidebarCollapsed, setSidebarCollapsed } = useUIStore()

  const handleNavClick = () => {
    if (isMobile && onClose) {
      onClose()
    }
  }

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between border-b px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Package className="h-5 w-5" />
          </div>
          {(!sidebarCollapsed || isMobile) && (
            <span className="text-lg font-semibold">ERP System</span>
          )}
        </div>
        {isMobile && onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-1 px-2">
          {navigation.map((item) => {
            const isActive =
              item.href === '/'
                ? location.pathname === '/'
                : location.pathname.startsWith(item.href)

            return (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>
                  <NavLink
                    to={item.href}
                    onClick={handleNavClick}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                      sidebarCollapsed && !isMobile && 'justify-center px-2'
                    )}
                  >
                    <item.icon
                      className={cn('h-5 w-5 shrink-0', isActive && 'text-primary')}
                    />
                    {(!sidebarCollapsed || isMobile) && <span>{item.name}</span>}
                  </NavLink>
                </TooltipTrigger>
                {sidebarCollapsed && !isMobile && (
                  <TooltipContent side="right">{item.name}</TooltipContent>
                )}
              </Tooltip>
            )
          })}
        </nav>
      </ScrollArea>

      <Separator />

      <div className="p-2">
        <NavLink
          to="/settings"
          onClick={handleNavClick}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
            sidebarCollapsed && !isMobile && 'justify-center px-2'
          )}
        >
          <Settings className="h-5 w-5 shrink-0" />
          {(!sidebarCollapsed || isMobile) && <span>Settings</span>}
        </NavLink>
      </div>

      {!isMobile && (
        <div className="border-t p-2 hidden lg:block">
          <Button
            variant="ghost"
            size="sm"
            className={cn('w-full', sidebarCollapsed && 'justify-center')}
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? (
              <Package className="h-4 w-4" />
            ) : (
              <span className="text-xs">Collapse</span>
            )}
          </Button>
        </div>
      )}
    </div>
  )

  if (isMobile) {
    return (
      <TooltipProvider delayDuration={0}>
        <aside
          className={cn(
            'fixed left-0 top-0 z-50 h-screen w-64 border-r bg-sidebar transition-transform duration-300',
            isOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          {sidebarContent}
        </aside>
      </TooltipProvider>
    )
  }

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen border-r bg-sidebar transition-all duration-300 hidden lg:block',
          sidebarCollapsed ? 'w-16' : 'w-64'
        )}
      >
        {sidebarContent}
      </aside>
    </TooltipProvider>
  )
}
