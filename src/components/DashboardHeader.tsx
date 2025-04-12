
import React, { useState } from 'react';
import { Bell, Search, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';

interface DashboardHeaderProps {
  title: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const isMobile = useIsMobile();

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border p-2 md:px-4 md:py-2">
      <div className="flex items-center justify-between">
        <h1 className="text-base md:text-lg font-semibold truncate">{title}</h1>
        
        <div className="flex items-center space-x-1 md:space-x-2">
          {!isMobile && (
            <div className="relative w-48 md:w-64">
              <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Rechercher..." 
                className="pl-7 py-1 h-7 text-xs md:text-sm" 
              />
            </div>
          )}
          
          <Button variant="ghost" size="sm" onClick={toggleTheme} className="h-7 w-7 p-0">
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative h-7 w-7 p-0">
                <Bell size={16} />
                <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-red-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 md:w-80">
              <div className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm font-medium">Notifications</div>
              <DropdownMenuItem className="cursor-pointer flex flex-col items-start text-xs md:text-sm p-2">
                <div className="font-medium">Alerte de température</div>
                <div className="text-xs text-muted-foreground">Température élevée dans la salle serveur</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer flex flex-col items-start text-xs md:text-sm p-2">
                <div className="font-medium">Maintenance prévue</div>
                <div className="text-xs text-muted-foreground">Maintenance du système HVAC à 14h00</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer flex flex-col items-start text-xs md:text-sm p-2">
                <div className="font-medium">Économies d'énergie</div>
                <div className="text-xs text-muted-foreground">15% d'économies d'énergie cette semaine</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
