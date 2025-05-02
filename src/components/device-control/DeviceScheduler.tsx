
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
  }) => void;
}

export const DeviceScheduler: React.FC<DeviceSchedulerProps> = ({ device, onSchedule }) => {
  const [startTime, setStartTime] = useState(device.scheduledTime?.startTime || "08:00");
  const [endTime, setEndTime] = useState(device.scheduledTime?.endTime || "18:00");
  const [repeat, setRepeat] = useState<boolean>(device.scheduledTime?.repeat || false);
  
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
                  onSchedule({
                    startTime,
                    endTime,
                    scheduleType: 'daily',
                    repeat
                  });
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
