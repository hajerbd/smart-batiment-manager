
/**
 * Contexte global pour gérer l'état des appareils de la maison
 * Évite le "props drilling" en fournissant un accès global aux fonctionnalités des appareils
 */
import React, { createContext, useContext, ReactNode } from 'react';
import { useDevices } from '@/hooks/useDevices';
import { Room } from '@/components/device-control/RoomModel';

interface DeviceContextType {
  rooms: Room[];
  toggleDevice: (roomId: string, deviceId: string) => void;
  toggleDeviceControlMode: (roomId: string, deviceId: string) => void;
  scheduleDevice: (
    roomId: string, 
    deviceId: string, 
    scheduleData: {
      startTime: string;
      endTime: string;
      scheduleType: 'daily';
      repeat?: boolean;
      durationMinutes?: number;
    }
  ) => void;
  setTemperatureThresholds: (
    roomId: string, 
    deviceId: string, 
    thresholds: { min?: number; max?: number }
  ) => void;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const DeviceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const deviceHook = useDevices();
  
  return (
    <DeviceContext.Provider value={deviceHook}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDeviceContext = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDeviceContext doit être utilisé à l'intérieur d'un DeviceProvider');
  }
  return context;
};
