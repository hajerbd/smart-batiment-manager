
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
        <div className="p-3 md:p-4 lg:p-6">
          {/* Top row avec stats et météo - taille réduite */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mb-3 md:mb-4">
            {/* Stats overview - taille réduite */}
            <Card className="shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-2 md:p-4 flex items-center space-x-2 md:space-x-3">
                <div className="p-2 bg-green-100 rounded-full dark:bg-green-900">
                  <CircleCheck className="h-4 w-4 md:h-5 md:w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium">Systèmes actifs</p>
                  <h3 className="text-sm md:text-lg font-bold">95%</h3>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-2 md:p-4 flex items-center space-x-2 md:space-x-3">
                <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900">
                  <Home className="h-4 w-4 md:h-5 md:w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium">Pièces gérées</p>
                  <h3 className="text-sm md:text-lg font-bold">5</h3>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-2 md:p-4 flex items-center space-x-2 md:space-x-3">
                <div className="p-2 bg-purple-100 rounded-full dark:bg-purple-900">
                  <Thermometer className="h-4 w-4 md:h-5 md:w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium">Temp. moyenne</p>
                  <h3 className="text-sm md:text-lg font-bold">22°C</h3>
                </div>
              </CardContent>
            </Card>

            {/* Weather widget - dernière colonne */}
            <WeatherWidget />
          </div>
          
          {/* Bottom row avec plan de maison et alertes - plus responsive */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4">
            <div className="h-[400px] xs:h-[450px] md:h-[500px] lg:h-[550px]">
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
            <div className="h-[400px] xs:h-[450px] md:h-[500px] lg:h-[550px]">
              <AlertsPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
