
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, ListVideoIcon, SparklesIcon, HistoryIcon, MenuIcon, XIcon } from 'lucide-react';
import AppLogoIcon from '@/components/icons/AppLogoIcon';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Discover', icon: HomeIcon },
  { href: '/watchlist', label: 'Watchlist', icon: ListVideoIcon },
  { href: '/recommendations', label: 'Recommendations', icon: SparklesIcon },
  { href: '/history', label: 'History', icon: HistoryIcon },
];

interface AppSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const AppSidebar = ({ isOpen, toggleSidebar }: AppSidebarProps) => {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 transform flex-col border-r border-sidebar-border bg-sidebar p-4 text-sidebar-foreground transition-transform duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Main navigation"
      >
        <div className="mb-8 flex items-center gap-2 px-2">
          <AppLogoIcon className="h-8 w-8 text-accent" />
          <h1 className="font-headline text-2xl font-semibold text-foreground">Anime Stream</h1>
        </div>

        <nav className="flex-grow">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => {if (isOpen && window.innerWidth < 768) toggleSidebar()}}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    pathname === item.href
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto p-2 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Anime Stream
        </div>
      </aside>
    </>
  );
};


export const MobileHeader = ({ toggleSidebar, isSidebarOpen }: { toggleSidebar: () => void, isSidebarOpen: boolean }) => {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background px-4 md:hidden">
      <Link href="/" className="flex items-center gap-2">
        <AppLogoIcon className="h-7 w-7 text-accent" />
        <span className="font-headline text-xl font-semibold text-foreground">Anime Stream</span>
      </Link>
      <Button variant="ghost" size="icon" onClick={toggleSidebar} aria-label={isSidebarOpen ? "Close menu" : "Open menu"}>
        {isSidebarOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </Button>
    </header>
  );
};


export default AppSidebar;
