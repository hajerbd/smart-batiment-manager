
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, Thermometer, Snowflake, Blinds, Lamp, Droplet } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { DeviceCard } from './DeviceCard';
import { Room } from './RoomModel';

// Données simulées avec le mode de contrôle par équipement et tous inactifs par défaut
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
        status: false, // Inactif par défaut
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
        status: false, // Inactif par défaut
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
        status: false, // Inactif par défaut
        icon: <Blinds className="h-5 w-5" />,
        controlMode: 'manual'
      },
      {
        id: '14',
        name: 'Éclairage',
        type: 'lighting',
        status: false, // Inactif par défaut
        icon: <Lamp className="h-5 w-5" />,
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
        status: false, // Inactif par défaut
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
        status: false, // Inactif par défaut
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
        status: false, // Inactif par défaut
        icon: <Blinds className="h-5 w-5" />,
        controlMode: 'auto'
      },
      {
        id: '24',
        name: 'Éclairage',
        type: 'lighting',
        status: false, // Inactif par défaut
        icon: <Lamp className="h-5 w-5" />,
        controlMode: 'manual'
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
        status: false, // Inactif par défaut
        icon: <Thermometer className="h-5 w-5" />,
        temperature: '20°C',
        controlMode: 'manual'
      },
      {
        id: '32',
        name: 'Climatisation',
        type: 'cooling',
        status: false, // Inactif par défaut
        icon: <Snowflake className="h-5 w-5" />,
        temperature: '20°C',
        controlMode: 'auto'
      },
      {
        id: '33',
        name: 'Stores automatiques',
        type: 'blinds',
        status: false, // Inactif par défaut
        icon: <Blinds className="h-5 w-5" />,
        controlMode: 'manual'
      },
      {
        id: '34',
        name: 'Éclairage',
        type: 'lighting',
        status: false, // Inactif par défaut
        icon: <Lamp className="h-5 w-5" />,
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
        status: false, // Inactif par défaut
        icon: <Lamp className="h-5 w-5" />,
        controlMode: 'manual'
      },
      {
        id: '42',
        name: 'Chauffage',
        type: 'heating',
        status: false, // Inactif par défaut
        icon: <Thermometer className="h-5 w-5" />,
        temperature: '20°C',
        controlMode: 'manual',
        temperatureThresholds: {
          min: 19
        }
      },
      {
        id: '43',
        name: 'Climatisation',
        type: 'cooling',
        status: false, // Inactif par défaut
        icon: <Snowflake className="h-5 w-5" />,
        temperature: '20°C',
        controlMode: 'auto',
        temperatureThresholds: {
          max: 24
        }
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
        status: false, // Inactif par défaut
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
    scheduleType: 'daily';
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
      toast({
        title: `${device.name} programmé`,
        description: `Programmé quotidiennement de ${scheduleData.startTime} à ${scheduleData.endTime}`,
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
            <DeviceCard
              key={device.id}
              device={device}
              onToggleDevice={toggleDevice}
              onToggleDeviceControlMode={toggleDeviceControlMode}
              onScheduleDevice={scheduleDevice}
              onSetTemperatureThresholds={setTemperatureThresholds}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomDeviceControl;
