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
  ArrowLeft,
  Timer,
  Calendar,
  CalendarClock,
  CalendarDays,
  Power,
  ThermometerSnowflake,
  ThermometerSun
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

// Types
interface Device {
  id: string;
  name: string;
  type: 'heating' | 'cooling' | 'blinds' | 'irrigation' | 'lighting';
  status: boolean;
  icon: React.ReactNode;
  temperature?: string;
  controlMode: 'manual' | 'auto';
  scheduledTime?: {
    startTime: string;
    endTime: string;
    scheduleType?: 'daily' | 'periodic' | 'weekly';
    startDate?: Date;
    endDate?: Date;
    daysOfWeek?: string[];
    repeat?: boolean;
  };
  temperatureThresholds?: {
    min?: number;
    max?: number;
  };
}

interface Room {
  id: string;
  name: string;
  icon: React.ReactNode;
  devices: Device[];
}

// Données simulées avec le mode de contrôle par équipement
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
        temperature: '21°C',
        controlMode: 'manual',
        temperatureThresholds: {
          min: 19
        }
      },
      {
        id: '12',
        name: 'Climatisation',
        type: 'cooling',
        status: false,
        icon: <Snowflake className="h-5 w-5" />,
        temperature: '21°C',
        controlMode: 'auto',
        temperatureThresholds: {
          max: 24
        }
      },
      {
        id: '13',
        name: 'Stores automatiques',
        type: 'blinds',
        status: true,
        icon: <Blinds className="h-5 w-5" />,
        controlMode: 'manual'
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
        temperature: '19°C',
        controlMode: 'auto',
        temperatureThresholds: {
          min: 20
        }
      },
      {
        id: '22',
        name: 'Climatisation',
        type: 'cooling',
        status: true,
        icon: <Snowflake className="h-5 w-5" />,
        temperature: '19°C',
        controlMode: 'manual',
        temperatureThresholds: {
          max: 23
        }
      },
      {
        id: '23',
        name: 'Stores automatiques',
        type: 'blinds',
        status: false,
        icon: <Blinds className="h-5 w-5" />,
        controlMode: 'auto'
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
        temperature: '20°C',
        controlMode: 'manual'
      },
      {
        id: '32',
        name: 'Climatisation',
        type: 'cooling',
        status: false,
        icon: <Snowflake className="h-5 w-5" />,
        temperature: '20°C',
        controlMode: 'auto'
      },
      {
        id: '33',
        name: 'Stores automatiques',
        type: 'blinds',
        status: true,
        icon: <Blinds className="h-5 w-5" />,
        controlMode: 'manual'
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
        icon: <Lamp className="h-5 w-5" />,
        controlMode: 'manual'
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
        icon: <Droplet className="h-5 w-5" />,
        controlMode: 'auto'
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
    const device = selectedRoom.devices.find(d => d.id === deviceId);
    
    if (!device || device.controlMode !== 'manual') {
      toast({
        title: "Mode manuel requis",
        description: "Passez l'appareil en mode manuel pour l'activer/désactiver directement.",
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
    const updatedDevice = selectedRoom.devices.find(d => d.id === deviceId);
    if (updatedDevice) {
      toast({
        title: updatedDevice.status ? `${updatedDevice.name} désactivé` : `${updatedDevice.name} activé`,
        description: updatedDevice.status ? "L'appareil a été éteint" : "L'appareil a été allumé",
      });
    }
  };

  // Fonction pour changer le mode de contrôle d'un appareil
  const toggleDeviceControlMode = (deviceId: string) => {
    setRooms(rooms.map(room => 
      room.id === selectedRoom.id ? {
        ...room,
        devices: room.devices.map(device =>
          device.id === deviceId ? { 
            ...device, 
            controlMode: device.controlMode === 'manual' ? 'auto' : 'manual',
            // Reset scheduled time if switching to manual
            scheduledTime: device.controlMode === 'auto' ? undefined : device.scheduledTime
          } : device
        )
      } : room
    ));
    
    // Notification
    const device = selectedRoom.devices.find(d => d.id === deviceId);
    if (device) {
      const newMode = device.controlMode === 'manual' ? 'automatique' : 'manuel';
      toast({
        title: `${device.name} - Mode ${newMode}`,
        description: `L'appareil est maintenant en mode ${newMode}`,
      });
    }
  };

  // Fonction pour programmer un appareil en mode automatique
  const scheduleDevice = (deviceId: string, scheduleData: {
    startTime: string;
    endTime: string;
    scheduleType: 'daily' | 'periodic' | 'weekly';
    startDate?: Date;
    endDate?: Date;
    daysOfWeek?: string[];
    repeat?: boolean;
  }) => {
    const device = selectedRoom.devices.find(d => d.id === deviceId);
    
    if (!device || device.controlMode !== 'auto') {
      toast({
        title: "Mode automatique requis",
        description: "Passez l'appareil en mode automatique pour le programmer.",
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
            scheduledTime: scheduleData,
            status: true // Activer l'appareil quand programmé
          } : device
        )
      } : room
    ));
    
    // Notification
    if (device) {
      let description = '';
      
      if (scheduleData.scheduleType === 'daily') {
        description = `Programmé quotidiennement de ${scheduleData.startTime} à ${scheduleData.endTime}`;
      } else if (scheduleData.scheduleType === 'weekly') {
        const days = scheduleData.daysOfWeek ? scheduleData.daysOfWeek.join(', ') : 'aucun jour spécifié';
        description = `Programmé chaque semaine (${days}) de ${scheduleData.startTime} à ${scheduleData.endTime}`;
      } else {
        const startDateStr = scheduleData.startDate ? format(scheduleData.startDate, 'dd/MM/yyyy') : '?';
        const endDateStr = scheduleData.endDate ? format(scheduleData.endDate, 'dd/MM/yyyy') : '?';
        description = `Programmé du ${startDateStr} au ${endDateStr} de ${scheduleData.startTime} à ${scheduleData.endTime}`;
      }

      if (scheduleData.repeat) {
        description += ' (répétition activée)';
      }
      
      toast({
        title: `${device.name} programmé`,
        description,
      });
    }
  };
  
  // Nouvelle fonction pour définir les seuils de température
  const setTemperatureThresholds = (deviceId: string, thresholds: { min?: number; max?: number }) => {
    const device = selectedRoom.devices.find(d => d.id === deviceId);
    
    if (!device || device.controlMode !== 'auto') {
      toast({
        title: "Mode automatique requis",
        description: "Passez l'appareil en mode automatique pour définir les seuils de température.",
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
            temperatureThresholds: thresholds,
            // Activer automatiquement si la température actuelle répond aux critères
            status: device.type === 'heating' 
              ? (parseFloat(device.temperature?.replace('°C', '') || '0') < thresholds.min!)
              : (parseFloat(device.temperature?.replace('°C', '') || '0') > thresholds.max!)
          } : device
        )
      } : room
    ));
    
    // Notification
    if (device) {
      let description = '';
      
      if (device.type === 'heating' && thresholds.min !== undefined) {
        description = `Chauffage s'active si température < ${thresholds.min}°C`;
      } else if (device.type === 'cooling' && thresholds.max !== undefined) {
        description = `Climatisation s'active si température > ${thresholds.max}°C`;
      }
      
      toast({
        title: `Seuils de température définis pour ${device.name}`,
        description,
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
                
                {/* Mode de contrôle par appareil */}
                <div>
                  <ToggleGroup 
                    type="single" 
                    value={device.controlMode} 
                    size="sm"
                    className="border rounded-md"
                    onValueChange={(value) => {
                      if (value) toggleDeviceControlMode(device.id);
                    }}
                  >
                    <ToggleGroupItem value="manual" aria-label="Manuel" className="flex items-center gap-1 text-xs px-2 py-1">
                      <Zap className="h-3 w-3" />
                      <span className="hidden sm:inline">M</span>
                    </ToggleGroupItem>
                    <ToggleGroupItem value="auto" aria-label="Automatique" className="flex items-center gap-1 text-xs px-2 py-1">
                      <Timer className="h-3 w-3" />
                      <span className="hidden sm:inline">A</span>
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
              
              {/* Contenus différents selon le mode de l'appareil */}
              <div className="mt-4">
                {device.controlMode === 'manual' ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">État actuel</span>
                      <Switch
                        checked={device.status}
                        onCheckedChange={() => toggleDevice(device.id)}
                      />
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                      {device.status ? (
                        <div className="flex items-center justify-center gap-2">
                          <Power className="h-4 w-4 text-green-500" /> Appareil activé
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <Power className="h-4 w-4 text-gray-400" /> Appareil désactivé
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Paramètres spécifiques aux appareils de chauffage/climatisation en mode auto */}
                    {(device.type === 'heating' || device.type === 'cooling') && (
                      <Collapsible className="border rounded-lg p-3 mb-3">
                        <CollapsibleTrigger className="flex w-full justify-between items-center">
                          <div className="flex items-center gap-2">
                            {device.type === 'heating' ? (
                              <ThermometerSun className="h-4 w-4 text-amber-500" />
                            ) : (
                              <ThermometerSnowflake className="h-4 w-4 text-blue-500" />
                            )}
                            <span className="font-medium text-sm">Seuils de température</span>
                          </div>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <Thermometer className="h-4 w-4" />
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-3">
                          {device.type === 'heating' ? (
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <div className="flex justify-between mb-2">
                                  <Label htmlFor={`min-temp-${device.id}`}>
                                    Température minimale (°C)
                                  </Label>
                                  <span className="font-medium">
                                    {device.temperatureThresholds?.min || 20}°C
                                  </span>
                                </div>
                                <Slider
                                  id={`min-temp-${device.id}`}
                                  min={15}
                                  max={25}
                                  step={0.5}
                                  value={[device.temperatureThresholds?.min || 20]}
                                  onValueChange={(value) => {
                                    setTemperatureThresholds(device.id, { min: value[0] });
                                  }}
                                  className="mt-2"
                                />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>15°C</span>
                                  <span>25°C</span>
                                </div>
                              </div>
                              
                              <div className="bg-muted/30 p-3 rounded-md text-sm">
                                <div className="flex items-center gap-2 mb-2">
                                  <ThermometerSun className="h-4 w-4 text-amber-500" />
                                  <span className="font-medium">Fonctionnement:</span>
                                </div>
                                <p className="text-xs">
                                  Le chauffage s'activera automatiquement lorsque la température descend en-dessous de {device.temperatureThresholds?.min || 20}°C.
                                </p>
                                {device.status ? (
                                  <div className="mt-2 text-xs flex items-center gap-1 text-green-500">
                                    <Power className="h-3 w-3" /> Actuellement actif
                                  </div>
                                ) : (
                                  <div className="mt-2 text-xs flex items-center gap-1 text-gray-500">
                                    <Power className="h-3 w-3" /> Actuellement inactif
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <div className="flex justify-between mb-2">
                                  <Label htmlFor={`max-temp-${device.id}`}>
                                    Température maximale (°C)
                                  </Label>
                                  <span className="font-medium">
                                    {device.temperatureThresholds?.max || 24}°C
                                  </span>
                                </div>
                                <Slider
                                  id={`max-temp-${device.id}`}
                                  min={20}
                                  max={30}
                                  step={0.5}
                                  value={[device.temperatureThresholds?.max || 24]}
                                  onValueChange={(value) => {
                                    setTemperatureThresholds(device.id, { max: value[0] });
                                  }}
                                  className="mt-2"
                                />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                  <span>20°C</span>
                                  <span>30°C</span>
                                </div>
                              </div>
                              
                              <div className="bg-muted/30 p-3 rounded-md text-sm">
                                <div className="flex items-center gap-2 mb-2">
                                  <ThermometerSnowflake className="h-4 w-4 text-blue-500" />
                                  <span className="font-medium">Fonctionnement:</span>
                                </div>
                                <p className="text-xs">
                                  La climatisation s'activera automatiquement lorsque la température monte au-dessus de {device.temperatureThresholds?.max || 24}°C.
                                </p>
                                {device.status ? (
                                  <div className="mt-2 text-xs flex items-center gap-1 text-green-500">
                                    <Power className="h-3 w-3" /> Actuellement actif
                                  </div>
                                ) : (
                                  <div className="mt-2 text-xs flex items-center gap-1 text-gray-500">
                                    <Power className="h-3 w-3" /> Actuellement inactif
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </CollapsibleContent>
                      </Collapsible>
                    )}

                    {/* Planification pour les autres appareils (non chauffage/climatisation) */}
                    {!(device.type === 'heating' || device.type === 'cooling') && (
                      <>
                        {device.scheduledTime ? (
                          <Collapsible className="border rounded-lg p-3">
                            <CollapsibleTrigger className="flex w-full justify-between items-center">
                              <div className="flex items-center gap-2">
                                <CalendarClock className="h-4 w-4 text-primary" />
                                <span className="font-medium text-sm">Programmation actuelle</span>
                              </div>
                              <Button variant="ghost" size="icon" className="h-6 w-6">
                                <Calendar className="h-4 w-4" />
                              </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="mt-2">
                              <div className="text-xs space-y-2 bg-muted/30 rounded-md p-3">
                                <div className="flex justify-between">
                                  <span>Type de programmation:</span>
                                  <span className="font-medium">
                                    {device.scheduledTime.scheduleType === 'daily' && 'Journalier'}
                                    {device.scheduledTime.scheduleType === 'weekly' && 'Hebdomadaire'}
                                    {device.scheduledTime.scheduleType === 'periodic' && 'Périodique'}
                                  </span>
                                </div>
                                
                                {device.scheduledTime.scheduleType === 'weekly' && device.scheduledTime.daysOfWeek && (
                                  <div className="flex justify-between">
                                    <span>Jours programmés:</span>
                                    <span className="font-medium">{device.scheduledTime.daysOfWeek.join(', ')}</span>
                                  </div>
                                )}
                                
                                {device.scheduledTime.scheduleType === 'periodic' && (
                                  <>
                                    <div className="flex justify-between mt-1">
                                      <span>Date début:</span>
                                      <span className="font-medium">
                                        {device.scheduledTime.startDate && format(device.scheduledTime.startDate, 'dd/MM/yyyy')}
                                      </span>
                                    </div>
                                    <div className="flex justify-between mt-1">
                                      <span>Date fin:</span>
                                      <span className="font-medium">
                                        {device.scheduledTime.endDate && format(device.scheduledTime.endDate, 'dd/MM/yyyy')}
                                      </span>
                                    </div>
                                  </>
                                )}
                                
                                <div className="flex justify-between">
                                  <span>Heure début:</span>
                                  <span className="font-medium">{device.scheduledTime.startTime}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Heure fin:</span>
                                  <span className="font-medium">{device.scheduledTime.endTime}</span>
                                </div>
                                
                                {device.scheduledTime.repeat !== undefined && (
                                  <div className="flex justify-between">
                                    <span>Répétition:</span>
                                    <span className="font-medium">{device.scheduledTime.repeat ? 'Activée' : 'Désactivée'}</span>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex justify-between mt-3">
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
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                    >
                                      <Clock className="h-3 w-3 mr-1" /> Modifier
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Modifier la programmation - {device.name}</DialogTitle>
                                      <DialogDescription>
                                        Définissez le type de programmation et les horaires
                                      </DialogDescription>
                                    </DialogHeader>
                                    
                                    <AutomaticModeScheduler 
                                      device={device} 
                                      onSchedule={(scheduleData) => {
                                        scheduleDevice(device.id, scheduleData);
                                      }}
                                    />
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
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
                                    Définissez le type de programmation et les horaires
                                  </DialogDescription>
                                </DialogHeader>
                                
                                <AutomaticModeScheduler 
                                  device={device} 
                                  onSchedule={(scheduleData) => {
                                    scheduleDevice(device.id, scheduleData);
                                  }}
                                />
                              </DialogContent>
                            </Dialog>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
              
              {/* Status indicator */}
              <div className="mt-3">
                {device.status && (
                  <Badge variant="outline" className={cn(
                    device.controlMode === 'manual'
                      ? "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400"
                      : "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400"
                  )}>
                    {device.controlMode === 'manual' ? (
                      <><Zap className="h-3 w-3 mr-1" /> Actif</>
                    ) : (
                      <>{(device.type === 'heating' || device.type === 'cooling') ? (
                        <Thermometer className="h-3 w-3 mr-1" />
                      ) : (
                        <Timer className="h-3 w-3 mr-1" />
                      )} {(device.type === 'heating' || device.type === 'cooling') ? 'Régulation auto' : 'Programmé'}</>
                    )}
                  </Badge>
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
  onSchedule: (scheduleData: {
    startTime: string;
    endTime: string;
    scheduleType: 'daily' | 'periodic' | 'weekly';
    startDate?: Date;
    endDate?: Date;
    daysOfWeek?: string[];
    repeat?: boolean;
  }) => void;
}

const AutomaticModeScheduler: React.FC<AutomaticModeSchedulerProps> = ({ device, onSchedule }) => {
  const [scheduleType, setScheduleType] = useState<'daily' | 'periodic' | 'weekly'>(
    device.scheduledTime?.scheduleType || 'daily'
  );
  const [startTime, setStartTime] = useState(device.scheduledTime?.startTime || "08:00");
  const [endTime, setEndTime] = useState(device.scheduledTime?.endTime || "18:00");
  const [startDate, setStartDate] = useState<Date | undefined>(device.scheduledTime?.startDate || new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(device.scheduledTime?.endDate || new Date());
  const [repeat, setRepeat] = useState<boolean>(device.scheduledTime?.repeat || false);
  
  // Jours de la semaine pour le mode hebdomadaire
  const [selectedDays, setSelectedDays] = useState<string[]>(
    device.scheduledTime?.daysOfWeek || ['Lundi']
  );
  
  const weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  
  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const form = useForm({
    defaultValues: {
      scheduleType: device.scheduledTime?.scheduleType || 'daily',
    }
  });

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
      <Form {...form}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="scheduleType"
            render={() => (
              <FormItem>
                <FormLabel>Type de programmation</FormLabel>
                <FormControl>
                  <RadioGroup 
                    value={scheduleType} 
                    onValueChange={(value) => setScheduleType(value as 'daily' | 'periodic' | 'weekly')}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="daily" id="daily" />
                      <Label htmlFor="daily" className="flex items-center">
                        <CalendarClock className="h-4 w-4 mr-2" /> Journalier (tous les jours)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weekly" id="weekly" />
                      <Label htmlFor="weekly" className="flex items-center">
                        <CalendarDays className="h-4 w-4 mr-2" /> Hebdomadaire (jours spécifiques)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="periodic" id="periodic" />
                      <Label htmlFor="periodic" className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" /> Périodique (période spécifique)
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          {scheduleType === 'weekly' && (
            <div className="space-y-2 p-3 border rounded-md">
              <FormLabel>Jours de la semaine</FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-1">
                {weekDays.map(day => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`day-${day}`} 
                      checked={selectedDays.includes(day)}
                      onCheckedChange={() => toggleDay(day)}
                    />
                    <Label htmlFor={`day-${day}`}>{day}</Label>
                  </div>
                ))}
              </div>
              {selectedDays.length === 0 && (
                <p className="text-xs text-amber-500 mt-2">Veuillez sélectionner au moins un jour</p>
              )}
            </div>
          )}

          {scheduleType === 'periodic' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Date de début</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "dd/MM/yyyy") : <span>Choisir une date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Date de fin</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "dd/MM/yyyy") : <span>Choisir une date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      disabled={(date) => date < new Date() || (startDate ? date < startDate : false)}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}
          
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
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="repeat" 
              checked={repeat}
              onCheckedChange={(checked) => setRepeat(checked as boolean)}
            />
            <Label htmlFor="repeat">Activer la répétition</Label>
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button 
                onClick={() => {
                  // Ne pas permettre l'enregistrement si aucun jour n'est sélectionné en mode hebdomadaire
                  if (scheduleType === 'weekly' && selectedDays.length === 0) {
                    toast({
                      title: "Sélection requise",
                      description: "Veuillez sélectionner au moins un jour de la semaine",
                      variant: "destructive"
                    });
                    return;
                  }
                  
                  onSchedule({
                    startTime,
                    endTime,
                    scheduleType,
                    startDate: scheduleType === 'periodic' ? startDate : undefined,
                    endDate: scheduleType === 'periodic' ? endDate : undefined,
                    daysOfWeek: scheduleType === 'weekly' ? selectedDays : undefined,
                    repeat
                  });
                }}
              >
                Enregistrer
              </Button>
            </DialogClose>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default RoomDeviceControl;
