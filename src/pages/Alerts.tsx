
import React from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import AlertsPanel from '@/components/AlertsPanel';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Bell, CheckCircle, FilterX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Alerts = () => {
  const stats = [
    { id: 1, name: 'Alertes critiques', value: '2', icon: <AlertTriangle className="h-5 w-5 text-red-500" />, bgColor: 'bg-red-50 dark:bg-red-900/20' },
    { id: 2, name: 'Avertissements', value: '5', icon: <Bell className="h-5 w-5 text-amber-500" />, bgColor: 'bg-amber-50 dark:bg-amber-900/20' },
    { id: 3, name: 'Infos', value: '12', icon: <CheckCircle className="h-5 w-5 text-blue-500" />, bgColor: 'bg-blue-50 dark:bg-blue-900/20' },
  ];

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <DashboardHeader title="Alertes du système" />
      <div className="flex-1 overflow-auto p-3 md:p-4 lg:p-6">
        <div className="max-w-5xl mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {stats.map((stat) => (
              <Card key={stat.id} className="shadow-md">
                <CardContent className="p-3 md:p-4 flex items-center">
                  <div className={`p-2 rounded-lg mr-3 ${stat.bgColor}`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.name}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Filters and Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <FilterX className="h-4 w-4" />
                Filtrer
              </Button>
              <Button variant="outline" size="sm">Aujourd'hui</Button>
              <Button variant="outline" size="sm">Cette semaine</Button>
            </div>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Marquer tout comme lu
            </Button>
          </div>
          
          {/* Tabs */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4 bg-background">
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="critique">Critiques</TabsTrigger>
              <TabsTrigger value="avertissement">Avertissements</TabsTrigger>
              <TabsTrigger value="information">Informations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <Card className="shadow-lg border-none">
                <CardContent className="p-0">
                  <AlertsPanel />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="critique">
              <Card className="shadow-lg border-none">
                <CardContent className="p-0">
                  <AlertsPanel type="critique" />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="avertissement">
              <Card className="shadow-lg border-none">
                <CardContent className="p-0">
                  <AlertsPanel type="avertissement" />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="information">
              <Card className="shadow-lg border-none">
                <CardContent className="p-0">
                  <AlertsPanel type="information" />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
