import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Activity, BarChart3, Eye, Home, Radio, Shield, Server,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { id: 'overview', label: 'Overview', icon: Activity },
  { id: 'timeline', label: 'Timeline', icon: BarChart3 },
  { id: 'threats', label: 'Threats', icon: Shield },
  { id: 'resources', label: 'Resources', icon: Server },
  { id: 'detection', label: 'Detection', icon: Radio },
]

interface DashboardLayoutProps {
  children: ReactNode
  header: ReactNode
  statusBar?: ReactNode
}

export function DashboardLayout({ children, header, statusBar }: DashboardLayoutProps) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen pt-16 flex">
      <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-white/[0.06] bg-nv-dark/40 backdrop-blur-xl fixed left-0 top-16 bottom-0 z-40">
        <div className="p-4 border-b border-white/[0.06]">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors text-xs">
            <Home className="h-3.5 w-3.5" />
            Back to site
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm',
                'text-muted-foreground hover:text-white hover:bg-white/[0.04] transition-colors'
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-nv-cyan" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              NeuroVision Console
            </span>
          </div>
        </div>
      </aside>

      <main className="flex-1 lg:ml-56">
        <div className="sticky top-16 z-30 border-b border-white/[0.06] bg-nv-dark/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 py-4">{header}</div>
          {statusBar && (
            <div className="max-w-7xl mx-auto px-4 pb-3">{statusBar}</div>
          )}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 py-8 space-y-8"
        >
          {children}
        </motion.div>
      </main>
    </div>
  )
}
