
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { 
  AlertTriangle, 
  CheckCircle2, 
  ClipboardList, 
  Clock, 
  Terminal, 
  Wrench,
  ShieldAlert,
  Waves,
  Thermometer,
  Lightbulb,
  ArrowUpDown,
  Battery,
  CalendarDays
} from 'lucide-react';
import { cn } from '@/lib/utils';
import DashboardHeader from '@/components/DashboardHeader';

interface MaintenanceAlert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  time: string;
  system: string;
  deviceId?: string;
  room?: string;
  icon: React.ReactNode;
  read: boolean;
}

interface MaintenanceTask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo?: string;
  system: string;
  icon: React.ReactNode;
}

interface SystemHealth {
  id: string;
  name: string;
  status: 'healthy' | 'warning' | 'critical' | 'offline';
  uptime: string;
  lastMaintenance: string;
  nextMaintenance: string;
  batteryLevel?: number;
  icon: React.ReactNode;
}

const mockAlerts: MaintenanceAlert[] = [
  {
    id: '1',
    type: 'critical',
    title: 'Température élevée',
    description: 'La température dans la salle serveur a dépassé le seuil critique (28°C)',
    time: 'Il y a 10 min',
    system: 'HVAC',
    room: 'Serveur',
    icon: <Thermometer className="h-5 w-5" />,
    read: false
  },
  {
    id: '2',
    type: 'warning',
    title: 'Batterie faible',
    description: 'Le capteur de température du salon a une batterie faible (15%)',
    time: 'Il y a 25 min',
    system: 'Capteurs',
    room: 'Salon',
    deviceId: 'temp-sensor-1',
    icon: <Battery className="h-5 w-5" />,
    read: true
  },
  {
    id: '3',
    type: 'info',
    title: 'Maintenance planifiée',
    description: 'Maintenance du système électrique prévue demain à 18h00',
    time: 'Il y a 1h',
    system: 'Électricité',
    icon: <CalendarDays className="h-5 w-5" />,
    read: false
  },
  {
    id: '4',
    type: 'warning',
    title: 'Consommation anormale',
    description: 'Consommation électrique anormale détectée dans la chambre principale',
    time: 'Il y a 1h 30min',
    system: 'Électricité',
    room: 'Chambre principale',
    icon: <Lightbulb className="h-5 w-5" />,
    read: true
  },
  {
    id: '5',
    type: 'info',
    title: 'Mise à jour disponible',
    description: 'Une mise à jour du firmware est disponible pour le système d\'irrigation',
    time: 'Il y a 2h',
    system: 'Irrigation',
    icon: <Waves className="h-5 w-5" />,
    read: true
  }
];

const mockTasks: MaintenanceTask[] = [
  {
    id: '1',
    title: 'Remplacer capteur température',
    description: 'Le capteur de température du salon montre des signes de dysfonctionnement',
    dueDate: '2023-05-15',
    priority: 'high',
    status: 'pending',
    assignedTo: 'Technicien 1',
    system: 'Capteurs',
    icon: <Thermometer />
  },
  {
    id: '2',
    title: 'Calibrer vannes d\'irrigation',
    description: 'Calibration des vannes d\'irrigation pour la saison estivale',
    dueDate: '2023-05-20',
    priority: 'medium',
    status: 'in-progress',
    assignedTo: 'Technicien 2',
    system: 'Irrigation',
    icon: <Waves />
  },
  {
    id: '3',
    title: 'Mettre à jour firmware',
    description: 'Mise à jour du firmware pour tous les dispositifs connectés',
    dueDate: '2023-05-25',
    priority: 'low',
    status: 'pending',
    system: 'Système',
    icon: <Terminal />
  },
  {
    id: '4',
    title: 'Nettoyer filtres climatisation',
    description: 'Nettoyage des filtres des unités de climatisation',
    dueDate: '2023-05-10',
    priority: 'medium',
    status: 'completed',
    assignedTo: 'Technicien 3',
    system: 'HVAC',
    icon: <ArrowUpDown />
  }
];

const mockSystemHealth: SystemHealth[] = [
  {
    id: '1',
    name: 'Système HVAC',
    status: 'healthy',
    uptime: '45 jours',
    lastMaintenance: '2023-03-15',
    nextMaintenance: '2023-06-15',
    icon: <ArrowUpDown />
  },
  {
    id: '2',
    name: 'Système d\'irrigation',
    status: 'warning',
    uptime: '30 jours',
    lastMaintenance: '2023-04-01',
    nextMaintenance: '2023-07-01',
    icon: <Waves />
  },
  {
    id: '3',
    name: 'Capteurs environnementaux',
    status: 'healthy',
    uptime: '60 jours',
    lastMaintenance: '2023-02-20',
    nextMaintenance: '2023-05-20',
    batteryLevel: 75,
    icon: <Thermometer />
  },
  {
    id: '4',
    name: 'Contrôle d\'accès',
    status: 'critical',
    uptime: '15 jours',
    lastMaintenance: '2023-04-20',
    nextMaintenance: '2023-05-05',
    icon: <ShieldAlert />
  },
  {
    id: '5',
    name: 'Système d\'éclairage',
    status: 'healthy',
    uptime: '90 jours',
    lastMaintenance: '2023-01-10',
    nextMaintenance: '2023-07-10',
    icon: <Lightbulb />
  }
];

const getAlertColor = (type: MaintenanceAlert['type']) => {
  switch (type) {
    case 'critical': return 'border-red-500 bg-red-50 text-red-800 dark:bg-red-950/30 dark:text-red-300';
    case 'warning': return 'border-yellow-500 bg-yellow-50 text-yellow-800 dark:bg-yellow-950/30 dark:text-yellow-300';
    case 'info': return 'border-blue-500 bg-blue-50 text-blue-800 dark:bg-blue-950/30 dark:text-blue-300';
    default: return '';
  }
};

const getAlertBadge = (type: MaintenanceAlert['type']) => {
  switch (type) {
    case 'critical': return 'bg-red-500 text-white hover:bg-red-600';
    case 'warning': return 'bg-yellow-500 text-white hover:bg-yellow-600';
    case 'info': return 'bg-blue-500 text-white hover:bg-blue-600';
    default: return '';
  }
};

const getPriorityBadge = (priority: MaintenanceTask['priority']) => {
  switch (priority) {
    case 'high': return 'bg-red-500 text-white hover:bg-red-600';
    case 'medium': return 'bg-yellow-500 text-white hover:bg-yellow-600';
    case 'low': return 'bg-green-500 text-white hover:bg-green-600';
    default: return '';
  }
};

const getStatusBadge = (status: MaintenanceTask['status']) => {
  switch (status) {
    case 'pending': return 'bg-gray-200 text-gray-800 hover:bg-gray-300';
    case 'in-progress': return 'bg-blue-500 text-white hover:bg-blue-600';
    case 'completed': return 'bg-green-500 text-white hover:bg-green-600';
    default: return '';
  }
};

const getSystemHealthColor = (status: SystemHealth['status']) => {
  switch (status) {
    case 'healthy': return 'text-green-500';
    case 'warning': return 'text-yellow-500';
    case 'critical': return 'text-red-500';
    case 'offline': return 'text-gray-500';
    default: return '';
  }
};

const Maintenance = () => {
  const [activeTab, setActiveTab] = useState('alerts');
  const unreadCount = mockAlerts.filter(alert => !alert.read).length;
  
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader title="Maintenance & Alertes" />
      <div className="flex-1 p-4 space-y-6">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="alerts" className="relative">
              Alertes
              {unreadCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="tasks">Tâches</TabsTrigger>
            <TabsTrigger value="health">État du système</TabsTrigger>
          </TabsList>
          
          <TabsContent value="alerts" className="space-y-4 mt-4">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Attention</AlertTitle>
              <AlertDescription>
                Il y a {unreadCount} alertes non lues qui nécessitent votre attention.
              </AlertDescription>
            </Alert>
            
            <Card>
              <CardHeader>
                <CardTitle>Alertes de maintenance</CardTitle>
                <CardDescription>Surveillez les problèmes et les notifications du système</CardDescription>
              </CardHeader>
              <CardContent className="max-h-[500px] overflow-auto">
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
                        <div className="p-2 rounded-full mr-3 bg-white/50">
                          {alert.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{alert.title}</h4>
                            <Badge className={cn(getAlertBadge(alert.type))}>
                              {alert.type === 'critical' && 'Critique'}
                              {alert.type === 'warning' && 'Avertissement'}
                              {alert.type === 'info' && 'Information'}
                            </Badge>
                          </div>
                          <p className="text-sm mt-1">{alert.description}</p>
                          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {alert.time}</span>
                            <span>{alert.system} {alert.room ? `• ${alert.room}` : ''}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Distribution des alertes</CardTitle>
                </CardHeader>
                <CardContent className="h-48 flex items-center justify-center">
                  <div className="text-muted-foreground">
                    Graphique des alertes à intégrer
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Historique</CardTitle>
                </CardHeader>
                <CardContent className="h-48 flex items-center justify-center">
                  <div className="text-muted-foreground">
                    Historique des alertes à intégrer
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="tasks" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Tâches de maintenance</h2>
              <Button>
                <ClipboardList className="h-4 w-4 mr-2" />
                Nouvelle tâche
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Tâches en cours</CardTitle>
                  <div className="flex space-x-2">
                    <Badge variant="outline">Toutes: {mockTasks.length}</Badge>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      En cours: {mockTasks.filter(t => t.status === 'in-progress').length}
                    </Badge>
                    <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                      En attente: {mockTasks.filter(t => t.status === 'pending').length}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTasks.map((task) => (
                    <div 
                      key={task.id} 
                      className={cn(
                        "p-4 border rounded-md",
                        task.status === 'completed' ? "bg-green-50 border-green-200" :
                        task.priority === 'high' ? "bg-red-50 border-red-200" :
                        task.priority === 'medium' ? "bg-yellow-50 border-yellow-200" :
                        "bg-blue-50 border-blue-200"
                      )}
                    >
                      <div className="flex items-start">
                        <div className={cn(
                          "p-2 rounded-full mr-3",
                          task.status === 'completed' ? "bg-green-100 text-green-600" :
                          task.priority === 'high' ? "bg-red-100 text-red-600" :
                          task.priority === 'medium' ? "bg-yellow-100 text-yellow-600" :
                          "bg-blue-100 text-blue-600"
                        )}>
                          {task.status === 'completed' ? <CheckCircle2 className="h-5 w-5" /> : task.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className="font-medium">{task.title}</h4>
                            <div className="flex flex-wrap gap-2">
                              <Badge className={getPriorityBadge(task.priority)}>
                                {task.priority === 'high' && 'Haute'}
                                {task.priority === 'medium' && 'Moyenne'}
                                {task.priority === 'low' && 'Basse'}
                              </Badge>
                              <Badge className={getStatusBadge(task.status)}>
                                {task.status === 'pending' && 'En attente'}
                                {task.status === 'in-progress' && 'En cours'}
                                {task.status === 'completed' && 'Terminée'}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm mt-1">{task.description}</p>
                          <div className="flex flex-wrap items-center justify-between mt-2 text-xs text-muted-foreground gap-2">
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" /> 
                              Échéance: {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                            <span className="flex items-center">
                              <Wrench className="h-3 w-3 mr-1" /> 
                              {task.system} {task.assignedTo ? `• ${task.assignedTo}` : ''}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="health" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>État des systèmes</CardTitle>
                <CardDescription>Surveillance de l'état et de la performance de tous les systèmes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSystemHealth.map((system) => (
                    <div key={system.id} className="border rounded-md p-4">
                      <div className="flex items-start">
                        <div className={cn(
                          "p-2 rounded-full mr-3",
                          system.status === 'healthy' ? "bg-green-100 text-green-600" :
                          system.status === 'warning' ? "bg-yellow-100 text-yellow-600" :
                          system.status === 'critical' ? "bg-red-100 text-red-600" :
                          "bg-gray-100 text-gray-600"
                        )}>
                          {system.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{system.name}</h4>
                            <Badge variant="outline" className={cn(
                              system.status === 'healthy' ? "bg-green-100 text-green-800 border-green-200" :
                              system.status === 'warning' ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                              system.status === 'critical' ? "bg-red-100 text-red-800 border-red-200" :
                              "bg-gray-100 text-gray-800 border-gray-200"
                            )}>
                              {system.status === 'healthy' && 'Sain'}
                              {system.status === 'warning' && 'Attention'}
                              {system.status === 'critical' && 'Critique'}
                              {system.status === 'offline' && 'Hors ligne'}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                            <div className="bg-secondary/30 p-2 rounded text-center">
                              <div className="text-xs text-muted-foreground">Temps de fonct.</div>
                              <div className="font-medium">{system.uptime}</div>
                            </div>
                            <div className="bg-secondary/30 p-2 rounded text-center">
                              <div className="text-xs text-muted-foreground">Dernière maint.</div>
                              <div className="font-medium">{new Date(system.lastMaintenance).toLocaleDateString()}</div>
                            </div>
                            <div className="bg-secondary/30 p-2 rounded text-center">
                              <div className="text-xs text-muted-foreground">Prochaine maint.</div>
                              <div className="font-medium">{new Date(system.nextMaintenance).toLocaleDateString()}</div>
                            </div>
                          </div>
                          
                          {system.batteryLevel && (
                            <div className="mt-3">
                              <div className="flex justify-between text-xs mb-1">
                                <span>Niveau de batterie</span>
                                <span className={system.batteryLevel < 20 ? "text-red-500" : ""}>{system.batteryLevel}%</span>
                              </div>
                              <Progress 
                                value={system.batteryLevel} 
                                className="h-2"
                                indicatorClassName={cn(
                                  system.batteryLevel > 60 ? "bg-green-500" :
                                  system.batteryLevel > 20 ? "bg-yellow-500" :
                                  "bg-red-500"
                                )}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Santé du réseau</CardTitle>
                </CardHeader>
                <CardContent className="h-64 flex items-center justify-center">
                  <div className="text-muted-foreground">
                    Graphique de la santé du réseau à intégrer
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Performances du système</CardTitle>
                </CardHeader>
                <CardContent className="h-64 flex items-center justify-center">
                  <div className="text-muted-foreground">
                    Graphique des performances à intégrer
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Maintenance;
