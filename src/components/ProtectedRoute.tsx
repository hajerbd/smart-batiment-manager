
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
import { User, Lock } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, login } = useAuth();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(!isAuthenticated);
  const { toast } = useToast();

  const handleLogin = () => {
    if (login(name.trim(), password)) {
      setIsDialogOpen(false);
      toast({
        title: "Connexion réussie",
        description: `Bienvenue ${name}!`,
      });
    } else {
      toast({
        title: "Accès refusé",
        description: "Nom d'utilisateur ou mot de passe incorrect. Veuillez réessayer.",
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
      <DialogContent className="sm:max-w-md bg-white text-gray-900 border border-gray-200">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-900">
            <User className="h-5 w-5" />
            Authentification requise
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Veuillez entrer vos identifiants pour accéder à cette page.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700">Nom complet</Label>
            <Input
              id="name"
              type="text"
              placeholder="Entrez votre nom complet"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            />
          </div>
          <Button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Se connecter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProtectedRoute;
