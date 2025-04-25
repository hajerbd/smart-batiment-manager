
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Save, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const Settings = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
  });
  
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleToggleChange = (setting: string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
    
    toast({
      title: "Paramètre mis à jour",
      description: `Le paramètre a été modifié avec succès.`
    });
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès.",
    });
  };

  return (
    <div className="container max-w-2xl mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <User className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-bold">Paramètres</h1>
      </div>
      
      <div className="space-y-6">
        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle>Profil</CardTitle>
            <CardDescription>
              Gérez vos informations personnelles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input 
                id="name" 
                value={formData.name} 
                onChange={handleInputChange}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={formData.email} 
                onChange={handleInputChange}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleSaveProfile}
              className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 transition-colors"
            >
              <Save className="mr-2 h-4 w-4" />
              Sauvegarder
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle>Préférences</CardTitle>
            <CardDescription>
              Personnalisez votre expérience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Recevoir des notifications
                </p>
              </div>
              <Switch 
                id="notifications" 
                checked={settings.notifications}
                onCheckedChange={() => handleToggleChange('notifications')}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="darkMode">Mode sombre</Label>
                <p className="text-sm text-muted-foreground">
                  Activer le thème sombre
                </p>
              </div>
              <Switch 
                id="darkMode" 
                checked={settings.darkMode}
                onCheckedChange={() => handleToggleChange('darkMode')}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
