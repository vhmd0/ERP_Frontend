import { Outlet } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'
import { useUIStore } from '@/stores/ui-store'
import { cn } from '@/lib/utils'

export default function MainLayout() {
  const { sidebarCollapsed, sidebarOpen, setSidebarOpen } = useUIStore()

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <Sidebar isMobile={false} />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          <Sidebar isMobile={true} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </>
      )}

      <Header />

      <main
        className={cn(
          'min-h-screen pt-16 transition-all duration-300 overflow-x-hidden',
          'lg:ml-64',
          sidebarCollapsed && 'lg:ml-16'
        )}
      >
        <div className="mx-auto max-w-7xl p-4 sm:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
