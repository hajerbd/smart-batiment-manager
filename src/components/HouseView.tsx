
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Home, 
  Bed, 
  Sofa, 
  ArrowRightCircle,
  Power, 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Room {
  id: string;
  name: string;
  type: 'bedroom' | 'livingroom' | 'hallway' | 'garden';
  position: { top: string; left: string; width: string; height: string };
}

// Liste des pièces avec leur position dans la vue 2D
const rooms: Room[] = [
  {
    id: '1',
    name: 'Chambre n°1',
    type: 'bedroom',
    position: { top: '10%', left: '10%', width: '30%', height: '35%' },
  },
  {
    id: '2',
    name: 'Chambre n°2',
    type: 'bedroom',
    position: { top: '10%', left: '60%', width: '30%', height: '35%' },
  },
  {
    id: '3',
    name: 'Salon',
    type: 'livingroom',
    position: { top: '55%', left: '10%', width: '30%', height: '35%' },
  },
  {
    id: '4',
    name: 'Couloir',
    type: 'hallway',
    position: { top: '35%', left: '42.5%', width: '15%', height: '30%' },
  },
  {
    id: '5',
    name: 'Jardin',
    type: 'garden',
    position: { top: '55%', left: '60%', width: '30%', height: '35%' },
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
      return <Power className="h-4 w-4 md:h-5 md:w-5" />; // Changé de Timer à Power
    default:
      return <Home className="h-4 w-4 md:h-5 md:w-5" />;
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
              className="relative border-4 border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/50"
              style={{ 
                width: '100%',
                minWidth: '600px',
                height: '600px' 
              }}
            >
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="absolute border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 cursor-pointer hover:bg-primary/5 transition-colors flex flex-col items-center justify-center p-1 md:p-2 shadow-md"
                  style={{
                    top: room.position.top,
                    left: room.position.left,
                    width: room.position.width,
                    height: room.position.height,
                  }}
                  onClick={() => onSelectRoom(room.id)}
                >
                  <div className="p-1 md:p-2 bg-primary/10 text-primary rounded-full mb-1 md:mb-2">
                    {getRoomIcon(room.type)}
                  </div>
                  <span className="text-xs md:text-sm font-medium">{room.name}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default HouseView;
