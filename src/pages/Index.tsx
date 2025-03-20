
import React from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import SystemsOverview from '@/components/SystemsOverview';
import AlertsPanel from '@/components/AlertsPanel';
import RoomControl from '@/components/RoomControl';
import WeatherWidget from '@/components/WeatherWidget';
import { Card, CardContent } from '@/components/ui/card';
import { CircleCheck, Home, Thermometer } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader title="Tableau de bord VitaSmart" />
      <div className="flex-1 p-4 space-y-6">
        {/* Stats overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-full dark:bg-green-900">
                <CircleCheck className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Systèmes actifs</p>
                <h3 className="text-2xl font-bold">95%</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900">
                <Home className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pièces gérées</p>
                <h3 className="text-2xl font-bold">5</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="p-2 bg-purple-100 rounded-full dark:bg-purple-900">
                <Thermometer className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Temp. moyenne</p>
                <h3 className="text-2xl font-bold">22°C</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weather widget */}
        <WeatherWidget />
        
        {/* Main dashboard content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <SystemsOverview />
          </div>
          <div className="space-y-6">
            <AlertsPanel />
          </div>
        </div>
        
        {/* Room control section */}
        <RoomControl />
      </div>
    </div>
  );
};

export default Dashboard;
