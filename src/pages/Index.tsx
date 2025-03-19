
import React from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import EnergyConsumptionChart from '@/components/EnergyConsumptionChart';
import SystemsOverview from '@/components/SystemsOverview';
import AlertsPanel from '@/components/AlertsPanel';
import DeviceControl from '@/components/DeviceControl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleCheck, Building, Users, Zap } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader title="Tableau de bord" />
      <div className="flex-1 p-4 space-y-6">
        {/* Stats overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-full dark:bg-green-900">
                <CircleCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Systèmes opérationnels</p>
                <h3 className="text-2xl font-bold">95%</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900">
                <Building className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Surface totale</p>
                <h3 className="text-2xl font-bold">12,540 m²</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="p-2 bg-purple-100 rounded-full dark:bg-purple-900">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Occupation</p>
                <h3 className="text-2xl font-bold">72%</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="p-2 bg-amber-100 rounded-full dark:bg-amber-900">
                <Zap className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Consommation moy.</p>
                <h3 className="text-2xl font-bold">285 kWh</h3>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main dashboard content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <EnergyConsumptionChart />
            <SystemsOverview />
          </div>
          <div className="space-y-6">
            <AlertsPanel />
          </div>
        </div>
        
        {/* Device control section */}
        <DeviceControl />
      </div>
    </div>
  );
};

export default Dashboard;
