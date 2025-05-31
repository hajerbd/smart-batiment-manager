
import React, { useState } from 'react';
import { Clock, CalendarClock, Droplet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Dialog,
  DialogContent,
  DialogDescription, 
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Device } from '@/types/device';

interface DeviceSchedulerProps {
  device: Device;
  onSchedule: (scheduleData: {
    startTime: string;
    endTime: string;
    scheduleType: 'daily';
    repeat?: boolean;
    durationMinutes?: number;
  }) => void;
}

const DeviceScheduler: React.FC<DeviceSchedulerProps> = ({ device, onSchedule }) => {
  const [startTime, setStartTime] = useState(device.scheduledTime?.startTime || "08:00");
  const [endTime, setEndTime] = useState(device.scheduledTime?.endTime || "18:00");
  const [repeat, setRepeat] = useState<boolean>(device.scheduledTime?.repeat || false);
  const [durationMinutes, setDurationMinutes] = useState<number>(device.scheduledTime?.durationMinutes || 30);
  
  const form = useForm({
    defaultValues: {
      scheduleType: 'daily',
    }
  });

  return (
    <div className="space-y-4 py-4">
      <Form {...form}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="scheduleType"
            render={() => (
              <FormItem>
                <FormLabel>Type de programmation</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/30 p-3 rounded-md">
                    <CalendarClock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <Label className="text-blue-700 dark:text-blue-300 font-medium">
                      Journalier (tous les jours)
                    </Label>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Heure de début</Label>
              <Input 
                id="startTime" 
                type="time" 
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endTime">Heure de fin</Label>
              <Input 
                id="endTime" 
                type="time" 
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
          
          {device.type === 'irrigation' && (
            <div className="space-y-2">
              <Label htmlFor="durationMinutes">Durée de fonctionnement (minutes)</Label>
              <div className="flex items-center space-x-2">
                <Droplet className="h-4 w-4 text-blue-500" />
                <Input 
                  id="durationMinutes" 
                  type="number" 
                  min="1"
                  max="240"
                  placeholder="30"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(parseInt(e.target.value) || 30)}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground">min</span>
              </div>
              <p className="text-xs text-muted-foreground">
                La vanne s'ouvrira pendant cette durée lors de chaque programmation
              </p>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="repeat" 
              checked={repeat}
              onCheckedChange={(checked) => setRepeat(checked as boolean)}
            />
            <Label htmlFor="repeat">Activer la répétition</Label>
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <DialogClose asChild>
              <Button variant="outline">Annuler</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button 
                onClick={() => {
                  const scheduleData = {
                    startTime,
                    endTime,
                    scheduleType: 'daily' as const,
                    repeat
                  };
                  
                  if (device.type === 'irrigation') {
                    (scheduleData as any).durationMinutes = durationMinutes;
                  }
                  
                  onSchedule(scheduleData);
                }}
              >
                Enregistrer
              </Button>
            </DialogClose>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default DeviceScheduler;
