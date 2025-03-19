
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { 
  AlertTriangle, 
  Bell, 
  Info, 
  Thermometer,
  Camera,
  Lock,
  Activity,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlertItem {
  id: string;
  type: 'warning' | 'critical' | 'info';
  title: string;
  description: string;
  time: string;
  system: string;
  icon: React.ReactNode;
  read: boolean;
}

const mockAlerts: AlertItem[] = [
  {
    id: '1',
    type: 'critical',
    title: 'Température élevée',
    description: 'La température dans la salle serveur a dépassé le seuil critique (28°C)',
    time: 'Il y a 10 min',
    system: 'HVAC',
    icon: <Thermometer className="h-5 w-5" />,
    read: false
  },
  {
    id: '2',
    type: 'warning',
    title: 'Mouvement détecté',
    description: 'Mouvement détecté dans la zone sécurisée pendant les heures non-ouvrables',
    time: 'Il y a 25 min',
    system: 'Sécurité',
    icon: <Camera className="h-5 w-5" />,
    read: true
  },
  {
    id: '3',
    type: 'info',
    title: 'Maintenance planifiée',
    description: 'Maintenance du système électrique prévue demain à 18h00',
    time: 'Il y a 1h',
    system: 'Électricité',
    icon: <Info className="h-5 w-5" />,
    read: false
  },
  {
    id: '4',
    type: 'warning',
    title: 'Porte déverrouillée',
    description: 'La porte principale est restée déverrouillée pendant plus de 5 minutes',
    time: 'Il y a 1h 30min',
    system: 'Contrôle d\'accès',
    icon: <Lock className="h-5 w-5" />,
    read: true
  },
  {
    id: '5',
    type: 'info',
    title: 'Consommation d\'énergie réduite',
    description: 'La consommation d\'énergie a diminué de 15% par rapport à la semaine dernière',
    time: 'Il y a 2h',
    system: 'Énergie',
    icon: <Activity className="h-5 w-5" />,
    read: true
  }
];

const getAlertColor = (type: AlertItem['type']) => {
  switch (type) {
    case 'critical': return 'border-red-500 bg-red-50 dark:bg-red-950/30';
    case 'warning': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30';
    case 'info': return 'border-blue-500 bg-blue-50 dark:bg-blue-950/30';
    default: return '';
  }
};

const getAlertBadge = (type: AlertItem['type']) => {
  switch (type) {
    case 'critical': return 'bg-red-500 hover:bg-red-600';
    case 'warning': return 'bg-yellow-500 hover:bg-yellow-600';
    case 'info': return 'bg-blue-500 hover:bg-blue-600';
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
            <CardDescription>Surveillez les problèmes et maintenances</CardDescription>
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
                  alert.type === 'critical' ? 'bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-300' :
                  alert.type === 'warning' ? 'bg-yellow-100 text-yellow-500 dark:bg-yellow-900 dark:text-yellow-300' :
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
