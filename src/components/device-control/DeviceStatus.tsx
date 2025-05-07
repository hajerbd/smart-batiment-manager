
/**
 * Composant pour afficher l'état actuel d'un appareil
 * Extrait de DeviceCard pour plus de modularité
 */
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Power } from 'lucide-react';
import { Device } from './DeviceCard';

interface DeviceStatusProps {
  device: Device;
  onToggle: () => void;
}

export const DeviceStatus: React.FC<DeviceStatusProps> = ({ device, onToggle }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">État actuel</span>
        <Switch
          checked={device.status}
          onCheckedChange={onToggle}
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
  );
};
