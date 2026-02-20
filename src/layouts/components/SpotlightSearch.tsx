import * as React from "react"
import { useNavigate } from "react-router-dom"
import {
  Search,
  LayoutDashboard,
  Building2,
  Users,
  Package,
  ShoppingCart,
  Truck,
  BarChart3,
  Settings,
  Command,
  X,
} from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface SearchItem {
  id: string
  title: string
  category: string
  href: string
  icon: React.ElementType
  keywords?: string[] // إضافة كلمات مفتاحية إضافية لتحسين البحث
}

const searchItems: SearchItem[] = [
  { 
    id: "dashboard", 
    title: "Dashboard", 
    category: "Pages", 
    href: "/", 
    icon: LayoutDashboard,
    keywords: ["home", "main", "overview"]
  },
  { 
    id: "companies", 
    title: "Companies", 
    category: "Pages", 
    href: "/companies", 
    icon: Building2,
    keywords: ["business", "organization", "firm"]
  },
  { 
    id: "hr", 
    title: "HR / Employees", 
    category: "Pages", 
    href: "/hr", 
    icon: Users,
    keywords: ["human resources", "staff", "personnel", "workers"]
  },
  { 
    id: "inventory", 
    title: "Inventory", 
    category: "Pages", 
    href: "/inventory", 
    icon: Package,
    keywords: ["stock", "warehouse", "products", "items"]
  },
  { 
    id: "customers", 
    title: "Customers", 
    category: "Pages", 
    href: "/sales/customers", 
    icon: ShoppingCart,
    keywords: ["clients", "buyers", "consumer"]
  },
  { 
    id: "orders", 
    title: "Orders", 
    category: "Pages", 
    href: "/sales/orders", 
    icon: ShoppingCart,
    keywords: ["sales", "transactions", "purchases"]
  },
  { 
    id: "vendors", 
    title: "Vendors", 
    category: "Pages", 
    href: "/procurement/vendors", 
    icon: Truck,
    keywords: ["suppliers", "providers", "sellers"]
  },
  { 
    id: "analytics", 
    title: "Analytics / KPIs", 
    category: "Pages", 
    href: "/analytics/kpis", 
    icon: BarChart3,
    keywords: ["reports", "statistics", "metrics", "performance"]
  },
  { 
    id: "settings", 
    title: "Settings", 
    category: "General", 
    href: "/settings", 
    icon: Settings,
    keywords: ["preferences", "configuration", "options"]
  },
]

export function SpotlightSearch({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const [query, setQuery] = React.useState("")
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  // تحسين عملية البحث
  const filteredItems = React.useMemo(() => {
    if (!query.trim()) return searchItems.slice(0, 5) // عرض آخر 5 عناصر عندما يكون البحث فارغاً
    
    const searchTerm = query.toLowerCase().trim()
    
    return searchItems.filter((item) => {
      // البحث في العنوان
      const titleMatch = item.title.toLowerCase().includes(searchTerm)
      
      // البحث في الكلمات المفتاحية
      const keywordMatch = item.keywords?.some(keyword => 
        keyword.toLowerCase().includes(searchTerm)
      )
      
      // البحث في التصنيف
      const categoryMatch = item.category.toLowerCase().includes(searchTerm)
      
      return titleMatch || keywordMatch || categoryMatch
    })
  }, [query])

  // إعادة تعيين المؤشر المحدد عندما تتغير النتائج
  React.useEffect(() => {
    setSelectedIndex(0)
  }, [filteredItems])

  const handleSelect = (href: string) => {
    setOpen(false)
    setQuery("")
    navigate(href)
  }

  // التعامل مع اختصارات لوحة المفاتيح
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(true)
      }
      
      if (open) {
        if (e.key === "ArrowDown") {
          e.preventDefault()
          setSelectedIndex((prev) => 
            prev < filteredItems.length - 1 ? prev + 1 : prev
          )
        } else if (e.key === "ArrowUp") {
          e.preventDefault()
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
        } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
          e.preventDefault()
          handleSelect(filteredItems[selectedIndex].href)
        } else if (e.key === "Escape") {
          setOpen(false)
          setQuery("")
        }
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open, filteredItems, selectedIndex, setOpen])

  // التركيز على حقل الإدخال عند فتح البحث
  React.useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [open])

  // إغلاق البحث عند النقر خارج المحتوى على الجوال
  const handleBackdropClick = React.useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setOpen(false)
      setQuery("")
    }
  }, [setOpen])

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen)
      if (!isOpen) setQuery("")
    }}>
      <DialogContent 
        className="fixed inset-0 z-50 p-0 sm:inset-auto sm:top-[10%] sm:left-1/2 sm:-translate-x-1/2 sm:w-[90%] sm:max-w-2xl"
        onPointerDownOutside={() => setOpen(false)}
      >
        <DialogTitle className="sr-only">Search</DialogTitle>
        
        {/* خلفية شبه شفافة على الجوال */}
        <div 
          className="fixed inset-0 bg-black/50 sm:hidden"
          onClick={handleBackdropClick}
        />
        
        <div className="relative flex flex-col w-full h-full sm:h-auto sm:max-h-[80vh] overflow-hidden bg-popover text-popover-foreground shadow-2xl sm:rounded-xl">
          {/* شريط البحث */}
          <div className="flex items-center px-4 border-b h-16 sm:h-14 shrink-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <Search className="mr-3 h-5 w-5 shrink-0 text-muted-foreground" />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pages, settings, and more..."
              className="flex h-full w-full rounded-md bg-transparent py-3 text-base sm:text-sm outline-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="mr-2 p-1 rounded-full hover:bg-accent transition-colors sm:hidden"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
            <div className="hidden sm:flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground/70 ml-2">
              <Command className="h-3 w-3" /> K
            </div>
            <button 
              onClick={() => {
                setOpen(false)
                setQuery("")
              }}
              className="sm:hidden ml-2 px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg active:bg-primary/20 transition-colors"
            >
              Cancel
            </button>
          </div>

          {/* نتائج البحث */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 bg-popover max-h-[calc(100vh-8rem)] sm:max-h-[60vh]">
            {query === "" && (
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider">
                Recent Pages
              </div>
            )}
            
            <div className="space-y-1">
              {filteredItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.href)}
                  className={`group relative flex w-full cursor-pointer items-center rounded-lg px-3 py-3.5 sm:py-3 text-sm outline-none transition-all ${
                    index === selectedIndex 
                      ? 'bg-accent text-accent-foreground scale-[1.02] shadow-sm' 
                      : 'hover:bg-accent/50 hover:text-accent-foreground active:bg-accent/70'
                  }`}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className={`mr-4 flex h-9 w-9 items-center justify-center rounded-lg ${
                    index === selectedIndex 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                  } transition-colors sm:h-8 sm:w-8`}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <div className="font-medium">{item.title}</div>
                    <div className="text-xs text-muted-foreground/70 mt-0.5">
                      {item.href}
                    </div>
                  </div>
                  
                  <span className="ml-auto px-2 py-1 text-[10px] font-semibold rounded-full bg-muted text-muted-foreground/70 uppercase tracking-wider">
                    {item.category}
                  </span>
                </button>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="py-20 text-center px-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <Search className="h-6 w-6 text-muted-foreground/50" />
                </div>
                <p className="text-base font-medium text-foreground mb-1">No results found</p>
                <p className="text-sm text-muted-foreground">
                  We couldn't find anything matching "{query}"
                </p>
                <p className="text-xs text-muted-foreground/60 mt-4">
                  Try searching with different keywords
                </p>
              </div>
            )}
          </div>

          {/* تلميحات لوحة المفاتيح - مخفية على الجوال */}
          <div className="hidden sm:flex items-center justify-between border-t bg-muted/30 px-4 py-2.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 bg-background rounded border text-[10px] font-mono">↵</kbd>
                <span>to select</span>
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 bg-background rounded border text-[10px] font-mono">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-background rounded border text-[10px] font-mono">↓</kbd>
                <span>to navigate</span>
              </span>
            </div>
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 bg-background rounded border text-[10px] font-mono">esc</kbd>
              <span>to close</span>
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}