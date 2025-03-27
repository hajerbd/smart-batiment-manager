
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
      case 'clear': return <Sun className="h-12 w-12 text-amber-500" />;
      case 'cloudy': return <Cloud className="h-12 w-12 text-gray-500" />;
      case 'partly-cloudy': return <CloudSun className="h-12 w-12 text-amber-500" />;
      case 'rainy': return <CloudRain className="h-12 w-12 text-blue-500" />;
      default: return <Sun className="h-12 w-12 text-amber-500" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Météo - {location}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {getWeatherIcon(weatherData.condition)}
            <div className="ml-4">
              <div className="text-3xl font-bold">{weatherData.temperature}°C</div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end">
              <Thermometer className="h-4 w-4 mr-1 text-blue-500" />
              <span className="text-sm">{weatherData.humidity}% d'humidité</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
