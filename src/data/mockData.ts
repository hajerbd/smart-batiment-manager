
/**
 * Fichier contenant les données simulées (mock data) pour les pièces et appareils
 * Dans une application réelle, ces données proviendraient d'une API backend
 */
import { Home, Thermometer, Snowflake, Blinds, Lamp, Droplet } from 'lucide-react';
import { Room } from '../components/device-control/RoomModel';
import React from 'react';

// Données simulées avec le mode de contrôle par équipement et tous inactifs par défaut
export const mockRooms: Room[] = [
  {
    id: '1',
    name: 'Chambre n°1',
    icon: React.createElement(Home, { className: "h-5 w-5" }),
    devices: [
      {
        id: '11',
        name: 'Chauffage',
        type: 'heating',
        status: false, // Inactif par défaut
        icon: React.createElement(Thermometer, { className: "h-5 w-5" }),
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
        icon: React.createElement(Snowflake, { className: "h-5 w-5" }),
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
        icon: React.createElement(Blinds, { className: "h-5 w-5" }),
        controlMode: 'manual'
      },
      {
        id: '14',
        name: 'Éclairage',
        type: 'lighting',
        status: false, // Inactif par défaut
        icon: React.createElement(Lamp, { className: "h-5 w-5" }),
        controlMode: 'manual'
      }
    ]
  },
  {
    id: '2',
    name: 'Chambre n°2',
    icon: React.createElement(Home, { className: "h-5 w-5" }),
    devices: [
      {
        id: '21',
        name: 'Chauffage',
        type: 'heating',
        status: false, // Inactif par défaut
        icon: React.createElement(Thermometer, { className: "h-5 w-5" }),
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
        icon: React.createElement(Snowflake, { className: "h-5 w-5" }),
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
        icon: React.createElement(Blinds, { className: "h-5 w-5" }),
        controlMode: 'auto'
      },
      {
        id: '24',
        name: 'Éclairage',
        type: 'lighting',
        status: false, // Inactif par défaut
        icon: React.createElement(Lamp, { className: "h-5 w-5" }),
        controlMode: 'manual'
      }
    ]
  },
  {
    id: '3',
    name: 'Salon',
    icon: React.createElement(Home, { className: "h-5 w-5" }),
    devices: [
      {
        id: '31',
        name: 'Chauffage',
        type: 'heating',
        status: false, // Inactif par défaut
        icon: React.createElement(Thermometer, { className: "h-5 w-5" }),
        temperature: '20°C',
        controlMode: 'manual'
      },
      {
        id: '32',
        name: 'Climatisation',
        type: 'cooling',
        status: false, // Inactif par défaut
        icon: React.createElement(Snowflake, { className: "h-5 w-5" }),
        temperature: '20°C',
        controlMode: 'auto'
      },
      {
        id: '33',
        name: 'Stores automatiques',
        type: 'blinds',
        status: false, // Inactif par défaut
        icon: React.createElement(Blinds, { className: "h-5 w-5" }),
        controlMode: 'manual'
      },
      {
        id: '34',
        name: 'Éclairage',
        type: 'lighting',
        status: false, // Inactif par défaut
        icon: React.createElement(Lamp, { className: "h-5 w-5" }),
        controlMode: 'manual'
      }
    ]
  },
  {
    id: '4',
    name: 'Couloir',
    icon: React.createElement(Home, { className: "h-5 w-5" }),
    devices: [
      {
        id: '41',
        name: 'Lumière principale',
        type: 'lighting',
        status: false, // Inactif par défaut
        icon: React.createElement(Lamp, { className: "h-5 w-5" }),
        controlMode: 'manual'
      },
      {
        id: '42',
        name: 'Chauffage',
        type: 'heating',
        status: false, // Inactif par défaut
        icon: React.createElement(Thermometer, { className: "h-5 w-5" }),
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
        icon: React.createElement(Snowflake, { className: "h-5 w-5" }),
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
    icon: React.createElement(Home, { className: "h-5 w-5" }),
    devices: [
      {
        id: '51',
        name: 'Vannes d\'irrigation',
        type: 'irrigation',
        status: false, // Inactif par défaut
        icon: React.createElement(Droplet, { className: "h-5 w-5" }),
        controlMode: 'auto'
      }
    ]
  }
];
