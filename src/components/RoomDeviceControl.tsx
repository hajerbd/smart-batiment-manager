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
  CalendarDays
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
    scheduleType?: 'daily' | 'periodic';
    startDate?: Date;
    endDate?: Date;
    dayOfWeek?: string;
  }
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
        controlMode: 'manual'
      },
      {
        id: '12',
        name: 'Climatisation',
        type: 'cooling',
        status: false,
        icon: <Snowflake className="h-5 w-5" />,
        temperature: '21°C',
        controlMode: 'auto'
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
        controlMode: 'auto'
      },
      {
        id: '22',
        name: 'Climatisation',
        type: 'cooling',
        status: true,
        icon: <Snowflake className="h-5 w-5" />,
        temperature: '19°C',
        controlMode: 'manual'
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
    scheduleType: 'daily' | 'periodic';
    startDate?: Date;
    endDate?: Date;
    dayOfWeek?: string;
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
            scheduledTime: {
              startTime: scheduleData.startTime,
              endTime: scheduleData.endTime,
              scheduleType: scheduleData.scheduleType,
              startDate: scheduleData.startDate,
              endDate: scheduleData.endDate,
              dayOfWeek: scheduleData.dayOfWeek
            },
            status: true // Activer l'appareil quand programmé
          } : device
        )
      } : room
    ));
    
    // Notification
    if (device) {
      let description = '';
      
      if (scheduleData.scheduleType === 'daily') {
        description = `Programmé quotidiennement ${scheduleData.dayOfWeek ? `le ${scheduleData.dayOfWeek}` : ''} de ${scheduleData.startTime} à ${scheduleData.endTime}`;
      } else {
        const startDateStr = scheduleData.startDate ? format(scheduleData.startDate, 'dd/MM/yyyy') : '?';
        const endDateStr = scheduleData.endDate ? format(scheduleData.endDate, 'dd/MM/yyyy') : '?';
        description = `Programmé du ${startDateStr} au ${endDateStr} de ${scheduleData.startTime} à ${scheduleData.endTime}`;
      }
      
      toast({
        title: `${device.name} programmé`,
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
                <Tabs defaultValue={device.controlMode} className="w-full">
                  {/* Onglet Mode Manuel */}
                  <TabsContent value="manual" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">État actuel</span>
                      <Switch
                        checked={device.status}
                        onCheckedChange={() => toggleDevice(device.id)}
                        disabled={device.controlMode !== 'manual'}
                      />
                    </div>
                    <div className="text-center text-sm text-muted-foreground">
                      {device.controlMode !== 'manual' ? 
                        "Pour contrôler manuellement, activez le mode manuel" : 
                        device.status ? "Appareil activé" : "Appareil désactivé"
                      }
                    </div>
                  </TabsContent>
                  
                  {/* Onglet Mode Automatique */}
                  <TabsContent value="auto" className="space-y-4">
                    {device.scheduledTime ? (
                      <>
                        <div className="text-xs text-muted-foreground mt-2">
                          <div className="flex justify-between">
                            <span>Type de programmation:</span>
                            <span className="font-medium">
                              {device.scheduledTime.scheduleType === 'daily' ? 'Journalier' : 'Périodique'}
                            </span>
                          </div>
                          
                          {device.scheduledTime.scheduleType === 'daily' && device.scheduledTime.dayOfWeek && (
                            <div className="flex justify-between mt-1">
                              <span>Jour programmé:</span>
                              <span className="font-medium">{device.scheduledTime.dayOfWeek}</span>
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
                            disabled={device.controlMode !== 'auto'}
                          >
                            Annuler
                          </Button>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                disabled={device.controlMode !== 'auto'}
                              >
                                <Clock className="h-3 w-3 mr-1" /> Modifier
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Modifier la programmation - {device.name}</DialogTitle>
                                <DialogDescription>
                                  Définissez le type de programmation et les heures
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
                      </>
                    ) : (
                      <div className="flex justify-center">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button disabled={device.controlMode !== 'auto'}>
                              <Clock className="h-4 w-4 mr-2" /> Programmer
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Programmation - {device.name}</DialogTitle>
                              <DialogDescription>
                                Définissez le type de programmation et les heures
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
                  </TabsContent>
                </Tabs>
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
                      <><Timer className="h-3 w-3 mr-1" /> Programmé</>
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
    scheduleType: 'daily' | 'periodic';
    startDate?: Date;
    endDate?: Date;
    dayOfWeek?: string;
  }) => void;
}

const AutomaticModeScheduler: React.FC<AutomaticModeSchedulerProps> = ({ device, onSchedule }) => {
  const [scheduleType, setScheduleType] = useState<'daily' | 'periodic'>(device.scheduledTime?.scheduleType || 'daily');
  const [startTime, setStartTime] = useState(device.scheduledTime?.startTime || "08:00");
  const [endTime, setEndTime] = useState(device.scheduledTime?.endTime || "18:00");
  const [startDate, setStartDate] = useState<Date | undefined>(device.scheduledTime?.startDate || new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(device.scheduledTime?.endDate || new Date());
  const [dayOfWeek, setDayOfWeek] = useState(device.scheduledTime?.dayOfWeek || 'Lundi');

  const form = useForm({
    defaultValues: {
      scheduleType: device.scheduledTime?.scheduleType || 'daily',
      dayOfWeek: device.scheduledTime?.dayOfWeek || 'Lundi',
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
                    onValueChange={(value) => setScheduleType(value as 'daily' | 'periodic')}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="daily" id="daily" />
                      <Label htmlFor="daily" className="flex items-center">
                        <CalendarClock className="h-4 w-4 mr-2" /> Journalier
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="periodic" id="periodic" />
                      <Label htmlFor="periodic" className="flex items-center">
                        <CalendarDays className="h-4 w-4 mr-2" /> Périodique
                      </Label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          {scheduleType === 'daily' && (
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="dayOfWeek"
                render={() => (
                  <FormItem>
                    <FormLabel>Jour de la semaine</FormLabel>
                    <Select 
                      value={dayOfWeek} 
                      onValueChange={setDayOfWeek}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Jour de la semaine" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Lundi">Lundi</SelectItem>
                        <SelectItem value="Mardi">Mardi</SelectItem>
                        <SelectItem value="Mercredi">Mercredi</SelectItem>
                        <SelectItem value="Jeudi">Jeudi</SelectItem>
                        <SelectItem value="Vendredi">Vendredi</SelectItem>
                        <SelectItem value="Samedi">Samedi</SelectItem>
                        <SelectItem value="Dimanche">Dimanche</SelectItem>
                        <SelectItem value="Tous les jours">Tous les jours</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
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
                onClick={() => onSchedule({
                  startTime,
                  endTime,
                  scheduleType,
                  startDate: scheduleType === 'periodic' ? startDate : undefined,
                  endDate: scheduleType === 'periodic' ? endDate : undefined,
                  dayOfWeek: scheduleType === 'daily' ? dayOfWeek : undefined
                })}
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
