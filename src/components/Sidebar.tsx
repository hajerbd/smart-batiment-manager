
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  LayoutDashboard,
  Lightbulb,
  Bell,
  Zap,
  Settings,
  ChevronLeft,
  ChevronRight,
  Building2,
  BarChart3,
  User,
  Menu,
  CloudSun,
  Home,
  Wrench,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  active: boolean;
}

interface SidebarProps {
  onLogout?: () => void;
}

const SidebarLink = ({ to, icon, label, collapsed, active }: SidebarLinkProps) => (
  <Link to={to} className="w-full">
    <Button 
      variant="ghost" 
      className={cn(
        "w-full justify-start gap-2 mb-1",
        active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground",
        collapsed ? "px-2" : "px-4"
      )}
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </Button>
  </Link>
);

const Sidebar = ({ onLogout }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleCollapse = () => setCollapsed(prev => !prev);
  const toggleMobile = () => setMobileOpen(prev => !prev);

  const links = [
    { to: '/', icon: <LayoutDashboard size={20} />, label: 'Tableau de bord' },
    { to: '/rooms', icon: <Home size={20} />, label: 'Pièces' },
    { to: '/energy', icon: <Zap size={20} />, label: 'Énergie' },
    { to: '/devices', icon: <Lightbulb size={20} />, label: 'Équipements' },
    { to: '/weather', icon: <CloudSun size={20} />, label: 'Météo' },
    { to: '/maintenance', icon: <Wrench size={20} />, label: 'Maintenance' },
    { to: '/alerts', icon: <Bell size={20} />, label: 'Alertes' },
  ];
  
  const bottomLinks = [
    { to: '/settings', icon: <Settings size={20} />, label: 'Paramètres' },
    { to: '/profile', icon: <User size={20} />, label: 'Profil' },
  ];

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  // Mobile sidebar
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
                {links.map((link) => (
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
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-2 mb-1 text-red-500"
                  onClick={handleLogout}
                >
                  <LogOut size={20} />
                  <span>Déconnexion</span>
                </Button>
              </div>
            </nav>
          </div>
        </aside>
      </>
    );
  }

  // Desktop sidebar
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
            {links.map((link) => (
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
            <Button 
              variant="ghost" 
              className={cn(
                "w-full justify-start gap-2 mb-1 text-red-500",
                collapsed ? "px-2" : "px-4"
              )}
              onClick={handleLogout}
            >
              <LogOut size={20} />
              {!collapsed && <span>Déconnexion</span>}
            </Button>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
