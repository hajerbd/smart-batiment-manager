
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from '@/hooks/use-toast';
import { Bell, Moon, Wifi, Volume2 } from 'lucide-react';

interface SettingsState {
  notifications: boolean;
  darkMode: boolean;
  autoConnect: boolean;
  soundEnabled: boolean;
}

export function PreferencesCard() {
  const { toast } = useToast();
  const [settings, setSettings] = React.useState<SettingsState>({
    notifications: true,
    darkMode: false,
    autoConnect: true,
    soundEnabled: true
  });

  const handleToggleChange = (setting: keyof SettingsState) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    
    toast({
      title: "Paramètre mis à jour",
      description: `Le paramètre a été modifié avec succès.`
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
        <div className={`p-2 rounded-full ${enabled ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
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
        className="data-[state=checked]:bg-gradient-to-r from-blue-500 to-violet-600"
      />
    </div>
  );

  return (
    <Card className="shadow-lg transition-all hover:shadow-xl mt-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold">Préférences système</CardTitle>
        <CardDescription>
          Personnalisez votre expérience VitaSmart
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <PreferenceItem
          id="notifications"
          title="Notifications"
          description="Recevoir des alertes et notifications importantes"
          icon={Bell}
          enabled={settings.notifications}
        />
        <Separator />
        <PreferenceItem
          id="darkMode"
          title="Mode sombre"
          description="Activer l'interface sombre"
          icon={Moon}
          enabled={settings.darkMode}
        />
        <Separator />
        <PreferenceItem
          id="autoConnect"
          title="Connexion automatique"
          description="Se connecter automatiquement aux appareils connus"
          icon={Wifi}
          enabled={settings.autoConnect}
        />
        <Separator />
        <PreferenceItem
          id="soundEnabled"
          title="Sons système"
          description="Activer les sons de notification"
          icon={Volume2}
          enabled={settings.soundEnabled}
        />
      </CardContent>
    </Card>
  );
}
