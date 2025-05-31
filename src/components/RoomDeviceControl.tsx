
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { Room, Device } from '@/types/device';
import { mockRooms } from '@/data/mockRooms';
import DeviceCard from './device/DeviceCard';

interface RoomDeviceControlProps {
  roomId: string | null;
  onBack: () => void;
}

const RoomDeviceControl: React.FC<RoomDeviceControlProps> = ({ roomId, onBack }) => {
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  
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
            scheduledTime: device.status ? undefined : device.scheduledTime
          } : device
        )
      } : room
    ));
    
    const updatedDevice = selectedRoom.devices.find(d => d.id === deviceId);
    if (updatedDevice) {
      toast({
        title: updatedDevice.status ? `${updatedDevice.name} désactivé` : `${updatedDevice.name} activé`,
        description: updatedDevice.status ? "L'appareil a été éteint" : "L'appareil a été allumé",
      });
    }
  };

  const toggleDeviceControlMode = (deviceId: string) => {
    setRooms(rooms.map(room => 
      room.id === selectedRoom.id ? {
        ...room,
        devices: room.devices.map(device =>
          device.id === deviceId ? { 
            ...device, 
            controlMode: device.controlMode === 'manual' ? 'auto' : 'manual',
            scheduledTime: device.controlMode === 'auto' ? undefined : device.scheduledTime
          } : device
        )
      } : room
    ));
    
    const device = selectedRoom.devices.find(d => d.id === deviceId);
    if (device) {
      const newMode = device.controlMode === 'manual' ? 'automatique' : 'manuel';
      toast({
        title: `${device.name} - Mode ${newMode}`,
        description: `L'appareil est maintenant en mode ${newMode}`,
      });
    }
  };

  const scheduleDevice = (deviceId: string, scheduleData: {
    startTime: string;
    endTime: string;
    scheduleType: 'daily';
    repeat?: boolean;
    durationMinutes?: number;
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
            status: true
          } : device
        )
      } : room
    ));
    
    if (device) {
      let description = '';
      
      if (scheduleData.scheduleType === 'daily') {
        description = `Programmé quotidiennement de ${scheduleData.startTime} à ${scheduleData.endTime}`;
        if (device.type === 'irrigation' && scheduleData.durationMinutes) {
          description += ` (${scheduleData.durationMinutes} minutes)`;
        }
      }
      
      toast({
        title: `${device.name} programmé`,
        description,
      });
    }
  };
  
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
            status: true
          } : device
        )
      } : room
    ));
    
    if (device) {
      let description = '';
      
      if (device.type === 'heating' && thresholds.min !== undefined) {
        description = `Chauffage activé avec seuil à ${thresholds.min}°C`;
      } else if (device.type === 'cooling' && thresholds.max !== undefined) {
        description = `Climatisation activée avec seuil à ${thresholds.max}°C`;
      }
      
      toast({
        title: `${device.name} activé`,
        description,
      });
    }
  };

  const removeSchedule = (deviceId: string) => {
    setRooms(rooms.map(room => 
      room.id === selectedRoom.id ? {
        ...room,
        devices: room.devices.map(d =>
          d.id === deviceId ? { 
            ...d, 
            status: false,
            scheduledTime: undefined
          } : d
        )
      } : room
    ));
    
    const device = selectedRoom.devices.find(d => d.id === deviceId);
    if (device) {
      toast({
        title: `${device.name} désactivé`,
        description: "La programmation a été supprimée",
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
            <DeviceCard
              key={device.id}
              device={device}
              onToggleDevice={toggleDevice}
              onToggleControlMode={toggleDeviceControlMode}
              onScheduleDevice={scheduleDevice}
              onSetTemperatureThresholds={setTemperatureThresholds}
              onRemoveSchedule={removeSchedule}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomDeviceControl;
