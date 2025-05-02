
import React from 'react';
import { User, UserCog } from 'lucide-react';
import { ProfileCard } from '@/components/settings/ProfileCard';
import { PreferencesCard } from '@/components/settings/PreferencesCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Settings = () => {
  return (
    <div className="container max-w-2xl mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <User className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-bold">Paramètres</h1>
      </div>
      
      <div className="space-y-6">
        <ProfileCard />
        <PreferencesCard />
        
        {/* Carte d'administration pour les administrateurs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCog className="h-5 w-5" />
              Administration
            </CardTitle>
            <CardDescription>
              Options d'administration du système réservées aux administrateurs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/user-management">
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <UserCog className="h-4 w-4" />
                Gestion des utilisateurs
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
