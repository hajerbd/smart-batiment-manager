
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { 
  User, 
  BellRing, 
  Menu, 
  LogIn, 
  UserCircle, 
  Settings, 
  LogOut, 
  HelpCircle,
  Home,
  LayoutDashboard,
  Bell,
  Zap
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const isMobile = useIsMobile();
  const location = useLocation();
  const [notificationCount, setNotificationCount] = useState(3);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Déconnecté",
      description: "Vous avez été déconnecté avec succès.",
    });
    navigate('/');
  };

  const markAllAsRead = () => {
    setNotificationCount(0);
    toast({
      title: "Notifications",
      description: "Toutes les alertes ont été marquées comme lues.",
    });
  };

  const getActiveTab = () => {
    if (location.pathname === '/') return 'home';
    if (location.pathname.startsWith('/dashboard')) return 'dashboard';
    if (location.pathname.startsWith('/alerts')) return 'alerts';
    if (location.pathname.startsWith('/energy')) return 'energy';
    return 'home';
  }

  return (
    <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2"
          >
            <Menu size={24} />
          </Button>
        )}
        <Link to="/" className="flex items-center">
          <div className="bg-blue-500 text-white p-1 rounded mr-2 hidden md:flex">
            <Home size={18} />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            VitaSmart
          </h1>
        </Link>
        
        {!isMobile && isAuthenticated && (
          <nav className="ml-8">
            <Tabs value={getActiveTab()}>
              <TabsList className="bg-slate-100 dark:bg-slate-800">
                <TabsTrigger value="home" asChild>
                  <Link to="/" className="flex items-center gap-1">
                    <Home size={16} />
                    <span className="hidden md:inline">Accueil</span>
                  </Link>
                </TabsTrigger>
                <TabsTrigger value="dashboard" asChild>
                  <Link to="/dashboard" className="flex items-center gap-1">
                    <LayoutDashboard size={16} />
                    <span className="hidden md:inline">Tableau de bord</span>
                  </Link>
                </TabsTrigger>
                <TabsTrigger value="alerts" asChild>
                  <Link to="/alerts" className="flex items-center gap-1">
                    <Bell size={16} />
                    <span className="hidden md:inline">Alertes</span>
                  </Link>
                </TabsTrigger>
                <TabsTrigger value="energy" asChild>
                  <Link to="/energy" className="flex items-center gap-1">
                    <Zap size={16} />
                    <span className="hidden md:inline">Énergie</span>
                  </Link>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </nav>
        )}

        <div className="flex items-center space-x-2">
          {isAuthenticated && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={markAllAsRead}
            >
              <Link to="/alerts">
                <BellRing className="h-5 w-5" />
                {notificationCount > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500"
                  >
                    {notificationCount}
                  </Badge>
                )}
              </Link>
            </Button>
          )}

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/50 w-10 h-10 p-0 border-2 border-blue-200 dark:border-blue-700">
                  <UserCircle className="h-7 w-7" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-1 bg-white dark:bg-slate-900 border dark:border-slate-800 shadow-lg">
                <div className="p-2 border-b border-gray-100 dark:border-slate-800">
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">Utilisateur connecté</p>
                </div>
                <DropdownMenuItem onClick={() => navigate('/settings')} className="flex items-center cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center cursor-pointer">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Aide</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="flex items-center cursor-pointer text-red-500 dark:text-red-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/dashboard">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-1 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/50"
              >
                <LogIn className="h-4 w-4" />
                <span className="hidden md:inline">Connexion</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
