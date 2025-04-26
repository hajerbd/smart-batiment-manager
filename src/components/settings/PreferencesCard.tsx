
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from '@/hooks/use-toast';
import { Moon, Bell, Shield } from 'lucide-react';

interface SettingsState {
  notifications: boolean;
  darkMode: boolean;
  security: boolean;
}

export function PreferencesCard() {
  const { toast } = useToast();
  const [settings, setSettings] = React.useState<SettingsState>({
    notifications: true,
    darkMode: false,
    security: true
  });

  const handleToggleChange = (setting: keyof SettingsState) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    
    toast({
      title: "Paramètre mis à jour",
      description: "Les modifications ont été enregistrées."
    });
  };

  const PreferenceItem = ({ 
    id, 
    title, 
    description, 
    icon: Icon, 
    enabled 
  }: { 
    id: keyof SettingsState; 
    title: string; 
    description: string; 
    icon: React.ElementType; 
    enabled: boolean 
  }) => (
    <div className="flex items-center justify-between space-x-4">
      <div className="flex items-center space-x-4">
        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-violet-100 text-blue-600">
          <Icon className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <Label htmlFor={id} className="text-base font-medium">
            {title}
          </Label>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
      <Switch 
        id={id}
        checked={enabled}
        onCheckedChange={() => handleToggleChange(id)}
      />
    </div>
  );

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Paramètres</CardTitle>
        <CardDescription>
          Configurez les paramètres de base de votre application
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <PreferenceItem
          id="notifications"
          title="Notifications"
          description="Recevoir des notifications de l'application"
          icon={Bell}
          enabled={settings.notifications}
        />
        <Separator />
        <PreferenceItem
          id="darkMode"
          title="Mode sombre"
          description="Activer le thème sombre"
          icon={Moon}
          enabled={settings.darkMode}
        />
        <Separator />
        <PreferenceItem
          id="security"
          title="Sécurité"
          description="Activer les fonctionnalités de sécurité avancées"
          icon={Shield}
          enabled={settings.security}
        />
      </CardContent>
    </Card>
  );
}
