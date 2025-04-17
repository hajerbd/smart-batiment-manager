
import React, { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import HouseView from '@/components/HouseView';
import RoomDeviceControl from '@/components/RoomDeviceControl';
import WeatherWidget from '@/components/WeatherWidget';
import { Card, CardContent } from '@/components/ui/card';
import { CircleCheck, Home, Thermometer, Activity, AreaChart } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const Dashboard = () => {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <DashboardHeader title="Tableau de bord VitaSmart" />
      <div className="flex-1 overflow-auto">
        <div className="p-3 md:p-4 lg:p-6">
          {/* Stats Cards with improved design */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mb-3 md:mb-6">
            <Card className="shadow-md hover:shadow-xl transition-all bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-700 border-none">
              <CardContent className="p-3 md:p-4 flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-full dark:bg-green-900/50">
                  <CircleCheck className="h-5 w-5 md:h-6 md:w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium">Systèmes actifs</p>
                  <h3 className="text-base md:text-xl font-bold">95%</h3>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-md hover:shadow-xl transition-all bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-700 border-none">
              <CardContent className="p-3 md:p-4 flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900/50">
                  <Home className="h-5 w-5 md:h-6 md:w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium">Pièces gérées</p>
                  <h3 className="text-base md:text-xl font-bold">5</h3>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-md hover:shadow-xl transition-all bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-700 border-none">
              <CardContent className="p-3 md:p-4 flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-full dark:bg-purple-900/50">
                  <Thermometer className="h-5 w-5 md:h-6 md:w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium">Temp. moyenne</p>
                  <h3 className="text-base md:text-xl font-bold">22°C</h3>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-xl transition-all bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-700 border-none">
              <CardContent className="p-3 md:p-4 flex items-center space-x-3">
                <div className="p-2 bg-amber-100 rounded-full dark:bg-amber-900/50">
                  <Activity className="h-5 w-5 md:h-6 md:w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium">Activité</p>
                  <h3 className="text-base md:text-xl font-bold">Normal</h3>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {/* Weather Widget */}
            <Card className="shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <WeatherWidget />
              </CardContent>
            </Card>
            
            {/* Quick Stats */}
            <Card className="shadow-lg col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700/50 border-none">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <AreaChart className="mr-2 h-5 w-5 text-blue-500" />
                  Aperçu de consommation
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-muted-foreground">Électricité</p>
                    <p className="text-lg font-medium">128 kWh</p>
                    <p className="text-xs text-green-500 flex items-center">
                      <span className="mr-1">↓</span> -5% vs hier
                    </p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-muted-foreground">Eau</p>
                    <p className="text-lg font-medium">18 L</p>
                    <p className="text-xs text-red-500 flex items-center">
                      <span className="mr-1">↑</span> +8% vs hier
                    </p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-sm">
                    <p className="text-sm text-muted-foreground">Chauffage</p>
                    <p className="text-lg font-medium">3.2 kWh</p>
                    <p className="text-xs text-gray-500">Identique à hier</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* House View */}
          <div className="h-[500px] md:h-[550px] w-full bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4 border border-gray-100 dark:border-slate-700">
            <h3 className="text-lg font-semibold mb-4 px-2">Plan de la maison</h3>
            {selectedRoomId ? (
              <ScrollArea className="h-[calc(100%-40px)] w-full">
                <RoomDeviceControl 
                  roomId={selectedRoomId} 
                  onBack={() => setSelectedRoomId(null)} 
                />
              </ScrollArea>
            ) : (
              <div className="h-[calc(100%-40px)] w-full">
                <HouseView onSelectRoom={setSelectedRoomId} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
