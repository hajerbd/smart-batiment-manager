
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { rooms } from '@/config/house-config';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudLightning, 
  CloudSnow,
  Thermometer, 
  Droplets, 
  Wind 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import DashboardHeader from '@/components/DashboardHeader';

interface WeatherData {
  current: {
    temp: number;
    humidity: number;
    windSpeed: number;
    condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'snowy';
    icon: React.ReactNode;
  };
  forecast: Array<{
    day: string;
    temp: number;
    condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'snowy';
    icon: React.ReactNode;
  }>;
}

const mockWeatherData: WeatherData = {
  current: {
    temp: 24.5,
    humidity: 42,
    windSpeed: 12,
    condition: 'cloudy',
    icon: <Cloud className="h-12 w-12" />
  },
  forecast: [
    { day: 'Lun', temp: 25, condition: 'sunny', icon: <Sun className="h-6 w-6" /> },
    { day: 'Mar', temp: 24, condition: 'cloudy', icon: <Cloud className="h-6 w-6" /> },
    { day: 'Mer', temp: 22, condition: 'rainy', icon: <CloudRain className="h-6 w-6" /> },
    { day: 'Jeu', temp: 21, condition: 'rainy', icon: <CloudRain className="h-6 w-6" /> },
    { day: 'Ven', temp: 20, condition: 'stormy', icon: <CloudLightning className="h-6 w-6" /> },
    { day: 'Sam', temp: 19, condition: 'snowy', icon: <CloudSnow className="h-6 w-6" /> },
    { day: 'Dim', temp: 23, condition: 'sunny', icon: <Sun className="h-6 w-6" /> }
  ]
};

const getTemperatureColor = (temp: number) => {
  if (temp >= 28) return "text-red-500";
  if (temp >= 23) return "text-orange-500";
  if (temp >= 18) return "text-green-500";
  if (temp >= 10) return "text-blue-400";
  return "text-blue-600";
};

const getWeatherClass = (condition: string) => {
  switch (condition) {
    case 'sunny': return 'bg-amber-100 text-amber-600';
    case 'cloudy': return 'bg-gray-100 text-gray-600';
    case 'rainy': return 'bg-blue-100 text-blue-600';
    case 'stormy': return 'bg-indigo-100 text-indigo-600';
    case 'snowy': return 'bg-sky-100 text-sky-600';
    default: return 'bg-gray-100 text-gray-600';
  }
};

const Weather = () => {
  const [weather, setWeather] = useState<WeatherData>(mockWeatherData);
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'day' | 'evening' | 'night'>('day');
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 10) {
      setTimeOfDay('morning');
    } else if (hour >= 10 && hour < 17) {
      setTimeOfDay('day');
    } else if (hour >= 17 && hour < 22) {
      setTimeOfDay('evening');
    } else {
      setTimeOfDay('night');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader title="Météo & Températures" />
      <div className="flex-1 p-4 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current weather card */}
          <Card className={cn(
            "lg:col-span-2 bg-gradient-to-br from-blue-50 to-sky-50",
            timeOfDay === 'night' && "from-indigo-950 to-slate-900 text-white",
            timeOfDay === 'evening' && "from-orange-50 to-red-50",
            timeOfDay === 'morning' && "from-blue-50 to-purple-50"
          )}>
            <CardHeader>
              <div className="flex flex-wrap justify-between items-start">
                <div>
                  <CardTitle className={cn(
                    "text-2xl font-bold",
                    timeOfDay === 'night' && "text-white"
                  )}>
                    Météo actuelle
                  </CardTitle>
                  <CardDescription className={timeOfDay === 'night' ? "text-gray-300" : ""}>
                    Mis à jour à {new Date().toLocaleTimeString()}
                  </CardDescription>
                </div>
                <Badge variant="outline" className={cn(
                  "text-md px-3 py-1",
                  getWeatherClass(weather.current.condition)
                )}>
                  {weather.current.condition === 'sunny' && 'Ensoleillé'}
                  {weather.current.condition === 'cloudy' && 'Nuageux'}
                  {weather.current.condition === 'rainy' && 'Pluie'}
                  {weather.current.condition === 'stormy' && 'Orage'}
                  {weather.current.condition === 'snowy' && 'Neige'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <div className={cn(
                    "p-4 rounded-full mr-4",
                    getWeatherClass(weather.current.condition)
                  )}>
                    {weather.current.icon}
                  </div>
                  <div>
                    <div className={cn(
                      "text-5xl font-bold",
                      getTemperatureColor(weather.current.temp),
                      timeOfDay === 'night' && "text-white"
                    )}>
                      {weather.current.temp}°C
                    </div>
                    <div className={timeOfDay === 'night' ? "text-gray-300" : "text-gray-500"}>
                      Extérieur
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full md:w-auto">
                  <div className={cn(
                    "p-3 rounded-lg bg-white/60 border flex flex-col items-center",
                    timeOfDay === 'night' && "bg-white/10 border-gray-700"
                  )}>
                    <Droplets className="h-6 w-6 text-blue-500 mb-1" />
                    <div className={cn(
                      "text-lg font-semibold",
                      timeOfDay === 'night' && "text-white"
                    )}>
                      {weather.current.humidity}%
                    </div>
                    <div className="text-xs text-gray-500">Humidité</div>
                  </div>
                  
                  <div className={cn(
                    "p-3 rounded-lg bg-white/60 border flex flex-col items-center",
                    timeOfDay === 'night' && "bg-white/10 border-gray-700"
                  )}>
                    <Wind className="h-6 w-6 text-teal-500 mb-1" />
                    <div className={cn(
                      "text-lg font-semibold",
                      timeOfDay === 'night' && "text-white"
                    )}>
                      {weather.current.windSpeed} km/h
                    </div>
                    <div className="text-xs text-gray-500">Vent</div>
                  </div>
                  
                  <div className={cn(
                    "p-3 rounded-lg bg-white/60 border flex flex-col items-center",
                    timeOfDay === 'night' && "bg-white/10 border-gray-700"
                  )}>
                    <Sun className="h-6 w-6 text-amber-500 mb-1" />
                    <div className={cn(
                      "text-lg font-semibold",
                      timeOfDay === 'night' && "text-white"
                    )}>
                      19:45
                    </div>
                    <div className="text-xs text-gray-500">Coucher</div>
                  </div>
                </div>
              </div>
              
              {/* Forecast */}
              <div className="mt-6">
                <h3 className={cn(
                  "text-md font-medium mb-3",
                  timeOfDay === 'night' && "text-white"
                )}>
                  Prévisions sur 7 jours
                </h3>
                <div className="grid grid-cols-7 gap-2">
                  {weather.forecast.map((day, index) => (
                    <div key={index} className={cn(
                      "flex flex-col items-center p-2 rounded-lg text-center",
                      timeOfDay === 'night' ? "bg-white/5" : "bg-white/60"
                    )}>
                      <div className={timeOfDay === 'night' ? "text-gray-300" : "text-gray-600"}>
                        {day.day}
                      </div>
                      <div className={cn(
                        "p-2 rounded-full my-1",
                        getWeatherClass(day.condition)
                      )}>
                        {day.icon}
                      </div>
                      <div className={cn(
                        "font-semibold",
                        getTemperatureColor(day.temp),
                        timeOfDay === 'night' && "text-white"
                      )}>
                        {day.temp}°
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Indoor climate */}
          <Card>
            <CardHeader>
              <CardTitle>Climat intérieur</CardTitle>
              <CardDescription>Comparaison des températures par pièce</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {rooms.map(room => (
                <div key={room.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Thermometer className={cn(
                        "h-4 w-4 mr-2",
                        getTemperatureColor(room.temperature || 0)
                      )} />
                      <span>{room.name}</span>
                    </div>
                    <span className={cn(
                      "font-medium",
                      getTemperatureColor(room.temperature || 0)
                    )}>
                      {room.temperature}°C
                    </span>
                  </div>
                  <Progress 
                    value={((room.temperature || 0) - 15) / 20 * 100} 
                    className="h-2"
                    indicatorClassName={cn(
                      room.temperature && room.temperature >= 28 ? "bg-red-500" :
                      room.temperature && room.temperature >= 23 ? "bg-orange-500" :
                      room.temperature && room.temperature >= 18 ? "bg-green-500" :
                      room.temperature && room.temperature >= 10 ? "bg-blue-400" :
                      "bg-blue-600"
                    )}
                  />
                </div>
              ))}
              
              <div className="mt-6 border-t pt-4">
                <h3 className="font-medium mb-3">Humidité relative</h3>
                <div className="grid grid-cols-2 gap-3">
                  {rooms.map(room => (
                    <div 
                      key={room.id}
                      className="p-3 bg-secondary/30 rounded-lg flex flex-col items-center justify-center"
                    >
                      <div className="text-xs text-muted-foreground mb-1">{room.name}</div>
                      <Droplets className="h-5 w-5 text-blue-500 mb-1" />
                      <div className="text-lg font-semibold">{room.humidity}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Temperature history */}
        <Card>
          <CardHeader>
            <CardTitle>Historique des températures</CardTitle>
            <CardDescription>Évolution des températures sur les dernières 24 heures</CardDescription>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center">
            <div className="text-muted-foreground">
              Graphique d'historique des températures à intégrer
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Weather;
