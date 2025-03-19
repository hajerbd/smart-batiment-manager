import React from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import AlertsPanel from '@/components/AlertsPanel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Bell, Filter, CheckCircle, AlertTriangle, AlertCircle, Clock, Calendar } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Alert {
  id: string;
  title: string;
  description: string;
  type: 'critical' | 'warning' | 'info';
  status: 'new' | 'in-progress' | 'resolved';
  source: string;
  createdAt: string;
  resolvedAt?: string;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    title: 'Température élevée dans la chambre n°1',
    description: 'La température a atteint 28°C, dépassant le seuil critique de 27°C.',
    type: 'critical',
    status: 'in-progress',
    source: 'Système de climatisation',
    createdAt: '2023-06-12T08:30:00',
  },
  {
    id: '2',
    title: 'Maintenance planifiée du système électrique',
    description: 'Une maintenance est prévue demain à 18h00. Durée estimée: 2 heures.',
    type: 'info',
    status: 'new',
    source: 'Système de gestion',
    createdAt: '2023-06-12T10:15:00',
  },
  {
    id: '3',
    title: 'Vannes de chauffage bloquées',
    description: 'Les vannes de chauffage dans la chambre n°2 semblent bloquées.',
    type: 'warning',
    status: 'resolved',
    source: 'Système de chauffage',
    createdAt: '2023-06-11T22:45:00',
    resolvedAt: '2023-06-12T00:20:00',
  },
  {
    id: '4',
    title: 'Fuite d\'eau détectée',
    description: 'Fuite détectée dans la vanne d\'irrigation du jardin.',
    type: 'critical',
    status: 'resolved',
    source: 'Capteurs d\'eau',
    createdAt: '2023-06-10T14:23:00',
    resolvedAt: '2023-06-10T16:45:00',
  },
  {
    id: '5',
    title: 'Vannes d\'irrigation obstruées',
    description: 'Les vannes d\'irrigation du jardin sont partiellement obstruées.',
    type: 'warning',
    status: 'new',
    source: 'Système d\'irrigation',
    createdAt: '2023-06-12T07:10:00',
  },
  {
    id: '6',
    title: 'Pic de consommation énergétique',
    description: 'Consommation 30% au-dessus de la moyenne habituelle.',
    type: 'warning',
    status: 'in-progress',
    source: 'Système énergétique',
    createdAt: '2023-06-11T13:50:00',
  },
  {
    id: '7',
    title: 'Stores automatiques bloqués',
    description: 'Les stores automatiques de la chambre n°1 ne répondent plus aux commandes.',
    type: 'info',
    status: 'new',
    source: 'Système de gestion',
    createdAt: '2023-06-12T09:00:00',
  },
];

const getAlertTypeIcon = (type: string) => {
  switch (type) {
    case 'critical':
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    case 'warning':
      return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    case 'info':
      return <Bell className="h-5 w-5 text-blue-500" />;
    default:
      return <Bell className="h-5 w-5" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'new':
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">Nouveau</Badge>;
    case 'in-progress':
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800">En cours</Badge>;
    case 'resolved':
      return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">Résolu</Badge>;
    default:
      return null;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const AlertsPage = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<string | null>(null);
  const [typeFilter, setTypeFilter] = React.useState<string | null>(null);
  
  const filteredAlerts = mockAlerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          alert.source.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || alert.status === statusFilter;
    const matchesType = !typeFilter || alert.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  const criticalCount = mockAlerts.filter(a => a.type === 'critical').length;
  const warningCount = mockAlerts.filter(a => a.type === 'warning').length;
  const infoCount = mockAlerts.filter(a => a.type === 'info').length;
  const resolvedCount = mockAlerts.filter(a => a.status === 'resolved').length;
  const total = mockAlerts.length;

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader title="Alertes et notifications" />
      <div className="flex-1 p-4 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-red-50 dark:bg-red-950/30 border-red-100 dark:border-red-800">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-red-800 dark:text-red-300">Critiques</p>
                <h3 className="text-2xl font-bold text-red-700 dark:text-red-400">{criticalCount}</h3>
              </div>
              <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
                <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-yellow-50 dark:bg-yellow-950/30 border-yellow-100 dark:border-yellow-800">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-yellow-800 dark:text-yellow-300">Avertissements</p>
                <h3 className="text-2xl font-bold text-yellow-700 dark:text-yellow-400">{warningCount}</h3>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-800">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-blue-800 dark:text-blue-300">Informations</p>
                <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400">{infoCount}</h3>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <Bell className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 dark:bg-green-950/30 border-green-100 dark:border-green-800">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-sm text-green-800 dark:text-green-300">Résolues</p>
                <h3 className="text-2xl font-bold text-green-700 dark:text-green-400">{resolvedCount}</h3>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <CardTitle>Journal des alertes</CardTitle>
                  <div className="flex flex-wrap gap-2">
                    <div className="relative flex-1 min-w-[200px]">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="search" 
                        placeholder="Rechercher..." 
                        className="pl-8 w-full" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    
                    <Select value={statusFilter || ''} onValueChange={(value) => setStatusFilter(value || null)}>
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Tous</SelectItem>
                        <SelectItem value="new">Nouveaux</SelectItem>
                        <SelectItem value="in-progress">En cours</SelectItem>
                        <SelectItem value="resolved">Résolus</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={typeFilter || ''} onValueChange={(value) => setTypeFilter(value || null)}>
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Tous</SelectItem>
                        <SelectItem value="critical">Critiques</SelectItem>
                        <SelectItem value="warning">Avertissements</SelectItem>
                        <SelectItem value="info">Informations</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mt-2">
                  {filteredAlerts.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      Aucune alerte ne correspond à vos critères de recherche.
                    </div>
                  ) : (
                    filteredAlerts.map((alert) => (
                      <div 
                        key={alert.id} 
                        className={`p-4 border-l-4 rounded-md ${
                          alert.type === 'critical' ? 'border-red-500 bg-red-50 dark:bg-red-950/30' : 
                          alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30' : 
                          'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-full ${
                            alert.type === 'critical' ? 'bg-red-100 dark:bg-red-900' : 
                            alert.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900' : 
                            'bg-blue-100 dark:bg-blue-900'
                          }`}>
                            {getAlertTypeIcon(alert.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <h3 className="font-medium">{alert.title}</h3>
                              {getStatusBadge(alert.status)}
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">{alert.description}</p>
                            <div className="mt-2 flex flex-wrap items-center gap-x-4 text-xs text-muted-foreground">
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" /> {formatDate(alert.createdAt)}
                              </span>
                              <span>{alert.source}</span>
                              {alert.resolvedAt && (
                                <span className="flex items-center text-green-600 dark:text-green-400">
                                  <CheckCircle className="h-3 w-3 mr-1" /> Résolu le {formatDate(alert.resolvedAt)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Statistiques</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Répartition par type</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span className="text-red-600 dark:text-red-400 flex items-center">
                            <span className="h-2 w-2 rounded-full bg-red-500 mr-1"></span>
                            Critiques
                          </span>
                          <span>{Math.round((criticalCount / total) * 100)}%</span>
                        </div>
                        <Progress value={(criticalCount / total) * 100} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm">
                          <span className="text-yellow-600 dark:text-yellow-400 flex items-center">
                            <span className="h-2 w-2 rounded-full bg-yellow-500 mr-1"></span>
                            Avertissements
                          </span>
                          <span>{Math.round((warningCount / total) * 100)}%</span>
                        </div>
                        <Progress value={(warningCount / total) * 100} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm">
                          <span className="text-blue-600 dark:text-blue-400 flex items-center">
                            <span className="h-2 w-2 rounded-full bg-blue-500 mr-1"></span>
                            Informations
                          </span>
                          <span>{Math.round((infoCount / total) * 100)}%</span>
                        </div>
                        <Progress value={(infoCount / total) * 100} className="h-2" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Statut des alertes</span>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-blue-500 mr-1"></span>
                            Nouvelles
                          </span>
                          <span>{Math.round((mockAlerts.filter(a => a.status === 'new').length / total) * 100)}%</span>
                        </div>
                        <Progress value={(mockAlerts.filter(a => a.status === 'new').length / total) * 100} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-yellow-500 mr-1"></span>
                            En cours
                          </span>
                          <span>{Math.round((mockAlerts.filter(a => a.status === 'in-progress').length / total) * 100)}%</span>
                        </div>
                        <Progress value={(mockAlerts.filter(a => a.status === 'in-progress').length / total) * 100} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center">
                            <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                            Résolues
                          </span>
                          <span>{Math.round((resolvedCount / total) * 100)}%</span>
                        </div>
                        <Progress value={(resolvedCount / total) * 100} className="h-2" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-2">
                  <h3 className="text-sm font-medium">Alertes récentes</h3>
                  <div className="border rounded-md divide-y">
                    {mockAlerts.slice(0, 3).map((alert) => (
                      <div key={alert.id} className="p-3 flex items-center gap-2">
                        {getAlertTypeIcon(alert.type)}
                        <div className="flex-1">
                          <p className="text-sm font-medium truncate">{alert.title}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(alert.createdAt)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <AlertsPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;

