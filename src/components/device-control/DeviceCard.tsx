
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { 
  Power, 
  Zap, 
  Timer,
  CalendarClock,
  Clock,
  Calendar,
  Thermometer
} from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { toast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';
import { DeviceScheduler } from './DeviceScheduler';
import { TemperatureControl } from './TemperatureControl';

export interface Device {
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
    scheduleType?: 'daily';
    repeat?: boolean;
    durationMinutes?: number;
  };
  temperatureThresholds?: {
    min?: number;
    max?: number;
  };
}

interface DeviceCardProps {
  device: Device;
  onToggleDevice: (deviceId: string) => void;
  onToggleDeviceControlMode: (deviceId: string) => void;
  onScheduleDevice: (deviceId: string, scheduleData: {
    startTime: string;
    endTime: string;
    scheduleType: 'daily';
    repeat?: boolean;
    durationMinutes?: number;
  }) => void;
  onSetTemperatureThresholds: (deviceId: string, thresholds: { min?: number; max?: number }) => void;
}

export const DeviceCard: React.FC<DeviceCardProps> = ({ 
  device, 
  onToggleDevice, 
  onToggleDeviceControlMode,
  onScheduleDevice,
  onSetTemperatureThresholds
}) => {
  return (
    <div 
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
              if (value) onToggleDeviceControlMode(device.id);
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
                onCheckedChange={() => onToggleDevice(device.id)}
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
            {/* Controls for temperature devices */}
            {(device.type === 'heating' || device.type === 'cooling') && (
              <TemperatureControl 
                device={device} 
                onSetThresholds={onSetTemperatureThresholds}
              />
            )}

            {/* Scheduling for non-temperature devices */}
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
                          </span>
                        </div>
                        
                        {device.type === 'irrigation' ? (
                          <>
                            <div className="flex justify-between">
                              <span>Heure d'activation:</span>
                              <span className="font-medium">{device.scheduledTime.startTime}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Durée:</span>
                              <span className="font-medium">{device.scheduledTime.durationMinutes} minutes</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex justify-between">
                              <span>Heure début:</span>
                              <span className="font-medium">{device.scheduledTime.startTime}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Heure fin:</span>
                              <span className="font-medium">{device.scheduledTime.endTime}</span>
                            </div>
                          </>
                        )}
                        
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
                            // Clear schedule
                            onScheduleDevice(device.id, {
                              startTime: "",
                              endTime: "",
                              scheduleType: "daily",
                              repeat: false
                            });
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
                            
                            <DeviceScheduler 
                              device={device} 
                              onSchedule={(scheduleData) => {
                                onScheduleDevice(device.id, scheduleData);
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
                        
                        <DeviceScheduler 
                          device={device} 
                          onSchedule={(scheduleData) => {
                            onScheduleDevice(device.id, scheduleData);
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
  );
};
