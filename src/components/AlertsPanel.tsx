
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Thermometer, 
  Droplet, 
  Snowflake,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Types
interface AlertItem {
  id: string;
  type: 'critique' | 'avertissement' | 'information';
  title: string;
  description: string;
  time: string;
  system: string;
  icon: React.ReactNode;
  read: boolean;
}

// Données simulées
const mockAlerts: AlertItem[] = [
  {
    id: '1',
    type: 'critique',
    title: 'Vanne de chauffage bloquée',
    description: 'La vanne de chauffage dans la Chambre n°1 ne répond plus aux commandes',
    time: 'Il y a 10 min',
    system: 'Chauffage',
    icon: <Thermometer className="h-5 w-5" />,
    read: false
  },
  {
    id: '2',
    type: 'avertissement',
    title: 'Vanne d\'eau entartée',
    description: 'La vanne d\'irrigation du jardin présente des signes d\'entartrage',
    time: 'Il y a 25 min',
    system: 'Irrigation',
    icon: <Droplet className="h-5 w-5" />,
    read: true
  },
  {
    id: '3',
    type: 'information',
    title: 'Maintenance planifiée',
    description: 'Maintenance du système de chauffage prévue demain à 18h00',
    time: 'Il y a 1h',
    system: 'Chauffage',
    icon: <Thermometer className="h-5 w-5" />,
    read: false
  },
  {
    id: '4',
    type: 'avertissement',
    title: 'Débit d\'eau faible',
    description: 'Le débit d\'eau dans le système d\'irrigation est inférieur à la normale',
    time: 'Il y a 1h 30min',
    system: 'Irrigation',
    icon: <Droplet className="h-5 w-5" />,
    read: true
  },
  {
    id: '5',
    type: 'information',
    title: 'Vanne de climatisation',
    description: 'La vanne de climatisation du salon a été remplacée avec succès',
    time: 'Il y a 2h',
    system: 'Climatisation',
    icon: <Snowflake className="h-5 w-5" />,
    read: true
  }
];

// Fonctions utilitaires pour les styles des alertes
const getAlertColor = (type: AlertItem['type']) => {
  switch (type) {
    case 'critique': return 'border-red-500 bg-red-50 dark:bg-red-950/30';
    case 'avertissement': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30';
    case 'information': return 'border-blue-500 bg-blue-50 dark:bg-blue-950/30';
    default: return '';
  }
};

const getAlertBadge = (type: AlertItem['type']) => {
  switch (type) {
    case 'critique': return 'bg-red-500 hover:bg-red-600';
    case 'avertissement': return 'bg-yellow-500 hover:bg-yellow-600';
    case 'information': return 'bg-blue-500 hover:bg-blue-600';
    default: return '';
  }
};

const AlertsPanel = () => {
  const unreadCount = mockAlerts.filter(alert => !alert.read).length;
  
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
          {mockAlerts.map((alert) => (
            <div 
              key={alert.id} 
              className={cn(
                "p-3 border-l-4 rounded-md relative", 
                getAlertColor(alert.type),
                !alert.read && "before:absolute before:top-3 before:left-3 before:w-2 before:h-2 before:bg-blue-500 before:rounded-full"
              )}
            >
              <div className="flex items-start">
                <div className={cn(
                  "p-2 rounded-full mr-3",
                  alert.type === 'critique' ? 'bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-300' :
                  alert.type === 'avertissement' ? 'bg-yellow-100 text-yellow-500 dark:bg-yellow-900 dark:text-yellow-300' :
                  'bg-blue-100 text-blue-500 dark:bg-blue-900 dark:text-blue-300'
                )}>
                  {alert.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{alert.title}</h4>
                    <Badge variant="outline" className={cn(getAlertBadge(alert.type), "text-white")}>
                      {alert.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                  <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {alert.time}</span>
                    <span>{alert.system}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertsPanel;

