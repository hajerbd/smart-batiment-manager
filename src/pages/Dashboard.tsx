
/**
 * Page du tableau de bord
 * - Affiche une vue d'ensemble de la maison intelligente
 * - Permet de naviguer entre la vue générale et le contrôle des pièces
 */
import React, { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import AlertsPanel from '@/components/AlertsPanel';
import HouseView from '@/components/HouseView';
import RoomDeviceControl from '@/components/device-control/RoomDeviceControl';
import WeatherWidget from '@/components/WeatherWidget';
import { Card, CardContent } from '@/components/ui/card';
import { CircleCheck, Home, Thermometer } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useDeviceContext } from '@/context/DeviceContext';

const Dashboard = () => {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const { rooms } = useDeviceContext();
  
  // Calcul des statistiques pour les cartes du tableau de bord
  const activeDevicesCount = rooms.flatMap(r => r.devices).filter(d => d.status).length;
  const totalDevicesCount = rooms.flatMap(r => r.devices).length;
  const activePercentage = Math.round((activeDevicesCount / totalDevicesCount) * 100);
  
  // Calcul de la température moyenne
  const tempDevices = rooms.flatMap(r => r.devices).filter(d => d.temperature);
  const avgTemp = tempDevices.length > 0 
    ? Math.round(tempDevices.reduce((sum, device) => {
        return sum + parseFloat(device.temperature?.replace('°C', '') || '0');
      }, 0) / tempDevices.length) 
    : 0;

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <DashboardHeader title="Tableau de bord VitaSmart" />
      <div className="flex-1 overflow-auto">
        <div className="p-3 md:p-4 lg:p-6">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 mb-3 md:mb-4">
            {/* Carte de statistiques - Systèmes actifs */}
            <Card className="shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-2 md:p-4 flex items-center space-x-2 md:space-x-3">
                <div className="p-2 bg-green-100 rounded-full dark:bg-green-900">
                  <CircleCheck className="h-4 w-4 md:h-5 md:w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium">Systèmes actifs</p>
                  <h3 className="text-sm md:text-lg font-bold">{activePercentage}%</h3>
                </div>
              </CardContent>
            </Card>
            
            {/* Carte de statistiques - Nombre de pièces */}
            <Card className="shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-2 md:p-4 flex items-center space-x-2 md:space-x-3">
                <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900">
                  <Home className="h-4 w-4 md:h-5 md:w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium">Pièces gérées</p>
                  <h3 className="text-sm md:text-lg font-bold">{rooms.length}</h3>
                </div>
              </CardContent>
            </Card>
            
            {/* Carte de statistiques - Température moyenne */}
            <Card className="shadow-md hover:shadow-lg transition-all">
              <CardContent className="p-2 md:p-4 flex items-center space-x-2 md:space-x-3">
                <div className="p-2 bg-purple-100 rounded-full dark:bg-purple-900">
                  <Thermometer className="h-4 w-4 md:h-5 md:w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-xs md:text-sm text-muted-foreground font-medium">Temp. moyenne</p>
                  <h3 className="text-sm md:text-lg font-bold">{avgTemp}°C</h3>
                </div>
              </CardContent>
            </Card>

            {/* Widget météo */}
            <WeatherWidget />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4">
            {/* Vue de la maison ou contrôle des appareils d'une pièce */}
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
            {/* Panneau des alertes */}
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
