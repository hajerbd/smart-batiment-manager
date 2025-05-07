
/**
 * Composant de carte d'appareil
 * - Affiche les informations et contrôles pour un appareil spécifique
 * - Interface adaptée selon le type d'appareil et son mode de contrôle
 */
import React from 'react';
import { 
  Power, 
  Zap, 
  Timer,
  Thermometer
} from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { DeviceStatus } from './DeviceStatus';
import { DeviceScheduleDisplay } from './DeviceScheduleDisplay';
import { TemperatureControl } from './TemperatureControl';

// Interface définissant la structure d'un appareil
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

// Interface définissant les props du composant DeviceCard
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
  // Gestion des actions spécifiques à cette carte d'appareil
  const handleToggle = () => onToggleDevice(device.id);
  const handleToggleMode = (value: string) => {
    if (value) onToggleDeviceControlMode(device.id);
  };
  const handleSchedule = (scheduleData: any) => onScheduleDevice(device.id, scheduleData);
  const handleSetThresholds = (thresholds: any) => onSetTemperatureThresholds(device.id, thresholds);

  const isTemperatureDevice = device.type === 'heating' || device.type === 'cooling';

  return (
    <div 
      className={cn(
        "border rounded-md p-4 transition-colors",
        device.status ? "bg-card" : "bg-muted/20"
      )}
    >
      {/* En-tête de la carte avec nom et contrôles généraux */}
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
        
        {/* Sélecteur de mode manuel/automatique */}
        <div>
          <ToggleGroup 
            type="single" 
            value={device.controlMode} 
            size="sm"
            className="border rounded-md"
            onValueChange={handleToggleMode}
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
      
      {/* Contenu adapté selon le mode de l'appareil */}
      <div className="mt-4">
        {device.controlMode === 'manual' ? (
          <DeviceStatus device={device} onToggle={handleToggle} />
        ) : (
          <div className="space-y-4">
            {/* Contrôles de température pour les appareils concernés */}
            {isTemperatureDevice && (
              <TemperatureControl 
                device={device} 
                onSetThresholds={handleSetThresholds}
              />
            )}

            {/* Programmation pour les appareils non liés à la température */}
            {!isTemperatureDevice && (
              <DeviceScheduleDisplay 
                device={device} 
                onSchedule={handleSchedule}
              />
            )}
          </div>
        )}
      </div>
      
      {/* Indicateur d'état */}
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
              <>{isTemperatureDevice ? (
                <Thermometer className="h-3 w-3 mr-1" />
              ) : (
                <Timer className="h-3 w-3 mr-1" />
              )} {isTemperatureDevice ? 'Régulation auto' : 'Programmé'}</>
            )}
          </Badge>
        )}
      </div>
    </div>
  );
};
