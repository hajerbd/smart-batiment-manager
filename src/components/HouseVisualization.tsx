
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Thermometer, 
  Droplets, 
  Fan, 
  Lamp,
  Lock,
  Blinds,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { rooms, Room, Device } from '@/config/house-config';

const HouseVisualization = () => {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  
  const getRoomColor = (roomId: string) => {
    if (selectedRoom && selectedRoom.id === roomId) {
      return 'bg-primary/20 border-primary';
    }
    
    // Check if room has any active devices
    const room = rooms.find(r => r.id === roomId);
    if (room && room.devices.some(d => d.status)) {
      return 'bg-green-100 border-green-400 dark:bg-green-900/20 dark:border-green-700';
    }
    
    return 'bg-secondary/40 border-border';
  };

  const getDeviceIcon = (device: Device) => {
    switch (device.type) {
      case 'climate':
        return <Fan className="h-5 w-5" />;
      case 'heating':
        return <Thermometer className="h-5 w-5 text-red-500" />;
      case 'blinds':
        return <Blinds className="h-5 w-5" />;
      case 'irrigation':
        return <Droplets className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
    setShowDetails(true);
  };
  
  const handleCloseDetails = () => {
    setShowDetails(false);
    setTimeout(() => setSelectedRoom(null), 300);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Plan de la maison</span>
          <Badge variant="outline">Vue en temps réel</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-[400px] w-full border-2 border-dashed border-border rounded-md p-4 overflow-hidden">
          {/* Simple house layout */}
          <div className="absolute inset-4 grid grid-cols-12 grid-rows-6 gap-2 h-[calc(100%-32px)] w-[calc(100%-32px)]">
            {/* Bedroom 1 */}
            <div 
              className={cn(
                "col-span-5 row-span-3 border-2 rounded-md flex flex-col justify-between p-3 cursor-pointer transition-colors",
                getRoomColor('bedroom1')
              )}
              onClick={() => handleRoomClick(rooms[0])}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium">Chambre Principale</h3>
                <div className="flex space-x-1">
                  {rooms[0].devices.filter(d => d.status).map((device, idx) => (
                    <div key={idx} className="p-1 bg-white/60 rounded">
                      {getDeviceIcon(device)}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Thermometer className="h-4 w-4 mr-1" /> {rooms[0].temperature}°C
                </span>
                <span className="flex items-center">
                  <Droplets className="h-4 w-4 mr-1" /> {rooms[0].humidity}%
                </span>
              </div>
            </div>
            
            {/* Bedroom 2 */}
            <div 
              className={cn(
                "col-span-5 row-span-3 border-2 rounded-md flex flex-col justify-between p-3 cursor-pointer transition-colors",
                getRoomColor('bedroom2')
              )}
              onClick={() => handleRoomClick(rooms[1])}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium">Chambre Secondaire</h3>
                <div className="flex space-x-1">
                  {rooms[1].devices.filter(d => d.status).map((device, idx) => (
                    <div key={idx} className="p-1 bg-white/60 rounded">
                      {getDeviceIcon(device)}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Thermometer className="h-4 w-4 mr-1" /> {rooms[1].temperature}°C
                </span>
                <span className="flex items-center">
                  <Droplets className="h-4 w-4 mr-1" /> {rooms[1].humidity}%
                </span>
              </div>
            </div>
            
            {/* Corridor */}
            <div 
              className={cn(
                "col-span-2 row-span-6 border-2 rounded-md flex flex-col justify-between p-3 cursor-pointer transition-colors",
                getRoomColor('corridor')
              )}
              onClick={() => handleRoomClick(rooms[3])}
            >
              <div>
                <h3 className="font-medium text-xs">Couloir</h3>
                <div className="flex flex-col space-y-1 mt-2">
                  {rooms[3].devices.filter(d => d.status).map((device, idx) => (
                    <div key={idx} className="p-1 bg-white/60 rounded">
                      {getDeviceIcon(device)}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col text-xs text-muted-foreground space-y-1">
                <span className="flex items-center">
                  <Thermometer className="h-3 w-3 mr-1" /> {rooms[3].temperature}°C
                </span>
                <span className="flex items-center">
                  <Droplets className="h-3 w-3 mr-1" /> {rooms[3].humidity}%
                </span>
              </div>
            </div>
            
            {/* Living Room */}
            <div 
              className={cn(
                "col-span-10 row-span-3 border-2 rounded-md flex flex-col justify-between p-3 cursor-pointer transition-colors",
                getRoomColor('living-room')
              )}
              onClick={() => handleRoomClick(rooms[2])}
            >
              <div className="flex justify-between items-start">
                <h3 className="font-medium">Salon</h3>
                <div className="flex space-x-1">
                  {rooms[2].devices.filter(d => d.status).map((device, idx) => (
                    <div key={idx} className="p-1 bg-white/60 rounded">
                      {getDeviceIcon(device)}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Thermometer className="h-4 w-4 mr-1" /> {rooms[2].temperature}°C
                </span>
                <span className="flex items-center">
                  <Droplets className="h-4 w-4 mr-1" /> {rooms[2].humidity}%
                </span>
                <span className="flex items-center">
                  <Lamp className="h-4 w-4 mr-1" /> On
                </span>
                <span className="flex items-center">
                  <Lock className="h-4 w-4 mr-1" /> Secured
                </span>
              </div>
            </div>
            
            {/* Garden */}
            <div 
              className={cn(
                "col-span-12 row-span-1 border-2 rounded-md flex items-center justify-between p-3 cursor-pointer transition-colors bg-green-100/50 border-green-200",
                getRoomColor('garden')
              )}
              onClick={() => handleRoomClick(rooms[4])}
            >
              <h3 className="font-medium">Jardin</h3>
              <div className="flex items-center space-x-4">
                <span className="flex items-center text-sm text-muted-foreground">
                  <Thermometer className="h-4 w-4 mr-1" /> {rooms[4].temperature}°C
                </span>
                <span className="flex items-center text-sm text-muted-foreground">
                  <Droplets className="h-4 w-4 mr-1" /> {rooms[4].humidity}%
                </span>
                <div className="flex space-x-1">
                  {rooms[4].devices.filter(d => d.status).map((device, idx) => (
                    <div key={idx} className="p-1 bg-white/60 rounded">
                      {getDeviceIcon(device)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Alert indicators */}
          <div className="absolute top-6 left-8">
            <div className="p-2 bg-red-500 text-white rounded-full animate-pulse">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          
          {/* Room details popup */}
          {selectedRoom && (
            <div className={cn(
              "absolute inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300",
              showDetails ? "opacity-100" : "opacity-0 pointer-events-none"
            )}>
              <Card className="w-[90%] max-w-md">
                <CardHeader>
                  <CardTitle>{selectedRoom.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary/50 rounded-lg p-4 flex flex-col items-center justify-center">
                      <Thermometer className="h-6 w-6 text-orange-500 mb-2" />
                      <div className="text-xl font-bold">{selectedRoom.temperature}°C</div>
                      <div className="text-xs text-muted-foreground">Température</div>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-4 flex flex-col items-center justify-center">
                      <Droplets className="h-6 w-6 text-blue-500 mb-2" />
                      <div className="text-xl font-bold">{selectedRoom.humidity}%</div>
                      <div className="text-xs text-muted-foreground">Humidité</div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Appareils</h3>
                    <div className="space-y-2">
                      {selectedRoom.devices.map((device) => (
                        <div key={device.id} className="flex items-center justify-between border p-2 rounded">
                          <div className="flex items-center">
                            <div className={cn(
                              "p-1.5 rounded-full mr-2",
                              device.status ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
                            )}>
                              {getDeviceIcon(device)}
                            </div>
                            <span>{device.name}</span>
                          </div>
                          <Badge variant={device.status ? "default" : "outline"}>
                            {device.status ? "Actif" : "Inactif"}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button onClick={handleCloseDetails} className="w-full">
                    Fermer
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HouseVisualization;
