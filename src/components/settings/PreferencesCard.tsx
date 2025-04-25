
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from '@/hooks/use-toast';

interface SettingsState {
  notifications: boolean;
  darkMode: boolean;
}

export function PreferencesCard() {
  const { toast } = useToast();
  const [settings, setSettings] = React.useState<SettingsState>({
    notifications: true,
    darkMode: false,
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

  return (
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
  );
}
