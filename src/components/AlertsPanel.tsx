
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface AlertItem {
  id: string;
  type: 'critique' | 'avertissement' | 'information';
  title: string;
  description: string;
  time: string;
  system: string;
  read: boolean;
}

const initialAlerts: AlertItem[] = [
  {
    id: '1',
    type: 'critique',
    title: 'Vanne de chauffage bloquée',
    description: 'La vanne de chauffage dans la Chambre n°1 ne répond plus aux commandes',
    time: 'Il y a 10 min',
    system: 'Chauffage',
    read: false
  },
  {
    id: '2',
    type: 'avertissement',
    title: 'Vanne d\'eau entartée',
    description: 'La vanne d\'irrigation du jardin présente des signes d\'entartrage',
    time: 'Il y a 25 min',
    system: 'Irrigation',
    read: false
  },
  {
    id: '3',
    type: 'information',
    title: 'Maintenance planifiée',
    description: 'Maintenance du système de chauffage prévue demain à 18h00',
    time: 'Il y a 1h',
    system: 'Chauffage',
    read: false
  }
];

const AlertsPanel = ({ type }: { type?: AlertItem['type'] }) => {
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);
  const { toast } = useToast();
  
  const filteredAlerts = type 
    ? alerts.filter(alert => alert.type === type)
    : alerts;
  
  const unreadCount = filteredAlerts.filter(alert => !alert.read).length;
  
  const markAsRead = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ));
    toast({
      description: "Alerte marquée comme lue",
    });
  };

  const getAlertColor = (type: AlertItem['type']) => {
    switch (type) {
      case 'critique': return 'border-red-500 bg-red-50 dark:bg-red-950/30';
      case 'avertissement': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30';
      case 'information': return 'border-blue-500 bg-blue-50 dark:bg-blue-950/30';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Alertes et notifications</CardTitle>
            <CardDescription>Surveillez l'état des vannes et maintenances</CardDescription>
          </div>
          <Badge variant="destructive" className="rounded-full">
            {unreadCount} non lues
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="max-h-[400px] overflow-auto">
        <div className="space-y-3">
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className={cn(
                  "p-3 border-l-4 rounded-md", 
                  getAlertColor(alert.type),
                  !alert.read && "relative"
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{alert.title}</h4>
                      <Badge className={cn(
                        "text-white",
                        alert.type === 'critique' ? 'bg-red-500' :
                        alert.type === 'avertissement' ? 'bg-yellow-500' : 'bg-blue-500'
                      )}>
                        {alert.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                    <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" /> {alert.time}
                      </span>
                      <span>{alert.system}</span>
                    </div>
                    {!alert.read && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => markAsRead(alert.id)}
                        className="mt-2 text-xs flex items-center gap-1"
                      >
                        <Check className="h-3 w-3" /> Marquer comme lu
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Aucune alerte à afficher
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;
