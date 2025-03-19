
export type RoomType = 'bedroom' | 'living-room' | 'corridor' | 'garden';

export type DeviceType = 'climate' | 'heating' | 'blinds' | 'irrigation';

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  status: boolean;
  value?: number;
  room: string;
  batteryLevel?: number;
}

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  devices: Device[];
  temperature?: number;
  humidity?: number;
}

export const rooms: Room[] = [
  {
    id: 'bedroom1',
    name: 'Chambre Principale',
    type: 'bedroom',
    temperature: 22.5,
    humidity: 45,
    devices: [
      {
        id: 'climate-bedroom1',
        name: 'Climatiseur',
        type: 'climate',
        status: true,
        value: 22,
        room: 'Chambre Principale',
        batteryLevel: 92
      },
      {
        id: 'heating-bedroom1',
        name: 'Chauffage',
        type: 'heating',
        status: false,
        value: 0,
        room: 'Chambre Principale',
        batteryLevel: 85
      },
      {
        id: 'blinds-bedroom1',
        name: 'Stores',
        type: 'blinds',
        status: true,
        value: 100,
        room: 'Chambre Principale',
        batteryLevel: 78
      }
    ]
  },
  {
    id: 'bedroom2',
    name: 'Chambre Secondaire',
    type: 'bedroom',
    temperature: 21.8,
    humidity: 42,
    devices: [
      {
        id: 'climate-bedroom2',
        name: 'Climatiseur',
        type: 'climate',
        status: false,
        value: 0,
        room: 'Chambre Secondaire',
        batteryLevel: 95
      },
      {
        id: 'heating-bedroom2',
        name: 'Chauffage',
        type: 'heating',
        status: true,
        value: 21,
        room: 'Chambre Secondaire',
        batteryLevel: 65
      },
      {
        id: 'blinds-bedroom2',
        name: 'Stores',
        type: 'blinds',
        status: true,
        value: 70,
        room: 'Chambre Secondaire',
        batteryLevel: 72
      }
    ]
  },
  {
    id: 'living-room',
    name: 'Salon',
    type: 'living-room',
    temperature: 23.2,
    humidity: 40,
    devices: [
      {
        id: 'climate-living',
        name: 'Climatiseur',
        type: 'climate',
        status: true,
        value: 23,
        room: 'Salon',
        batteryLevel: 88
      },
      {
        id: 'heating-living',
        name: 'Chauffage',
        type: 'heating',
        status: false,
        value: 0,
        room: 'Salon',
        batteryLevel: 90
      },
      {
        id: 'blinds-living',
        name: 'Stores',
        type: 'blinds',
        status: true,
        value: 50,
        room: 'Salon',
        batteryLevel: 82
      }
    ]
  },
  {
    id: 'corridor',
    name: 'Couloir',
    type: 'corridor',
    temperature: 22.0,
    humidity: 38,
    devices: [
      {
        id: 'heating-corridor',
        name: 'Chauffage',
        type: 'heating',
        status: true,
        value: 21,
        room: 'Couloir',
        batteryLevel: 76
      }
    ]
  },
  {
    id: 'garden',
    name: 'Jardin',
    type: 'garden',
    temperature: 18.5,
    humidity: 65,
    devices: [
      {
        id: 'irrigation-garden',
        name: 'Système d\'irrigation',
        type: 'irrigation',
        status: false,
        value: 0,
        room: 'Jardin',
        batteryLevel: 92
      }
    ]
  }
];
