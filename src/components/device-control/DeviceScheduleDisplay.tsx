
/**
 * Composant pour afficher et modifier la programmation d'un appareil
 * Extrait de DeviceCard pour plus de modularité
 */
import React from 'react';
import { Device } from './DeviceCard';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from '@/components/ui/button';
import { Calendar, CalendarClock, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { DeviceScheduler } from './DeviceScheduler';
import { toast } from "@/hooks/use-toast";

interface DeviceScheduleDisplayProps {
  device: Device;
  onSchedule: (scheduleData: {
    startTime: string;
    endTime: string;
    scheduleType: 'daily';
    repeat?: boolean;
    durationMinutes?: number;
  }) => void;
}

export const DeviceScheduleDisplay: React.FC<DeviceScheduleDisplayProps> = ({ 
  device, 
  onSchedule 
}) => {
  // Si l'appareil n'a pas de programmation, afficher le bouton pour en ajouter une
  if (!device.scheduledTime) {
    return (
      <div className="flex justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Clock className="h-4 w-4 mr-2" /> Programmer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Programmation - {device.name}</DialogTitle>
              <DialogDescription>
                Définissez le type de programmation et les horaires
              </DialogDescription>
            </DialogHeader>
            
            <DeviceScheduler 
              device={device} 
              onSchedule={onSchedule}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // Si l'appareil a déjà une programmation, afficher les détails
  return (
    <Collapsible className="border rounded-lg p-3">
      <CollapsibleTrigger className="flex w-full justify-between items-center">
        <div className="flex items-center gap-2">
          <CalendarClock className="h-4 w-4 text-primary" />
          <span className="font-medium text-sm">Programmation actuelle</span>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Calendar className="h-4 w-4" />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2">
        <div className="text-xs space-y-2 bg-muted/30 rounded-md p-3">
          <div className="flex justify-between">
            <span>Type de programmation:</span>
            <span className="font-medium">
              {device.scheduledTime.scheduleType === 'daily' && 'Journalier'}
            </span>
          </div>
          
          {device.type === 'irrigation' ? (
            <>
              <div className="flex justify-between">
                <span>Heure d'activation:</span>
                <span className="font-medium">{device.scheduledTime.startTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Durée:</span>
                <span className="font-medium">{device.scheduledTime.durationMinutes} minutes</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between">
                <span>Heure début:</span>
                <span className="font-medium">{device.scheduledTime.startTime}</span>
              </div>
              <div className="flex justify-between">
                <span>Heure fin:</span>
                <span className="font-medium">{device.scheduledTime.endTime}</span>
              </div>
            </>
          )}
          
          {device.scheduledTime.repeat !== undefined && (
            <div className="flex justify-between">
              <span>Répétition:</span>
              <span className="font-medium">{device.scheduledTime.repeat ? 'Activée' : 'Désactivée'}</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between mt-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              // Effacer la programmation
              onSchedule({
                startTime: "",
                endTime: "",
                scheduleType: "daily",
                repeat: false
              });
              toast({
                title: `${device.name} désactivé`,
                description: "La programmation a été supprimée",
              });
            }}
            className="text-destructive hover:text-destructive"
          >
            Annuler
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
              >
                <Clock className="h-3 w-3 mr-1" /> Modifier
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Modifier la programmation - {device.name}</DialogTitle>
                <DialogDescription>
                  Définissez le type de programmation et les horaires
                </DialogDescription>
              </DialogHeader>
              
              <DeviceScheduler 
                device={device} 
                onSchedule={onSchedule}
              />
            </DialogContent>
          </Dialog>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
