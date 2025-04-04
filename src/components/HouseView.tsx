
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Home, 
  Bed, 
  Sofa, 
  ArrowRightCircle,
  Timer, 
  Zap,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

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
      return <Bed className="h-14 w-14" />;
    case 'livingroom':
      return <Sofa className="h-14 w-14" />;
    case 'hallway':
      return <ArrowRightCircle className="h-14 w-14" />;
    case 'garden':
      return <Timer className="h-14 w-14" />;
    default:
      return <Home className="h-14 w-14" />;
  }
};

interface HouseViewProps {
  onSelectRoom: (roomId: string) => void;
}

const HouseView: React.FC<HouseViewProps> = ({ onSelectRoom }) => {
  const [controlMode, setControlMode] = useState<'manual' | 'auto'>('manual');
  
  return (
    <Card className="w-full h-full shadow-xl overflow-hidden flex flex-col">
      <CardHeader className="py-4 px-6 flex flex-row items-center justify-between shrink-0">
        <CardTitle className="text-2xl font-bold">Plan de la maison</CardTitle>
        <div className="flex items-center space-x-2 md:space-x-4">
          <span className="text-base font-medium">Mode:</span>
          <Badge 
            variant="outline" 
            className={cn(
              "cursor-pointer transition-colors text-sm py-1 px-2 md:text-lg md:py-3 md:px-5",
              controlMode === 'manual' 
                ? "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800" 
                : "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800"
            )}
            onClick={() => setControlMode('manual')}
          >
            {controlMode === 'manual' ? <ToggleRight className="h-4 w-4 md:h-6 md:w-6 mr-1 md:mr-2" /> : <ToggleLeft className="h-4 w-4 md:h-6 md:w-6 mr-1 md:mr-2" />}
            Manuel
          </Badge>
          <Badge 
            variant="outline" 
            className={cn(
              "cursor-pointer transition-colors text-sm py-1 px-2 md:text-lg md:py-3 md:px-5",
              controlMode === 'auto' 
                ? "bg-green-100 text-green-800 hover:bg-green-200 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800" 
                : "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800"
            )}
            onClick={() => setControlMode('auto')}
          >
            {controlMode === 'auto' ? <ToggleRight className="h-4 w-4 md:h-6 md:w-6 mr-1 md:mr-2" /> : <ToggleLeft className="h-4 w-4 md:h-6 md:w-6 mr-1 md:mr-2" />}
            Auto
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-grow overflow-hidden">
        <ScrollArea className="h-full w-full">
          <div className="p-4 md:p-6">
            <div 
              className="relative border-4 border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/50 h-[600px] md:h-[800px]"
              style={{ minWidth: '800px' }} // Ensure horizontal scrolling if needed
            >
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="absolute border-4 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 cursor-pointer hover:bg-primary/5 transition-colors flex flex-col items-center justify-center p-4 md:p-8 shadow-xl"
                  style={{
                    top: room.position.top,
                    left: room.position.left,
                    width: room.position.width,
                    height: room.position.height,
                  }}
                  onClick={() => onSelectRoom(room.id)}
                >
                  <div className="p-3 md:p-5 bg-primary/10 text-primary rounded-full mb-2 md:mb-5">
                    {getRoomIcon(room.type)}
                  </div>
                  <span className="text-lg md:text-2xl font-medium">{room.name}</span>
                  
                  {/* Indicateur du mode de contrôle */}
                  <div className="absolute top-2 right-2 md:top-3 md:right-3">
                    <Badge variant="outline" className={cn(
                      "text-xs md:text-base py-0.5 px-1 md:py-1 md:px-3",
                      controlMode === 'manual' 
                        ? "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400" 
                        : "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400"
                    )}>
                      {controlMode === 'manual' ? (
                        <Zap className="h-3 w-3 md:h-6 md:w-6 mr-1 md:mr-2" />
                      ) : (
                        <Timer className="h-3 w-3 md:h-6 md:w-6 mr-1 md:mr-2" />
                      )}
                      {controlMode === 'manual' ? 'Manuel' : 'Auto'}
                    </Badge>
                  </div>
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
