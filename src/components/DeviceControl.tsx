
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { 
  Lightbulb, 
  Thermometer, 
  Fan, 
  Lock, 
  Power, 
  Blinds,
  ChevronRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Device {
  id: string;
  name: string;
  type: 'light' | 'thermostat' | 'fan' | 'door' | 'outlet' | 'blinds';
  status: boolean;
  value?: number;
  icon: React.ReactNode;
  room: string;
  batteryLevel?: number;
}

const mockDevices: Device[] = [
  {
    id: '1',
    name: 'Lumière principale',
    type: 'light',
    status: true,
    value: 80,
    icon: <Lightbulb className="h-5 w-5" />,
    room: 'Accueil',
    batteryLevel: 100
  },
  {
    id: '2',
    name: 'Climatisation',
    type: 'thermostat',
    status: true,
    value: 22,
    icon: <Thermometer className="h-5 w-5" />,
    room: 'Bureau principal',
    batteryLevel: 85
  },
  {
    id: '3',
    name: 'Ventilateur',
    type: 'fan',
    status: false,
    value: 0,
    icon: <Fan className="h-5 w-5" />,
    room: 'Salle de conférence',
    batteryLevel: 72
  },
  {
    id: '4',
    name: 'Porte d\'entrée',
    type: 'door',
    status: true,
    icon: <Lock className="h-5 w-5" />,
    room: 'Entrée',
    batteryLevel: 65
  },
  {
    id: '5',
    name: 'Prise intelligente',
    type: 'outlet',
    status: true,
    icon: <Power className="h-5 w-5" />,
    room: 'Salle serveur',
    batteryLevel: 90
  },
  {
    id: '6',
    name: 'Stores automatiques',
    type: 'blinds',
    status: false,
    value: 0,
    icon: <Blinds className="h-5 w-5" />,
    room: 'Bureau direction',
    batteryLevel: 50
  }
];

const DeviceControl = () => {
  const [devices, setDevices] = useState<Device[]>(mockDevices);

  const toggleDevice = (id: string) => {
    setDevices(devices.map(device => 
      device.id === id ? { ...device, status: !device.status, value: device.status ? 0 : device.value || 0 } : device
    ));
  };

  const adjustDeviceValue = (id: string, newValue: number) => {
    setDevices(devices.map(device => 
      device.id === id ? { ...device, value: newValue, status: newValue > 0 } : device
    ));
  };

  const getDeviceControlUI = (device: Device) => {
    switch (device.type) {
      case 'light':
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
              step={1}
              disabled={!device.status}
              onValueChange={(value) => adjustDeviceValue(device.id, value[0])}
            />
          </div>
        );
      case 'thermostat':
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
              onValueChange={(value) => adjustDeviceValue(device.id, value[0])}
            />
          </div>
        );
      case 'fan':
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Vitesse</span>
              <span className="text-sm font-medium">{device.value}%</span>
            </div>
            <Slider
              value={[device.value || 0]}
              min={0}
              max={100}
              step={5}
              disabled={!device.status}
              onValueChange={(value) => adjustDeviceValue(device.id, value[0])}
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
              onValueChange={(value) => adjustDeviceValue(device.id, value[0])}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Contrôle des appareils</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {devices.map((device) => (
            <div 
              key={device.id}
              className={cn(
                "border rounded-md p-4 transition-colors",
                device.status ? "bg-card" : "bg-muted/20"
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "p-2 rounded-full",
                    device.status 
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                  )}>
                    {device.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{device.name}</h3>
                    <p className="text-xs text-muted-foreground">{device.room}</p>
                  </div>
                </div>
                <Switch
                  checked={device.status}
                  onCheckedChange={() => toggleDevice(device.id)}
                />
              </div>
              
              {device.status && getDeviceControlUI(device)}
              
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className={cn(
                    device.status ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800" 
                    : "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800"
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
                
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceControl;
