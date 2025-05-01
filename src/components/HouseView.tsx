
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Home, 
  Bed, 
  Sofa, 
  ArrowRightCircle,
  Power, 
  ThermometerSnowflake,
  ThermometerSun,
  Lamp,
  Droplet
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Room {
  id: string;
  name: string;
  type: 'bedroom' | 'livingroom' | 'hallway' | 'garden';
  position: { top: string; left: string; width: string; height: string };
  devices?: string[];
}

// Liste des pièces avec leur position dans la vue 2D et équipements
const rooms: Room[] = [
  {
    id: '1',
    name: 'Chambre n°1',
    type: 'bedroom',
    position: { top: '10%', left: '10%', width: '30%', height: '35%' },
    devices: ['chauffage', 'climatisation', 'stores']
  },
  {
    id: '2',
    name: 'Chambre n°2',
    type: 'bedroom',
    position: { top: '10%', left: '60%', width: '30%', height: '35%' },
    devices: ['chauffage', 'climatisation', 'stores']
  },
  {
    id: '3',
    name: 'Salon',
    type: 'livingroom',
    position: { top: '55%', left: '10%', width: '30%', height: '35%' },
    devices: ['chauffage', 'climatisation', 'stores']
  },
  {
    id: '4',
    name: 'Couloir',
    type: 'hallway',
    position: { top: '35%', left: '42.5%', width: '15%', height: '30%' },
    devices: ['éclairage']
  },
  {
    id: '5',
    name: 'Jardin',
    type: 'garden',
    position: { top: '55%', left: '60%', width: '30%', height: '35%' },
    devices: ['irrigation']
  },
];

// Fonction pour obtenir l'icône correspondante au type de pièce
const getRoomIcon = (type: Room['type']) => {
  switch (type) {
    case 'bedroom':
      return <Bed className="h-4 w-4 md:h-5 md:w-5" />;
    case 'livingroom':
      return <Sofa className="h-4 w-4 md:h-5 md:w-5" />;
    case 'hallway':
      return <ArrowRightCircle className="h-4 w-4 md:h-5 md:w-5" />;
    case 'garden':
      return <Power className="h-4 w-4 md:h-5 md:w-5" />;
    default:
      return <Home className="h-4 w-4 md:h-5 md:w-5" />;
  }
};

// Fonction pour obtenir l'icône correspondante au type d'équipement
const getDeviceIcon = (deviceType: string) => {
  switch (deviceType) {
    case 'chauffage':
      return <ThermometerSun className="h-3 w-3 text-amber-500" />;
    case 'climatisation':
      return <ThermometerSnowflake className="h-3 w-3 text-blue-500" />;
    case 'stores':
      return <ArrowRightCircle className="h-3 w-3 text-gray-500" />;
    case 'éclairage':
      return <Lamp className="h-3 w-3 text-yellow-400" />;
    case 'irrigation':
      return <Droplet className="h-3 w-3 text-blue-400" />;
    default:
      return null;
  }
};

interface HouseViewProps {
  onSelectRoom: (roomId: string) => void;
}

const HouseView: React.FC<HouseViewProps> = ({ onSelectRoom }) => {
  return (
    <Card className="w-full h-full shadow-xl flex flex-col">
      <CardHeader className="py-2 px-4 flex flex-row items-center justify-between shrink-0">
        <CardTitle className="text-xl font-bold">Plan de la maison</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-0 overflow-hidden">
        <ScrollArea className="h-full w-full">
          <div className="p-4">
            <div 
              className="relative rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800"
              style={{ 
                width: '100%',
                minWidth: '600px',
                height: '600px',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)'
              }}
            >
              {/* Lignes de quadrillage en arrière-plan */}
              <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 pointer-events-none">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={`v-${i}`} className="border-r border-gray-200/50 dark:border-gray-700/30 h-full"></div>
                ))}
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={`h-${i}`} className="border-b border-gray-200/50 dark:border-gray-700/30 w-full"></div>
                ))}
              </div>
              
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="absolute rounded-lg cursor-pointer transition-all duration-300 group hover:scale-[1.01]"
                  style={{
                    top: room.position.top,
                    left: room.position.left,
                    width: room.position.width,
                    height: room.position.height,
                    background: room.type === 'bedroom' ? 'linear-gradient(225deg, #e2e8f0, #cbd5e1)' :
                              room.type === 'livingroom' ? 'linear-gradient(225deg, #dbeafe, #bfdbfe)' :
                              room.type === 'hallway' ? 'linear-gradient(225deg, #f1f5f9, #e2e8f0)' :
                              'linear-gradient(225deg, #dcfce7, #bbf7d0)',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                    border: '2px solid rgba(255,255,255,0.5)',
                  }}
                  onClick={() => onSelectRoom(room.id)}
                >
                  <div className="absolute inset-0 rounded-lg p-3 flex flex-col justify-between">
                    <div className="flex items-center space-x-2 bg-white/70 dark:bg-gray-800/70 p-2 rounded-md backdrop-blur-sm">
                      <div className="p-1.5 bg-primary/10 text-primary rounded-full">
                        {getRoomIcon(room.type)}
                      </div>
                      <span className="text-sm font-medium">{room.name}</span>
                    </div>
                    
                    {room.devices && (
                      <div className="flex flex-wrap gap-1 mt-auto">
                        {room.devices.map((device, index) => (
                          <div 
                            key={index} 
                            className="bg-white/70 dark:bg-gray-800/70 rounded-full px-2 py-0.5 text-xs font-medium backdrop-blur-sm flex items-center gap-1"
                          >
                            {getDeviceIcon(device)}
                            <span>{device}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Lignes de connexion entre les pièces */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                <line x1="40%" y1="27.5%" x2="42.5%" y2="35%" stroke="rgba(203, 213, 225, 0.6)" strokeWidth="2" strokeDasharray="4" />
                <line x1="60%" y1="27.5%" x2="57.5%" y2="35%" stroke="rgba(203, 213, 225, 0.6)" strokeWidth="2" strokeDasharray="4" />
                <line x1="40%" y1="72.5%" x2="42.5%" y2="65%" stroke="rgba(203, 213, 225, 0.6)" strokeWidth="2" strokeDasharray="4" />
                <line x1="60%" y1="72.5%" x2="57.5%" y2="65%" stroke="rgba(203, 213, 225, 0.6)" strokeWidth="2" strokeDasharray="4" />
              </svg>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default HouseView;
