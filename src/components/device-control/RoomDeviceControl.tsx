
/**
 * Composant de contrôle des appareils d'une pièce
 * - Affiche tous les appareils d'une pièce sélectionnée
 * - Permet de contrôler chaque appareil individuellement
 */
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { DeviceCard } from './DeviceCard';
import { useDeviceContext } from '@/context/DeviceContext';

interface RoomDeviceControlProps {
  roomId: string | null;
  onBack: () => void;
}

const RoomDeviceControl: React.FC<RoomDeviceControlProps> = ({ roomId, onBack }) => {
  // Utilisation du contexte pour accéder aux données et fonctions des appareils
  const { rooms, toggleDevice, toggleDeviceControlMode, scheduleDevice, setTemperatureThresholds } = useDeviceContext();
  
  // Trouver la pièce sélectionnée
  const selectedRoom = rooms.find(room => room.id === roomId);
  
  // Si aucune pièce n'est sélectionnée, afficher un message
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

  // Gestion des actions sur les appareils avec le roomId en contexte
  const handleToggleDevice = (deviceId: string) => toggleDevice(selectedRoom.id, deviceId);
  const handleToggleDeviceControlMode = (deviceId: string) => toggleDeviceControlMode(selectedRoom.id, deviceId);
  const handleScheduleDevice = (deviceId: string, scheduleData: any) => scheduleDevice(selectedRoom.id, deviceId, scheduleData);
  const handleSetTemperatureThresholds = (deviceId: string, thresholds: any) => setTemperatureThresholds(selectedRoom.id, deviceId, thresholds);
  
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
              onToggleDevice={handleToggleDevice}
              onToggleDeviceControlMode={handleToggleDeviceControlMode}
              onScheduleDevice={handleScheduleDevice}
              onSetTemperatureThresholds={handleSetTemperatureThresholds}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomDeviceControl;
