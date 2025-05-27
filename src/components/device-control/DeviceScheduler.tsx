
import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarClock } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  DialogClose
} from '@/components/ui/dialog';
import { Device } from './DeviceCard';

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

export const DeviceScheduler: React.FC<DeviceSchedulerProps> = ({ device, onSchedule }) => {
  const [startTime, setStartTime] = useState(device.scheduledTime?.startTime || "08:00");
  const [endTime, setEndTime] = useState(device.scheduledTime?.endTime || "18:00");
  const [repeat, setRepeat] = useState<boolean>(device.scheduledTime?.repeat || false);
  const [durationMinutes, setDurationMinutes] = useState<number>(
    device.scheduledTime?.durationMinutes || 30
  );
  
  const form = useForm({
    defaultValues: {
      scheduleType: 'daily',
    }
  });

  // Special handling for irrigation devices
  const isIrrigation = device.type === 'irrigation';

  // For irrigation, we just want the hour, so this extracts hour from HH:MM format
  const getHourFromTime = (time: string): string => {
    return time.split(':')[0] + ':00';
  };

  const handleScheduleSave = () => {
    if (isIrrigation) {
      // For irrigation, use hour-only time format and include duration
      onSchedule({
        startTime: getHourFromTime(startTime),
        endTime: '', // Not needed for irrigation
        scheduleType: 'daily',
        repeat,
        durationMinutes
      });
    } else {
      // For other devices, use standard scheduling
      onSchedule({
        startTime,
        endTime,
        scheduleType: 'daily',
        repeat
      });
    }
  };

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
          
          {isIrrigation ? (
            // Irrigation-specific scheduling UI
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="startHour">Heure d'activation</Label>
                <Input 
                  id="startHour"
                  type="time"
                  step="3600" // Step of 1 hour (3600 seconds)
                  value={startTime}
                  onChange={(e) => {
                    setStartTime(e.target.value);
                  }}
                />
                <p className="text-xs text-muted-foreground">
                  L'irrigation sera activée à cette heure précise chaque jour
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="durationMinutes">Durée d'irrigation (minutes)</Label>
                <Input 
                  id="durationMinutes"
                  type="number"
                  min="1"
                  max="120"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(parseInt(e.target.value, 10))}
                />
              </div>
            </div>
          ) : (
            // Standard scheduling UI for other device types
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
              <Button onClick={handleScheduleSave}>
                Enregistrer
              </Button>
            </DialogClose>
          </div>
        </div>
      </Form>
    </div>
  );
};
