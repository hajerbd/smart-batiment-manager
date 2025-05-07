
/**
 * Custom hook pour gérer l'état et les actions des appareils de la maison
 * Centralise la logique de manipulation des appareils pour éviter la duplication
 */
import { useState } from 'react';
import { Room } from '@/components/device-control/RoomModel';
import { toast } from "@/hooks/use-toast";
import { mockRooms } from '@/data/mockData';

export function useDevices() {
  const [rooms, setRooms] = useState<Room[]>(mockRooms);

  // Fonction pour basculer l'état d'un appareil en mode manuel
  const toggleDevice = (roomId: string, deviceId: string) => {
    const currentRoom = rooms.find(room => room.id === roomId);
    const device = currentRoom?.devices.find(d => d.id === deviceId);
    
    if (!device || device.controlMode !== 'manual') {
      toast({
        title: "Mode manuel requis",
        description: "Passez l'appareil en mode manuel pour l'activer/désactiver directement.",
        variant: "destructive"
      });
      return;
    }
    
    setRooms(rooms.map(room => 
      room.id === roomId ? {
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
    const updatedDevice = currentRoom?.devices.find(d => d.id === deviceId);
    if (updatedDevice) {
      toast({
        title: updatedDevice.status ? `${updatedDevice.name} désactivé` : `${updatedDevice.name} activé`,
        description: updatedDevice.status ? "L'appareil a été éteint" : "L'appareil a été allumé",
      });
    }
  };

  // Fonction pour changer le mode de contrôle d'un appareil
  const toggleDeviceControlMode = (roomId: string, deviceId: string) => {
    setRooms(rooms.map(room => 
      room.id === roomId ? {
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
    const currentRoom = rooms.find(room => room.id === roomId);
    const device = currentRoom?.devices.find(d => d.id === deviceId);
    if (device) {
      const newMode = device.controlMode === 'manual' ? 'automatique' : 'manuel';
      toast({
        title: `${device.name} - Mode ${newMode}`,
        description: `L'appareil est maintenant en mode ${newMode}`,
      });
    }
  };

  // Fonction pour programmer un appareil en mode automatique
  const scheduleDevice = (roomId: string, deviceId: string, scheduleData: {
    startTime: string;
    endTime: string;
    scheduleType: 'daily';
    repeat?: boolean;
    durationMinutes?: number;
  }) => {
    const currentRoom = rooms.find(room => room.id === roomId);
    const device = currentRoom?.devices.find(d => d.id === deviceId);
    
    if (!device || device.controlMode !== 'auto') {
      toast({
        title: "Mode automatique requis",
        description: "Passez l'appareil en mode automatique pour le programmer.",
        variant: "destructive"
      });
      return;
    }
    
    setRooms(rooms.map(room => 
      room.id === roomId ? {
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
      toast({
        title: `${device.name} programmé`,
        description: device.type === 'irrigation' 
          ? `Programmé quotidiennement à ${scheduleData.startTime} pour ${scheduleData.durationMinutes} minutes`
          : `Programmé quotidiennement de ${scheduleData.startTime} à ${scheduleData.endTime}`,
      });
    }
  };
  
  // Fonction pour définir les seuils de température
  const setTemperatureThresholds = (roomId: string, deviceId: string, thresholds: { min?: number; max?: number }) => {
    const currentRoom = rooms.find(room => room.id === roomId);
    const device = currentRoom?.devices.find(d => d.id === deviceId);
    
    if (!device || device.controlMode !== 'auto') {
      toast({
        title: "Mode automatique requis",
        description: "Passez l'appareil en mode automatique pour définir les seuils de température.",
        variant: "destructive"
      });
      return;
    }
    
    setRooms(rooms.map(room => 
      room.id === roomId ? {
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

  return {
    rooms,
    toggleDevice,
    toggleDeviceControlMode,
    scheduleDevice,
    setTemperatureThresholds
  };
}
