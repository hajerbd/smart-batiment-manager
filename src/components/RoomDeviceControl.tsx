
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Thermometer, 
  Snowflake,
  Blinds,
  Droplet,
  Lamp,
  Clock,
  Zap,
  Home,
  ChevronRight,
  ArrowLeft,
  Timer
} from 'lucide-react';
import { Toggle, ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { 
  Dialog,
  DialogContent,
  DialogDescription, 
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';

// Types
interface Device {
  id: string;
  name: string;
  type: 'heating' | 'cooling' | 'blinds' | 'irrigation' | 'lighting';
  status: boolean;
  icon: React.ReactNode;
  temperature?: string;
}

interface Room {
  id: string;
  name: string;
  icon: React.ReactNode;
  devices: Device[];
}

// Données simulées
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
        icon: <Thermometer className="h-5 w-5" />,
        temperature: '21°C'
      },
      {
        id: '12',
        name: 'Climatisation',
        type: 'cooling',
        status: false,
        icon: <Snowflake className="h-5 w-5" />,
        temperature: '21°C'
      },
      {
        id: '13',
        name: 'Stores automatiques',
        type: 'blinds',
        status: true,
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
        icon: <Thermometer className="h-5 w-5" />,
        temperature: '19°C'
      },
      {
        id: '22',
        name: 'Climatisation',
        type: 'cooling',
        status: true,
        icon: <Snowflake className="h-5 w-5" />,
        temperature: '19°C'
      },
      {
        id: '23',
        name: 'Stores automatiques',
        type: 'blinds',
        status: false,
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
        icon: <Thermometer className="h-5 w-5" />,
        temperature: '20°C'
      },
      {
        id: '32',
        name: 'Climatisation',
        type: 'cooling',
        status: false,
        icon: <Snowflake className="h-5 w-5" />,
        temperature: '20°C'
      },
      {
        id: '33',
        name: 'Stores automatiques',
        type: 'blinds',
        status: true,
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
        icon: <Droplet className="h-5 w-5" />
      }
    ]
  }
];

interface RoomDeviceControlProps {
  roomId: string | null;
  onBack: () => void;
}

const RoomDeviceControl: React.FC<RoomDeviceControlProps> = ({ roomId, onBack }) => {
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [controlMode, setControlMode] = useState<'manual' | 'auto'>('manual');
  
  // Trouver la chambre sélectionnée
  const selectedRoom = rooms.find(room => room.id === roomId);
  
  if (!selectedRoom) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <p>Sélectionnez une pièce pour voir ses équipements</p>
          <Button variant="outline" className="mt-4" onClick={onBack}>
            Retour au plan
          </Button>
        </CardContent>
      </Card>
    );
  }
  
  // Fonction pour basculer l'état d'un appareil
  const toggleDevice = (deviceId: string) => {
    setRooms(rooms.map(room => 
      room.id === selectedRoom.id ? {
        ...room,
        devices: room.devices.map(device =>
          device.id === deviceId ? { 
            ...device, 
            status: !device.status
          } : device
        )
      } : room
    ));
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle>{selectedRoom.name}</CardTitle>
        </div>
        <ToggleGroup type="single" value={controlMode} onValueChange={(value) => value && setControlMode(value as 'manual' | 'auto')}>
          <ToggleGroupItem value="manual" aria-label="Manuel" className="flex items-center gap-1">
            <Zap className="h-4 w-4" />
            <span className="hidden sm:inline">Manuel</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="auto" aria-label="Automatique" className="flex items-center gap-1">
            <Timer className="h-4 w-4" />
            <span className="hidden sm:inline">Automatique</span>
          </ToggleGroupItem>
        </ToggleGroup>
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
                    {device.temperature && (
                      <span className="text-xs text-muted-foreground">Température actuelle: {device.temperature}</span>
                    )}
                  </div>
                </div>
                <Switch
                  checked={device.status}
                  onCheckedChange={() => toggleDevice(device.id)}
                />
              </div>
              
              {device.status && (
                <div className="space-y-3">
                  {controlMode === 'manual' ? (
                    <div className="flex justify-between items-center mt-2">
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400">
                        <Zap className="h-3 w-3 mr-1" /> Actif
                      </Badge>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" /> Programmer
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Programmation - {device.name}</DialogTitle>
                            <DialogDescription>
                              Définissez les heures de fonctionnement
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="startTime">Heure de début</Label>
                                <Input 
                                  id="startTime" 
                                  type="time" 
                                  defaultValue="08:00"
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="endTime">Heure de fin</Label>
                                <Input 
                                  id="endTime" 
                                  type="time" 
                                  defaultValue="18:00"
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label>Temps de fonctionnement:</Label>
                              <div className="text-sm font-medium">10:00 heures</div>
                            </div>
                          </div>
                          
                          <div className="flex justify-end gap-2">
                            <DialogClose asChild>
                              <Button variant="outline">Annuler</Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button type="submit">Enregistrer</Button>
                            </DialogClose>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  ) : (
                    <div className="space-y-3 mt-2">
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400">
                        <Timer className="h-3 w-3 mr-1" /> Mode automatique
                      </Badge>
                      
                      <div className="text-xs text-muted-foreground mt-2">
                        <div className="flex justify-between">
                          <span>Optimisation automatique</span>
                          <span className="font-medium text-green-600">Activée</span>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span>Prochaine activation</span>
                          <span className="font-medium">18:30</span>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span>Temps de fonctionnement estimé</span>
                          <span className="font-medium">2h30</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomDeviceControl;
