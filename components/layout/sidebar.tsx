import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Anchor, BarChart2, Settings, Ship, X } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const navItems = [
  { href: '/dashboard', icon: BarChart2, label: 'Dashboard' },
  { href: '/ships', icon: Ship, label: 'Ships' },
  { href: '/ports', icon: Anchor, label: 'Ports' },
  { href: '/settings', icon: Settings, label: 'Settings' },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-50 w-64 bg-background transition-transform duration-300 ease-in-out transform lg:translate-x-0 lg:static lg:inset-0",
      open ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="flex h-full flex-col overflow-y-auto border-r pt-5 pb-4">
        <div className="flex items-center justify-between px-4">
          <Link href="/" className="flex items-center">
            <Ship className="h-8 w-8 text-primary" />
            <span className="ml-2 text-2xl font-bold text-primary">ShipMaster</span>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onClose}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>
        <nav className="mt-5 flex-1 space-y-1 px-2">
          {navItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center rounded-md px-2 py-2 text-sm font-medium",
                    pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon className="mr-3 h-6 w-6" />
                  {item.label}
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>
      </div>
    </div>
  )
}

