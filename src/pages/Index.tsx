
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
      <div className="flex-1 p-2 overflow-hidden">
        {/* Stats overview */}
        <div className="grid grid-cols-3 gap-2 mb-2">
          <Card className="shadow-sm">
            <CardContent className="p-3 flex items-center space-x-3">
              <div className="p-1.5 bg-green-100 rounded-full dark:bg-green-900">
                <CircleCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Systèmes actifs</p>
                <h3 className="text-base font-bold">95%</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="p-3 flex items-center space-x-3">
              <div className="p-1.5 bg-blue-100 rounded-full dark:bg-blue-900">
                <Home className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Pièces gérées</p>
                <h3 className="text-base font-bold">5</h3>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm">
            <CardContent className="p-3 flex items-center space-x-3">
              <div className="p-1.5 bg-purple-100 rounded-full dark:bg-purple-900">
                <Thermometer className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Temp. moyenne</p>
                <h3 className="text-base font-bold">22°C</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weather widget with reduced height */}
        <div className="mb-2">
          <WeatherWidget />
        </div>
        
        {/* Main dashboard content - Plan de maison et contrôle des pièces */}
        <div className="grid grid-cols-2 gap-2 h-[calc(100vh-270px)]">
          <div className="h-full">
            {selectedRoomId ? (
              <ScrollArea className="h-full">
                <RoomDeviceControl 
                  roomId={selectedRoomId} 
                  onBack={() => setSelectedRoomId(null)} 
                />
              </ScrollArea>
            ) : (
              <HouseView onSelectRoom={setSelectedRoomId} />
            )}
          </div>
          <div className="h-full">
            <ScrollArea className="h-full">
              <AlertsPanel />
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
