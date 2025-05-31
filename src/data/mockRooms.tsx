
import React from 'react';
import { 
  Thermometer, 
  Snowflake,
  Blinds,
  Droplet,
  Lamp,
  Home
} from 'lucide-react';
import { Room } from '@/types/device';

export const mockRooms: Room[] = [
  {
    id: '1',
    name: 'Chambre n°1',
    icon: <Home className="h-5 w-5" />,
    devices: [
      {
        id: '11',
        name: 'Chauffage',
        type: 'heating',
        status: false,
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
        status: false,
        icon: <Snowflake className="h-5 w-5" />,
        temperature: '21°C',
        controlMode: 'manual',
        temperatureThresholds: {
          max: 24
        }
      },
      {
        id: '13',
        name: 'Stores automatiques',
        type: 'blinds',
        status: false,
        icon: <Blinds className="h-5 w-5" />,
        controlMode: 'manual'
      },
      {
        id: '14',
        name: 'Éclairage',
        type: 'lighting',
        status: false,
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
        status: false,
        icon: <Thermometer className="h-5 w-5" />,
        temperature: '19°C',
        controlMode: 'manual',
        temperatureThresholds: {
          min: 20
        }
      },
      {
        id: '22',
        name: 'Climatisation',
        type: 'cooling',
        status: false,
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
        status: false,
        icon: <Blinds className="h-5 w-5" />,
        controlMode: 'manual'
      },
      {
        id: '24',
        name: 'Éclairage',
        type: 'lighting',
        status: false,
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
        status: false,
        icon: <Thermometer className="h-5 w-5" />,
        temperature: '20°C',
        controlMode: 'manual'
      },
      {
        id: '32',
        name: 'Climatisation',
        type: 'cooling',
        status: false,
        icon: <Snowflake className="h-5 w-5" />,
        temperature: '20°C',
        controlMode: 'manual'
      },
      {
        id: '33',
        name: 'Stores automatiques',
        type: 'blinds',
        status: false,
        icon: <Blinds className="h-5 w-5" />,
        controlMode: 'manual'
      },
      {
        id: '34',
        name: 'Éclairage',
        type: 'lighting',
        status: false,
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
        status: false,
        icon: <Lamp className="h-5 w-5" />,
        controlMode: 'manual'
      },
      {
        id: '42',
        name: 'Chauffage',
        type: 'heating',
        status: false,
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
        status: false,
        icon: <Snowflake className="h-5 w-5" />,
        temperature: '20°C',
        controlMode: 'manual',
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
        status: false,
        icon: <Droplet className="h-5 w-5" />,
        controlMode: 'manual'
      }
    ]
  }
];
