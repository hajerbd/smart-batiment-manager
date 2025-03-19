
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { rooms, Room, Device } from '@/config/house-config';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  Thermometer, 
  Droplets, 
  Fan, 
  Blinds, 
  Flame, 
  PlusCircle,
  ChevronRight,
  ArrowUpDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import DashboardHeader from '@/components/DashboardHeader';

const Rooms = () => {
  const [roomsData, setRoomsData] = useState(rooms);

  const getDeviceIcon = (device: Device) => {
    switch (device.type) {
      case 'climate':
        return <Fan className="h-5 w-5" />;
      case 'heating':
        return <Flame className="h-5 w-5" />;
      case 'blinds':
        return <Blinds className="h-5 w-5" />;
      case 'irrigation':
        return <Droplets className="h-5 w-5" />;
      default:
        return <PlusCircle className="h-5 w-5" />;
    }
  };

  const toggleDevice = (roomId: string, deviceId: string) => {
    setRoomsData(rooms => 
      rooms.map(room => 
        room.id === roomId 
          ? {
              ...room,
              devices: room.devices.map(device => 
                device.id === deviceId 
                  ? { ...device, status: !device.status, value: device.status ? 0 : device.value || 0 } 
                  : device
              )
            } 
          : room
      )
    );
  };

  const adjustDeviceValue = (roomId: string, deviceId: string, newValue: number) => {
    setRoomsData(rooms => 
      rooms.map(room => 
        room.id === roomId 
          ? {
              ...room,
              devices: room.devices.map(device => 
                device.id === deviceId 
                  ? { ...device, value: newValue, status: newValue > 0 } 
                  : device
              )
            } 
          : room
      )
    );
  };

  const getDeviceControlUI = (room: Room, device: Device) => {
    switch (device.type) {
      case 'climate':
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Température</span>
              <span className="text-sm font-medium">{device.value}°C</span>
            </div>
            <Slider
              value={[device.value || 20]}
              min={16}
              max={28}
              step={0.5}
              disabled={!device.status}
              onValueChange={(value) => adjustDeviceValue(room.id, device.id, value[0])}
            />
          </div>
        );
      case 'heating':
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Température</span>
              <span className="text-sm font-medium">{device.value}°C</span>
            </div>
            <Slider
              value={[device.value || 18]}
              min={15}
              max={30}
              step={0.5}
              disabled={!device.status}
              onValueChange={(value) => adjustDeviceValue(room.id, device.id, value[0])}
            />
          </div>
        );
      case 'blinds':
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Ouverture</span>
              <span className="text-sm font-medium">{device.value}%</span>
            </div>
            <Slider
              value={[device.value || 0]}
              min={0}
              max={100}
              step={5}
              disabled={!device.status}
              onValueChange={(value) => adjustDeviceValue(room.id, device.id, value[0])}
            />
          </div>
        );
      case 'irrigation':
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Intensité</span>
              <span className="text-sm font-medium">{device.value}%</span>
            </div>
            <Slider
              value={[device.value || 0]}
              min={0}
              max={100}
              step={5}
              disabled={!device.status}
              onValueChange={(value) => adjustDeviceValue(room.id, device.id, value[0])}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader title="Pièces & Contrôle" />
      <div className="flex-1 p-4 space-y-6">
        <Tabs defaultValue={roomsData[0].id} className="w-full">
          <TabsList className="flex max-w-full overflow-x-auto pb-2 mb-2">
            {roomsData.map((room) => (
              <TabsTrigger key={room.id} value={room.id} className="min-w-[120px]">
                {room.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {roomsData.map((room) => (
            <TabsContent key={room.id} value={room.id} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Room information card */}
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>{room.name}</span>
                      <Button variant="outline" size="sm">
                        <ArrowUpDown className="h-4 w-4 mr-1" />
                        Détails
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-secondary/50 rounded-lg p-4 flex flex-col items-center justify-center">
                        <Thermometer className="h-6 w-6 text-orange-500 mb-2" />
                        <div className="text-xl font-bold">{room.temperature}°C</div>
                        <div className="text-xs text-muted-foreground">Température</div>
                      </div>
                      <div className="bg-secondary/50 rounded-lg p-4 flex flex-col items-center justify-center">
                        <Droplets className="h-6 w-6 text-blue-500 mb-2" />
                        <div className="text-xl font-bold">{room.humidity}%</div>
                        <div className="text-xs text-muted-foreground">Humidité</div>
                      </div>
                    </div>
                    
                    <div className="bg-secondary/30 rounded-lg p-4">
                      <h3 className="text-sm font-medium mb-2">Périphériques</h3>
                      <div className="space-y-2">
                        {room.devices.map((device) => (
                          <div key={device.id} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className={cn(
                                "p-1.5 rounded-full mr-2",
                                device.status ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
                              )}>
                                {getDeviceIcon(device)}
                              </div>
                              <span className="text-sm">{device.name}</span>
                            </div>
                            <Badge variant={device.status ? "default" : "outline"}>
                              {device.status ? "Actif" : "Inactif"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Devices control cards */}
                {room.devices.map((device) => (
                  <Card key={device.id} className={cn(
                    "transition-colors duration-300",
                    device.status ? "bg-card" : "bg-muted/20"
                  )}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <div className={cn(
                            "p-2 rounded-full",
                            device.status 
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground"
                          )}>
                            {getDeviceIcon(device)}
                          </div>
                          <CardTitle className="text-lg">{device.name}</CardTitle>
                        </div>
                        <Switch
                          checked={device.status}
                          onCheckedChange={() => toggleDevice(room.id, device.id)}
                        />
                      </div>
                    </CardHeader>
                    <CardContent>
                      {device.status && getDeviceControlUI(room, device)}
                      
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={cn(
                            device.status ? "bg-green-100 text-green-800 border-green-200" 
                            : "bg-gray-100 text-gray-800 border-gray-200"
                          )}>
                            {device.status ? 'En fonction' : 'Hors fonction'}
                          </Badge>
                          
                          {device.batteryLevel !== undefined && (
                            <div className="flex items-center text-xs text-muted-foreground">
                              <div className="relative w-4 h-2 border rounded mr-1">
                                <div 
                                  className={cn(
                                    "absolute left-0 top-0 bottom-0 rounded-sm",
                                    device.batteryLevel > 20 ? "bg-green-500" : "bg-red-500"
                                  )} 
                                  style={{ width: `${device.batteryLevel}%` }} 
                                />
                              </div>
                              {device.batteryLevel}%
                            </div>
                          )}
                        </div>
                        
                        <Button variant="ghost" size="sm" className="h-7 w-7">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Mode selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Modes de contrôle</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4 hover:bg-secondary/30 cursor-pointer transition-colors">
                      <h3 className="font-medium mb-2">Mode Manuel</h3>
                      <p className="text-sm text-muted-foreground">Contrôlez manuellement tous les appareils de cette pièce.</p>
                    </div>
                    <div className="border rounded-lg p-4 hover:bg-secondary/30 cursor-pointer transition-colors">
                      <h3 className="font-medium mb-2">Mode Automatique</h3>
                      <p className="text-sm text-muted-foreground">L'automate gère intelligemment les appareils selon vos préférences.</p>
                    </div>
                    <div className="border rounded-lg p-4 hover:bg-secondary/30 cursor-pointer transition-colors">
                      <h3 className="font-medium mb-2">Mode Économie</h3>
                      <p className="text-sm text-muted-foreground">Économisez de l'énergie tout en maintenant un confort optimal.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Rooms;
