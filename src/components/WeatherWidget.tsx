
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Thermometer, Cloud, CloudSun, CloudRain, Sun } from 'lucide-react';

interface WeatherWidgetProps {
  location?: string;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ location = "Extérieur" }) => {
  // Données météo simplifiées
  const weatherData = {
    temperature: 24,
    condition: 'partly-cloudy',
    humidity: 65,
  };

  // Fonction pour obtenir l'icône correspondant à la condition météo
  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'clear': return <Sun className="h-8 w-8 text-amber-500" />;
      case 'cloudy': return <Cloud className="h-8 w-8 text-gray-500" />;
      case 'partly-cloudy': return <CloudSun className="h-8 w-8 text-amber-500" />;
      case 'rainy': return <CloudRain className="h-8 w-8 text-blue-500" />;
      default: return <Sun className="h-8 w-8 text-amber-500" />;
    }
  };

  return (
    <Card>
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getWeatherIcon(weatherData.condition)}
          <div>
            <p className="text-sm text-muted-foreground">{location}</p>
            <div className="text-lg font-bold">{weatherData.temperature}°C</div>
          </div>
        </div>
        <div className="flex items-center">
          <Thermometer className="h-4 w-4 mr-1 text-blue-500" />
          <span className="text-sm">{weatherData.humidity}%</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
