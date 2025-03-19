
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Thermometer, Fan, Droplets, Lamp, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

const SystemStatusItem = ({ icon, name, status, value, description, theme }: {
  icon: React.ReactNode;
  name: string;
  status: 'online' | 'offline' | 'warning';
  value: string;
  description: string;
  theme: 'energy' | 'climate' | 'water';
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getThemeColor = () => {
    switch (theme) {
      case 'energy': return 'text-energy';
      case 'climate': return 'text-blue-500';
      case 'water': return 'text-cyan-500';
      default: return 'text-foreground';
    }
  };

  return (
    <div className="flex items-start space-x-4 p-4 rounded-md bg-background border">
      <div className={cn("p-2 rounded-full", 
        theme === 'energy' ? 'bg-energy/10 text-energy' : 
        theme === 'climate' ? 'bg-blue-100 text-blue-500' : 
        'bg-cyan-100 text-cyan-500')}>
        {icon}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{name}</h3>
          <div className="flex items-center">
            <span className={cn("h-2 w-2 rounded-full mr-1", getStatusColor())}></span>
            <span className="text-xs text-muted-foreground capitalize">{status}</span>
          </div>
        </div>
        <div className={cn("text-lg font-semibold", getThemeColor())}>{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

const SystemsOverview = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Systèmes principaux</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SystemStatusItem 
            icon={<Thermometer size={20} />}
            name="Système de chauffage"
            status="online"
            value="22.5°C"
            description="Température optimale maintenue"
            theme="climate"
          />
          
          <SystemStatusItem 
            icon={<Fan size={20} />}
            name="Système de climatisation"
            status="online"
            value="80%"
            description="Circulation d'air efficace"
            theme="climate"
          />
          
          <SystemStatusItem 
            icon={<Home size={20} />}
            name="Stores automatiques"
            status="warning"
            value="4/6 opérationnels"
            description="Maintenance requise dans la chambre n°1"
            theme="energy"
          />
          
          <SystemStatusItem 
            icon={<Droplets size={20} />}
            name="Système d'irrigation"
            status="online"
            value="3.2 m³/h"
            description="Consommation normale"
            theme="water"
          />
        </div>
        
        <div className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Occupation des espaces</span>
              <span className="text-sm text-muted-foreground">72%</span>
            </div>
            <Progress value={72} className="h-2" />
          </div>
          
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Qualité de l'air</span>
              <span className="text-sm text-muted-foreground">91%</span>
            </div>
            <Progress value={91} className="h-2" />
          </div>
          
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Efficacité énergétique</span>
              <span className="text-sm text-muted-foreground">84%</span>
            </div>
            <Progress value={84} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemsOverview;
