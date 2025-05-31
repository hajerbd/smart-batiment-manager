
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
    scheduleType: 'daily';
    repeat?: boolean;
    durationMinutes?: number;
  };
  temperatureThresholds?: {
    min?: number;
    max?: number;
  };
}

export interface Room {
  id: string;
  name: string;
  icon: React.ReactNode;
  devices: Device[];
}
