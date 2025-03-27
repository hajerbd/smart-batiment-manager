
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { 
  Thermometer, 
  Snowflake,
  Blinds,
  Droplet,
  Lamp,
  ChevronRight,
  Home,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Room {
  id: string;
  name: string;
  icon: React.ReactNode;
  devices: Device[];
}

interface Device {
  id: string;
  name: string;
  type: 'heating' | 'cooling' | 'blinds' | 'irrigation' | 'lighting';
  status: boolean;
  value?: number;
  icon: React.ReactNode;
  temperature?: string;
}

const mockRooms: Room[] = [
  {
    id: '1',
    name: 'Chambre n°1',
    icon: <Home className="h-5 w-5" />,
    devices: [
      {
        id: '11',
        name: 'Chauffage',
        type: 'heating',
        status: true,
        value: 22,
        icon: <Thermometer className="h-5 w-5" />,
        temperature: '21°C'
      },
      {
        id: '12',
        name: 'Climatisation',
        type: 'cooling',
        status: false,
        value: 0,
        icon: <Snowflake className="h-5 w-5" />,
        temperature: '21°C'
      },
      {
        id: '13',
        name: 'Stores automatiques',
        type: 'blinds',
        status: true,
        value: 75,
        icon: <Blinds className="h-5 w-5" />
      }
    ]
  },
  {
    id: '2',
    name: 'Chambre n°2',
    icon: <Home className="h-5 w-5" />,
    devices: [
      {
        id: '21',
        name: 'Chauffage',
        type: 'heating',
        status: false,
        value: 0,
        icon: <Thermometer className="h-5 w-5" />,
        temperature: '19°C'
      },
      {
        id: '22',
        name: 'Climatisation',
        type: 'cooling',
        status: true,
        value: 23,
        icon: <Snowflake className="h-5 w-5" />,
        temperature: '19°C'
      },
      {
        id: '23',
        name: 'Stores automatiques',
        type: 'blinds',
        status: false,
        value: 0,
        icon: <Blinds className="h-5 w-5" />
      }
    ]
  },
  {
    id: '3',
    name: 'Salon',
    icon: <Home className="h-5 w-5" />,
    devices: [
      {
        id: '31',
        name: 'Chauffage',
        type: 'heating',
        status: true,
        value: 21,
        icon: <Thermometer className="h-5 w-5" />,
        temperature: '20°C'
      },
      {
        id: '32',
        name: 'Climatisation',
        type: 'cooling',
        status: false,
        value: 0,
        icon: <Snowflake className="h-5 w-5" />,
        temperature: '20°C'
      },
      {
        id: '33',
        name: 'Stores automatiques',
        type: 'blinds',
        status: true,
        value: 50,
        icon: <Blinds className="h-5 w-5" />
      }
    ]
  },
  {
    id: '4',
    name: 'Couloir',
    icon: <Home className="h-5 w-5" />,
    devices: [
      {
        id: '41',
        name: 'Lumière principale',
        type: 'lighting',
        status: true,
        value: 80,
        icon: <Lamp className="h-5 w-5" />
      }
    ]
  },
  {
    id: '5',
    name: 'Jardin',
    icon: <Home className="h-5 w-5" />,
    devices: [
      {
        id: '51',
        name: 'Vannes d\'irrigation',
        type: 'irrigation',
        status: false,
        value: 0,
        icon: <Droplet className="h-5 w-5" />
      }
    ]
  }
];

const RoomControl = () => {
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  
  const toggleDevice = (roomId: string, deviceId: string) => {
    setRooms(rooms.map(room => 
      room.id === roomId ? {
        ...room,
        devices: room.devices.map(device =>
          device.id === deviceId ? { 
            ...device, 
            status: !device.status, 
            value: device.type === 'heating' || device.type === 'cooling' 
              ? (device.status ? 0 : device.value || 0)
              : device.value
          } : device
        )
      } : room
    ));
  };

  const adjustDeviceValue = (roomId: string, deviceId: string, newValue: number) => {
    setRooms(rooms.map(room => 
      room.id === roomId ? {
        ...room,
        devices: room.devices.map(device =>
          device.id === deviceId ? { 
            ...device, 
            value: newValue, 
            status: newValue > 0 
          } : device
        )
      } : room
    ));
  };

  const getDeviceControlUI = (room: Room, device: Device) => {
    switch (device.type) {
      case 'heating':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Température</span>
              <span className="text-sm font-medium">{device.value}°C</span>
            </div>
            <Slider
              value={[device.value || 0]}
              min={15}
              max={30}
              step={1}
              disabled={!device.status}
              onValueChange={(value) => adjustDeviceValue(room.id, device.id, value[0])}
            />
            <div className="mt-2">
              <Label className="text-sm">Température actuelle</Label>
              <Input 
                value={device.temperature || '--'} 
                readOnly 
                className="mt-1 bg-muted"
              />
            </div>
          </div>
        );
      case 'cooling':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Température</span>
              <span className="text-sm font-medium">{device.value}°C</span>
            </div>
            <Slider
              value={[device.value || 0]}
              min={16}
              max={28}
              step={1}
              disabled={!device.status}
              onValueChange={(value) => adjustDeviceValue(room.id, device.id, value[0])}
            />
            <div className="mt-2">
              <Label className="text-sm">Température actuelle</Label>
              <Input 
                value={device.temperature || '--'} 
                readOnly 
                className="mt-1 bg-muted"
              />
            </div>
          </div>
        );
      case 'blinds':
        return (
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-medium">
              {device.status ? 'Ouverts' : 'Fermés'}
            </span>
            <div className="text-primary">
              {device.status ? <ToggleRight className="h-6 w-6" /> : <ToggleLeft className="h-6 w-6" />}
            </div>
          </div>
        );
      case 'irrigation':
        return (
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-medium">
              {device.status ? 'En marche' : 'Arrêté'}
            </span>
            <div className="text-primary">
              {device.status ? <ToggleRight className="h-6 w-6" /> : <ToggleLeft className="h-6 w-6" />}
            </div>
          </div>
        );
      case 'lighting':
        return (
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-medium">
              {device.status ? 'Allumée' : 'Éteinte'}
            </span>
            <div className="text-primary">
              {device.status ? <ToggleRight className="h-6 w-6" /> : <ToggleLeft className="h-6 w-6" />}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (selectedRoom) {
    return (
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{selectedRoom.name}</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setSelectedRoom(null)}>
            Retour
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedRoom.devices.map((device) => (
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
                    </div>
                  </div>
                  <Switch
                    checked={device.status}
                    onCheckedChange={() => toggleDevice(selectedRoom.id, device.id)}
                  />
                </div>
                
                {device.status && getDeviceControlUI(selectedRoom, device)}
                
                <div className="mt-3 flex items-center justify-between">
                  <Badge variant="outline" className={cn(
                    device.status ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800" 
                    : "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800"
                  )}>
                    {device.status ? 'En fonction' : 'Hors fonction'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Contrôle des pièces</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rooms.map((room) => (
            <div 
              key={room.id}
              className="border rounded-md p-4 hover:bg-accent/50 transition-colors cursor-pointer"
              onClick={() => setSelectedRoom(room)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 text-primary rounded-full">
                    {room.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{room.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {room.devices.length} appareils
                    </p>
                  </div>
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

export default RoomControl;
