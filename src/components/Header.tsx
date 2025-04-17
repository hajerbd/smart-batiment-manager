
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { User, BellRing, Menu, LogIn, UserCircle, Settings, LogOut, HelpCircle } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import Profile from '@/pages/Profile';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isMobile = useIsMobile();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Simuler connexion/déconnexion pour démo
  const handleLogout = () => {
    setIsAuthenticated(false);
    console.log('Logout clicked');
  };

  const handleLogin = () => {
    setIsProfileOpen(true);
  };

  return (
    <header className="bg-background border-b sticky top-0 z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo et navigation */}
        <div className="flex items-center">
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
            <h1 className="text-xl font-bold">VitaSmart</h1>
          </Link>
          
          {!isMobile && (
            <nav className="ml-8">
              <Tabs defaultValue="home">
                <TabsList>
                  <TabsTrigger value="home" asChild>
                    <Link to="/">Accueil</Link>
                  </TabsTrigger>
                  <TabsTrigger value="dashboard" asChild>
                    <Link to="/dashboard">Tableau de bord</Link>
                  </TabsTrigger>
                  <TabsTrigger value="alerts" asChild>
                    <Link to="/alerts">Alertes</Link>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </nav>
          )}
        </div>

        {/* Actions utilisateur */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/alerts">
              <BellRing className="h-5 w-5" />
            </Link>
          </Button>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <UserCircle className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="flex items-center">
                  <UserCircle className="mr-2 h-4 w-4" />
                  <span>Mon profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Aide</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Déconnexion</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleLogin}>
                  <UserCircle className="h-6 w-6" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md p-0">
                <Profile />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
