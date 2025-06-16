
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { User } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuth();
  const [name, setName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(!isAuthenticated);
  const { toast } = useToast();

  const handleLogin = () => {
    if (login(name.trim())) {
      setIsDialogOpen(false);
      toast({
        title: "Connexion réussie",
        description: `Bienvenue ${name}!`,
      });
    } else {
      toast({
        title: "Accès refusé",
        description: "Nom d'utilisateur incorrect. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Authentification requise
          </DialogTitle>
          <DialogDescription>
            Veuillez entrer votre nom complet pour accéder à cette page.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet</Label>
            <Input
              id="name"
              type="text"
              placeholder="Entrez votre nom complet"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <Button onClick={handleLogin} className="w-full">
            Se connecter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProtectedRoute;
