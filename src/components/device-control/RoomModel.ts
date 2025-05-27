
import { ReactNode } from 'react';
import { Device } from './DeviceCard';

export interface Room {
  id: string;
  name: string;
  icon: ReactNode;
  devices: Device[];
}
