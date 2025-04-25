import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  LayoutDashboard,
  Home,
  Bell,
  Zap,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  active: boolean;
  badge?: string | number;
}

const SidebarLink = ({ to, icon, label, collapsed, active, badge }: SidebarLinkProps) => (
  <Link to={to} className="w-full">
    <Button 
      variant="ghost" 
      className={cn(
        "w-full justify-start gap-2 mb-1 relative",
        active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground",
        collapsed ? "px-2" : "px-4"
      )}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
      {badge && !collapsed && (
        <Badge variant="secondary" className="ml-auto">
          {badge}
        </Badge>
      )}
      {badge && collapsed && (
        <Badge variant="secondary" className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center">
          {badge}
        </Badge>
      )}
    </Button>
  </Link>
);

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleCollapse = () => setCollapsed(prev => !prev);
  const toggleMobile = () => setMobileOpen(prev => !prev);

  const mainLinks = [
    { to: '/', icon: <Home size={20} />, label: 'Accueil', section: 'main' },
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Tableau de bord', section: 'main' },
    { to: '/alerts', icon: <Bell size={20} />, label: 'Alertes', badge: '3', section: 'main' },
    { to: '/energy', icon: <Zap size={20} />, label: 'Énergie', section: 'main' },
  ];
  
  const bottomLinks = [
    { to: '/help', icon: <HelpCircle size={20} />, label: 'Aide', section: 'bottom' },
    { to: '/settings', icon: <Settings size={20} />, label: 'Paramètres', section: 'bottom' },
  ];

  if (isMobile) {
    return (
      <>
        <Button 
          variant="ghost" 
          size="icon" 
          className="fixed top-4 left-4 z-50"
          onClick={toggleMobile}
        >
          <Menu size={24} />
        </Button>
        
        <div className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity",
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )} 
          onClick={toggleMobile}
        />
        
        <aside className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-sidebar transition-transform duration-300 ease-in-out shadow-lg",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="px-4 py-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl font-bold text-sidebar-foreground">VitaSmart</h1>
              <Button variant="ghost" size="icon" onClick={toggleMobile}>
                <ChevronLeft size={18} />
              </Button>
            </div>
            <nav className="space-y-6">
              <div className="space-y-1">
                {mainLinks.map((link) => (
                  <SidebarLink 
                    key={link.to} 
                    to={link.to} 
                    icon={link.icon} 
                    label={link.label} 
                    collapsed={false} 
                    active={location.pathname === link.to}
                    badge={link.badge}
                  />
                ))}
              </div>
              
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2 px-2">GESTION</p>
                <div className="space-y-1">
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-1">
                {bottomLinks.map((link) => (
                  <SidebarLink 
                    key={link.to} 
                    to={link.to} 
                    icon={link.icon} 
                    label={link.label} 
                    collapsed={false} 
                    active={location.pathname === link.to}
                  />
                ))}
              </div>
            </nav>
          </div>
        </aside>
      </>
    );
  }

  return (
    <aside className={cn(
      "h-screen sticky top-0 bg-sidebar border-r border-sidebar-border transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="px-4 py-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          {!collapsed && <h1 className="text-xl font-bold text-sidebar-foreground">VitaSmart</h1>}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleCollapse} 
            className={collapsed ? "mx-auto" : ""}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </Button>
        </div>
        
        <nav className="space-y-6 flex-grow">
          <div className="space-y-1">
            {!collapsed && (
              <p className="text-xs font-medium text-muted-foreground mb-2 px-2">
                NAVIGATION
              </p>
            )}
            {mainLinks.map((link) => (
              <SidebarLink 
                key={link.to} 
                to={link.to} 
                icon={link.icon} 
                label={link.label} 
                collapsed={collapsed} 
                active={location.pathname === link.to}
                badge={link.badge}
              />
            ))}
          </div>
          
          <div className="mt-auto space-y-1">
            <Separator />
            {bottomLinks.map((link) => (
              <SidebarLink 
                key={link.to} 
                to={link.to} 
                icon={link.icon} 
                label={link.label} 
                collapsed={collapsed} 
                active={location.pathname === link.to}
              />
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
