import * as React from "react"
import { useNavigate } from "react-router-dom"
import {
  LayoutDashboard,
  Building2,
  Users,
  Package,
  ShoppingCart,
  Truck,
  BarChart3,
  Settings,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

interface SearchItem {
  id: string
  title: string
  category: string
  href: string
  icon: React.ElementType
  keywords?: string[]
}

const searchItems: SearchItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    category: "Pages",
    href: "/",
    icon: LayoutDashboard,
    keywords: ["home", "main", "overview"],
  },
  {
    id: "companies",
    title: "Companies",
    category: "Pages",
    href: "/companies",
    icon: Building2,
    keywords: ["business", "organization", "firm"],
  },
  {
    id: "hr",
    title: "HR / Employees",
    category: "Pages",
    href: "/hr",
    icon: Users,
    keywords: ["human resources", "staff", "personnel", "workers"],
  },
  {
    id: "inventory",
    title: "Inventory",
    category: "Pages",
    href: "/inventory",
    icon: Package,
    keywords: ["stock", "warehouse", "products", "items"],
  },
  {
    id: "customers",
    title: "Customers",
    category: "Sales",
    href: "/sales/customers",
    icon: ShoppingCart,
    keywords: ["clients", "buyers", "consumer"],
  },
  {
    id: "orders",
    title: "Orders",
    category: "Sales",
    href: "/sales/orders",
    icon: ShoppingCart,
    keywords: ["sales", "transactions", "purchases"],
  },
  {
    id: "vendors",
    title: "Vendors",
    category: "Procurement",
    href: "/procurement/vendors",
    icon: Truck,
    keywords: ["suppliers", "providers", "sellers"],
  },
  {
    id: "analytics",
    title: "Analytics / KPIs",
    category: "Reports",
    href: "/analytics/kpis",
    icon: BarChart3,
    keywords: ["reports", "statistics", "metrics", "performance"],
  },
  {
    id: "settings",
    title: "Settings",
    category: "General",
    href: "/settings",
    icon: Settings,
    keywords: ["preferences", "configuration", "options"],
  },
]

export function SpotlightSearch({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (open: boolean) => void
}) {
  const navigate = useNavigate()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(!open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open, setOpen])

  const runCommand = React.useCallback(
    (command: () => void) => {
      setOpen(false)
      command()
    },
    [setOpen]
  )

  const groupedItems = React.useMemo(() => {
    const groups: Record<string, SearchItem[]> = {}
    searchItems.forEach((item) => {
      if (!groups[item.category]) {
        groups[item.category] = []
      }
      groups[item.category].push(item)
    })
    return groups
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search pages, settings, and more..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {Object.entries(groupedItems).map(([category, items], index) => (
          <React.Fragment key={category}>
            {index > 0 && <CommandSeparator />}
            <CommandGroup heading={category}>
              {items.map((item) => (
                <CommandItem
                  key={item.id}
                  value={`${item.title} ${item.keywords?.join(" ") ?? ""}`}
                  onSelect={() => runCommand(() => navigate(item.href))}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </React.Fragment>
        ))}
      </CommandList>
    </CommandDialog>
  )
}
