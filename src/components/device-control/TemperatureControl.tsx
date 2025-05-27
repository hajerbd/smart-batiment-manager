
import React from 'react';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { Power, ThermometerSnowflake, ThermometerSun } from 'lucide-react';
import { Device } from './DeviceCard';

interface TemperatureControlProps {
  device: Device;
  onSetThresholds: (deviceId: string, thresholds: { min?: number; max?: number }) => void;
}

export const TemperatureControl: React.FC<TemperatureControlProps> = ({ device, onSetThresholds }) => {
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-xl p-4 shadow-md">
        <div className="flex items-center gap-2 mb-3">
          {device.type === 'heating' ? (
            <div className="bg-gradient-to-r from-amber-300 to-amber-500 text-white p-2 rounded-lg">
              <ThermometerSun className="h-5 w-5" />
            </div>
          ) : (
            <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-2 rounded-lg">
              <ThermometerSnowflake className="h-5 w-5" />
            </div>
          )}
          <h3 className="font-bold">
            {device.type === 'heating' ? 'Contrôle de chauffage' : 'Contrôle de climatisation'}
          </h3>
        </div>
        
        <div className="bg-white dark:bg-slate-700 rounded-lg p-4 shadow-inner mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-sm">
              {device.type === 'heating' ? 'Température minimale' : 'Température maximale'}
            </span>
            <div className={cn(
              "font-bold text-lg px-3 py-1 rounded-lg",
              device.type === 'heating' 
                ? "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300"
                : "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300"
            )}>
              {device.type === 'heating' 
                ? `${device.temperatureThresholds?.min || 20}°C`
                : `${device.temperatureThresholds?.max || 24}°C`
              }
            </div>
          </div>
          
          {/* Indicateur visuel de la plage de température avec gradient */}
          <div className="mt-6 mb-2">
            <div className={cn(
              "h-4 rounded-full",
              device.type === 'heating'
                ? "bg-gradient-to-r from-blue-300 via-green-300 to-amber-500"
                : "bg-gradient-to-r from-blue-500 via-green-300 to-amber-300"
            )}>
              <div className="relative">
                {device.type === 'heating' ? (
                  <div 
                    className="absolute w-6 h-6 bg-white dark:bg-slate-800 rounded-full shadow-md border-2 border-amber-500 flex items-center justify-center transform -translate-y-1/2"
                    style={{ 
                      left: `${((device.temperatureThresholds?.min || 20) - 15) / 10 * 100}%`,
                    }}
                  >
                    <div className="w-2 h-2 bg-amber-500 rounded-full" />
                  </div>
                ) : (
                  <div 
                    className="absolute w-6 h-6 bg-white dark:bg-slate-800 rounded-full shadow-md border-2 border-blue-500 flex items-center justify-center transform -translate-y-1/2"
                    style={{ 
                      left: `${((device.temperatureThresholds?.max || 24) - 20) / 10 * 100}%`,
                    }}
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span>{device.type === 'heating' ? '15°C' : '20°C'}</span>
              <span>{device.type === 'heating' ? '25°C' : '30°C'}</span>
            </div>
          </div>

          {/* Slider avec style amélioré */}
          <div className="mt-6">
            <Slider
              className={cn(
                "mt-2",
                device.type === 'heating' ? "slider-amber" : "slider-blue"
              )}
              min={device.type === 'heating' ? 15 : 20}
              max={device.type === 'heating' ? 25 : 30}
              step={0.5}
              value={[device.type === 'heating' 
                ? (device.temperatureThresholds?.min || 20) 
                : (device.temperatureThresholds?.max || 24)
              ]}
              onValueChange={(value) => {
                if (device.type === 'heating') {
                  onSetThresholds(device.id, { min: value[0] });
                } else {
                  onSetThresholds(device.id, { max: value[0] });
                }
              }}
            />
          </div>
        </div>
        
        <div className={cn(
          "p-3 rounded-lg mt-3 flex items-center gap-3",
          device.status 
            ? (device.type === 'heating' 
              ? "bg-amber-100 dark:bg-amber-900/30" 
              : "bg-blue-100 dark:bg-blue-900/30")
            : "bg-slate-100 dark:bg-slate-800"
        )}>
          <div className={cn(
            "p-1 rounded-full",
            device.status
              ? (device.type === 'heating'
                ? "bg-amber-200 dark:bg-amber-800"
                : "bg-blue-200 dark:bg-blue-800")
              : "bg-slate-200 dark:bg-slate-700"
          )}>
            <Power className={cn(
              "h-4 w-4",
              device.status
                ? (device.type === 'heating' 
                  ? "text-amber-600 dark:text-amber-400" 
                  : "text-blue-600 dark:text-blue-400")
                : "text-slate-400"
            )} />
          </div>
          <div>
            <div className="font-medium text-sm">
              {device.status 
                ? "Régulation active" 
                : "Régulation inactive"
              }
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {device.type === 'heating' 
                ? `S'active si température < ${device.temperatureThresholds?.min || 20}°C` 
                : `S'active si température > ${device.temperatureThresholds?.max || 24}°C`
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
