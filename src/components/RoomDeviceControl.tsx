
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
  Timer,
  Calendar
} from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
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
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { toast } from "@/hooks/use-toast";

// Types
interface Device {
  id: string;
  name: string;
  type: 'heating' | 'cooling' | 'blinds' | 'irrigation' | 'lighting';
  status: boolean;
  icon: React.ReactNode;
  temperature?: string;
  scheduledTime?: {
    startTime: string;
    endTime: string;
    date?: Date;
  }
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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
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
  
  // Fonction pour basculer l'état d'un appareil en mode manuel
  const toggleDevice = (deviceId: string) => {
    if (controlMode !== 'manual') {
      toast({
        title: "Mode manuel requis",
        description: "Passez en mode manuel pour activer/désactiver directement les appareils.",
        variant: "destructive"
      });
      return;
    }
    
    setRooms(rooms.map(room => 
      room.id === selectedRoom.id ? {
        ...room,
        devices: room.devices.map(device =>
          device.id === deviceId ? { 
            ...device, 
            status: !device.status,
            // Reset scheduled time if turning off
            scheduledTime: device.status ? undefined : device.scheduledTime
          } : device
        )
      } : room
    ));
    
    // Notification
    const device = selectedRoom.devices.find(d => d.id === deviceId);
    if (device) {
      toast({
        title: device.status ? `${device.name} désactivé` : `${device.name} activé`,
        description: device.status ? "L'appareil a été éteint" : "L'appareil a été allumé",
      });
    }
  };

  // Fonction pour programmer un appareil en mode automatique
  const scheduleDevice = (deviceId: string, startTime: string, endTime: string, date?: Date) => {
    if (controlMode !== 'auto') {
      toast({
        title: "Mode automatique requis",
        description: "Passez en mode automatique pour programmer les appareils.",
        variant: "destructive"
      });
      return;
    }
    
    setRooms(rooms.map(room => 
      room.id === selectedRoom.id ? {
        ...room,
        devices: room.devices.map(device =>
          device.id === deviceId ? { 
            ...device, 
            scheduledTime: {
              startTime,
              endTime,
              date
            },
            status: true // Activer l'appareil quand programmé
          } : device
        )
      } : room
    ));
    
    // Notification
    const device = selectedRoom.devices.find(d => d.id === deviceId);
    if (device) {
      toast({
        title: `${device.name} programmé`,
        description: date 
          ? `Programmé pour le ${format(date, 'dd/MM/yyyy')} de ${startTime} à ${endTime}` 
          : `Programmé quotidiennement de ${startTime} à ${endTime}`,
      });
    }
  };
  
  // Gérer le changement de mode
  const handleModeChange = (value: string) => {
    if (value) {
      setControlMode(value as 'manual' | 'auto');
      
      toast({
        title: `Mode ${value === 'manual' ? 'manuel' : 'automatique'} activé`,
        description: value === 'manual' 
          ? "Vous pouvez maintenant activer ou désactiver directement les appareils."
          : "Vous pouvez maintenant programmer les appareils pour qu'ils fonctionnent automatiquement.",
      });
    }
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
        <ToggleGroup type="single" value={controlMode} onValueChange={handleModeChange}>
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
                
                {/* Contrôle différent selon le mode */}
                {controlMode === 'manual' ? (
                  <Switch
                    checked={device.status}
                    onCheckedChange={() => toggleDevice(device.id)}
                  />
                ) : (
                  <div className="flex flex-col items-end gap-2">
                    {device.scheduledTime ? (
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400">
                        <Timer className="h-3 w-3 mr-1" /> Programmé
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400">
                        Non programmé
                      </Badge>
                    )}
                  </div>
                )}
              </div>
              
              {/* Affichage d'état et options selon le mode */}
              <div className="space-y-3">
                {controlMode === 'manual' ? (
                  /* Mode manuel - afficher simplement l'état actif/inactif */
                  device.status && (
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400">
                      <Zap className="h-3 w-3 mr-1" /> Actif
                    </Badge>
                  )
                ) : (
                  /* Mode automatique - afficher la programmation ou option de programmer */
                  <div className="space-y-3 mt-2">
                    {device.scheduledTime ? (
                      <>
                        <div className="text-xs text-muted-foreground mt-2">
                          <div className="flex justify-between">
                            <span>Date programmée:</span>
                            <span className="font-medium">
                              {device.scheduledTime.date 
                                ? format(device.scheduledTime.date, 'dd/MM/yyyy') 
                                : 'Tous les jours'}
                            </span>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span>Heure début:</span>
                            <span className="font-medium">{device.scheduledTime.startTime}</span>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span>Heure fin:</span>
                            <span className="font-medium">{device.scheduledTime.endTime}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setRooms(rooms.map(room => 
                                room.id === selectedRoom.id ? {
                                  ...room,
                                  devices: room.devices.map(d =>
                                    d.id === device.id ? { 
                                      ...d, 
                                      status: false,
                                      scheduledTime: undefined
                                    } : d
                                  )
                                } : room
                              ));
                              toast({
                                title: `${device.name} désactivé`,
                                description: "La programmation a été supprimée",
                              });
                            }}
                            className="text-destructive hover:text-destructive"
                          >
                            Annuler
                          </Button>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Clock className="h-3 w-3 mr-1" /> Modifier
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Modifier la programmation - {device.name}</DialogTitle>
                                <DialogDescription>
                                  Définissez les heures et la date de fonctionnement
                                </DialogDescription>
                              </DialogHeader>
                              
                              <AutomaticModeScheduler 
                                device={device} 
                                onSchedule={(startTime, endTime, date) => {
                                  scheduleDevice(device.id, startTime, endTime, date);
                                }}
                                selectedDate={selectedDate}
                                setSelectedDate={setSelectedDate}
                              />
                            </DialogContent>
                          </Dialog>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-center">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button>
                              <Clock className="h-4 w-4 mr-2" /> Programmer
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Programmation - {device.name}</DialogTitle>
                              <DialogDescription>
                                Définissez les heures et la date de fonctionnement
                              </DialogDescription>
                            </DialogHeader>
                            
                            <AutomaticModeScheduler 
                              device={device} 
                              onSchedule={(startTime, endTime, date) => {
                                scheduleDevice(device.id, startTime, endTime, date);
                              }}
                              selectedDate={selectedDate}
                              setSelectedDate={setSelectedDate}
                            />
                          </DialogContent>
                        </Dialog>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Composant pour programmer en mode automatique
interface AutomaticModeSchedulerProps {
  device: Device;
  onSchedule: (startTime: string, endTime: string, date?: Date) => void;
  selectedDate: Date | undefined;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const AutomaticModeScheduler: React.FC<AutomaticModeSchedulerProps> = ({ 
  device, 
  onSchedule,
  selectedDate,
  setSelectedDate
}) => {
  const [startTime, setStartTime] = useState(device.scheduledTime?.startTime || "08:00");
  const [endTime, setEndTime] = useState(device.scheduledTime?.endTime || "18:00");
  const [useDateScheduling, setUseDateScheduling] = useState(!!device.scheduledTime?.date);

  // Calculer le temps de fonctionnement
  const calculateOperationTime = () => {
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    
    const diffMs = end.getTime() - start.getTime();
    const diffHrs = Math.floor(diffMs / 3600000);
    const diffMins = Math.round((diffMs % 3600000) / 60000);
    
    return `${diffHrs}h${diffMins > 0 ? diffMins.toString().padStart(2, '0') : '00'}`;
  };

  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Switch 
            id="use-date" 
            checked={useDateScheduling}
            onCheckedChange={setUseDateScheduling}
          />
          <Label htmlFor="use-date">Programmer une date spécifique</Label>
        </div>
        
        {useDateScheduling && (
          <div className="pt-2">
            <Label>Sélectionner une date</Label>
            <div className="pt-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>Choisir une date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startTime">Heure de début</Label>
          <Input 
            id="startTime" 
            type="time" 
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="endTime">Heure de fin</Label>
          <Input 
            id="endTime" 
            type="time" 
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Temps de fonctionnement:</Label>
        <div className="text-sm font-medium">{calculateOperationTime()}</div>
      </div>
      
      <div className="flex justify-end gap-2">
        <DialogClose asChild>
          <Button variant="outline">Annuler</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button 
            onClick={() => onSchedule(
              startTime, 
              endTime, 
              useDateScheduling ? selectedDate : undefined
            )}
          >
            Enregistrer
          </Button>
        </DialogClose>
      </div>
    </div>
  );
};

export default RoomDeviceControl;
