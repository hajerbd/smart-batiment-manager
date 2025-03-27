
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Room {
  id: string;
  name: string;
  type: 'bedroom' | 'livingroom' | 'hallway' | 'garden';
  position: { top: string; left: string; width: string; height: string };
}

// Liste des pièces avec leur position dans la vue 2D - Mise à jour des positions
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
    // Repositionnement du couloir au centre de la maison
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
      return <Bed className="h-6 w-6" />;
    case 'livingroom':
      return <Sofa className="h-6 w-6" />;
    case 'hallway':
      return <ArrowRightCircle className="h-6 w-6" />;
    case 'garden':
      return <Timer className="h-6 w-6" />;
    default:
      return <Home className="h-6 w-6" />;
  }
};

interface HouseViewProps {
  onSelectRoom: (roomId: string) => void;
}

const HouseView: React.FC<HouseViewProps> = ({ onSelectRoom }) => {
  const [controlMode, setControlMode] = useState<'manual' | 'auto'>('manual');
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Plan de la maison</CardTitle>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Mode de contrôle:</span>
          <Badge 
            variant="outline" 
            className={cn(
              "cursor-pointer transition-colors",
              controlMode === 'manual' 
                ? "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800" 
                : "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800"
            )}
            onClick={() => setControlMode('manual')}
          >
            {controlMode === 'manual' ? <ToggleRight className="h-4 w-4 mr-1" /> : <ToggleLeft className="h-4 w-4 mr-1" />}
            Manuel
          </Badge>
          <Badge 
            variant="outline" 
            className={cn(
              "cursor-pointer transition-colors",
              controlMode === 'auto' 
                ? "bg-green-100 text-green-800 hover:bg-green-200 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800" 
                : "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200 dark:bg-gray-900/30 dark:text-gray-400 dark:border-gray-800"
            )}
            onClick={() => setControlMode('auto')}
          >
            {controlMode === 'auto' ? <ToggleRight className="h-4 w-4 mr-1" /> : <ToggleLeft className="h-4 w-4 mr-1" />}
            Automatique
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* Plan 2D de la maison avec bordures plus claires et espacement réduit */}
        <div className="relative border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/50 h-[500px] mb-4 overflow-hidden">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="absolute border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 cursor-pointer hover:bg-primary/5 transition-colors flex flex-col items-center justify-center p-2 shadow-sm"
              style={{
                top: room.position.top,
                left: room.position.left,
                width: room.position.width,
                height: room.position.height,
              }}
              onClick={() => onSelectRoom(room.id)}
            >
              <div className="p-2 bg-primary/10 text-primary rounded-full mb-2">
                {getRoomIcon(room.type)}
              </div>
              <span className="text-sm font-medium">{room.name}</span>
              
              {/* Indicateur du mode de contrôle */}
              <div className="absolute top-2 right-2">
                <Badge variant="outline" className={cn(
                  "text-xs",
                  controlMode === 'manual' 
                    ? "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400" 
                    : "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400"
                )}>
                  {controlMode === 'manual' ? (
                    <Zap className="h-3 w-3 mr-1" />
                  ) : (
                    <Timer className="h-3 w-3 mr-1" />
                  )}
                  {controlMode === 'manual' ? 'M' : 'A'}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center text-sm text-muted-foreground">
          Cliquez sur une pièce pour gérer ses équipements
        </div>
      </CardContent>
    </Card>
  );
};

export default HouseView;
