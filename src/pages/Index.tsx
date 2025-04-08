
import React, { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import AlertsPanel from '@/components/AlertsPanel';
import HouseView from '@/components/HouseView';
import RoomDeviceControl from '@/components/RoomDeviceControl';
import WeatherWidget from '@/components/WeatherWidget';
import { Card, CardContent } from '@/components/ui/card';
import { CircleCheck, Home, Thermometer } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const Dashboard = () => {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <DashboardHeader title="Tableau de bord VitaSmart" />
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6">
          {/* Top row avec stats et météo */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-6">
            {/* Stats overview - 3 premières colonnes avec taille de texte réduite */}
            <Card className="shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-4 md:p-6 flex items-center space-x-4">
                <div className="p-3 md:p-4 bg-green-100 rounded-full dark:bg-green-900">
                  <CircleCheck className="h-6 md:h-8 w-6 md:w-8 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm md:text-base text-muted-foreground font-medium">Systèmes actifs</p>
                  <h3 className="text-lg md:text-2xl font-bold">95%</h3>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-4 md:p-6 flex items-center space-x-4">
                <div className="p-3 md:p-4 bg-blue-100 rounded-full dark:bg-blue-900">
                  <Home className="h-6 md:h-8 w-6 md:w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm md:text-base text-muted-foreground font-medium">Pièces gérées</p>
                  <h3 className="text-lg md:text-2xl font-bold">5</h3>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-4 md:p-6 flex items-center space-x-4">
                <div className="p-3 md:p-4 bg-purple-100 rounded-full dark:bg-purple-900">
                  <Thermometer className="h-6 md:h-8 w-6 md:w-8 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm md:text-base text-muted-foreground font-medium">Temp. moyenne</p>
                  <h3 className="text-lg md:text-2xl font-bold">22°C</h3>
                </div>
              </CardContent>
            </Card>

            {/* Weather widget - dernière colonne */}
            <WeatherWidget />
          </div>
          
          {/* Bottom row avec plan de maison et alertes (sans la partie énergie) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <div className="h-[500px] md:h-[600px]">
              {selectedRoomId ? (
                <ScrollArea className="h-full w-full">
                  <RoomDeviceControl 
                    roomId={selectedRoomId} 
                    onBack={() => setSelectedRoomId(null)} 
                  />
                </ScrollArea>
              ) : (
                <div className="h-full w-full">
                  <HouseView onSelectRoom={setSelectedRoomId} />
                </div>
              )}
            </div>
            <div className="h-[500px] md:h-[600px]">
              <AlertsPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
