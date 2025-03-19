
import React, { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import EnergyConsumptionChart from '@/components/EnergyConsumptionChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lightbulb, Thermometer, Fan, Home, Droplets, PanelTop, SunMedium, BadgeAlert } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';

// Updated energy distribution for a home automation system
const energyDistribution = [
  { name: 'Chauffage', value: 35, color: '#F97316' }, // Orange for heating
  { name: 'Climatisation', value: 28, color: '#0EA5E9' }, // Blue for cooling
  { name: 'Éclairage', value: 15, color: '#FACC15' }, // Yellow for lighting
  { name: 'Stores automatiques', value: 8, color: '#8B5CF6' }, // Purple for blinds
  { name: 'Irrigation', value: 10, color: '#10B981' }, // Green for irrigation
  { name: 'Autres', value: 4, color: '#94A3B8' }, // Slate for others
];

const energySources = [
  { name: 'Réseau électrique', value: 65, color: '#EF4444' }, // Red
  { name: 'Panneaux solaires', value: 25, color: '#FACC15' }, // Yellow
  { name: 'Batteries', value: 10, color: '#3B82F6' }, // Blue
];

const monthlyComparison = [
  { name: 'Jan', thisYear: 32000, lastYear: 35000 },
  { name: 'Fév', thisYear: 30000, lastYear: 34000 },
  { name: 'Mar', thisYear: 31000, lastYear: 33000 },
  { name: 'Avr', thisYear: 29000, lastYear: 32000 },
  { name: 'Mai', thisYear: 28000, lastYear: 31000 },
  { name: 'Jun', thisYear: 32000, lastYear: 34000 },
  { name: 'Jul', thisYear: 34000, lastYear: 36000 },
  { name: 'Aoû', thisYear: 36000, lastYear: 38000 },
  { name: 'Sep', thisYear: 32000, lastYear: 34000 },
  { name: 'Oct', thisYear: 30000, lastYear: 33000 },
  { name: 'Nov', thisYear: 31000, lastYear: 34000 },
  { name: 'Déc', thisYear: 33000, lastYear: 36000 },
];

// Updated to match the rooms in the system
const energyByArea = [
  { 
    icon: <Thermometer size={20} />, 
    name: 'Chauffage', 
    consumption: 3500, 
    percentage: 35, 
    trend: -5, 
    color: '#F97316',
    active: true
  },
  { 
    icon: <Fan size={20} />, 
    name: 'Climatisation', 
    consumption: 2800, 
    percentage: 28, 
    trend: -3, 
    color: '#0EA5E9',
    active: true
  },
  { 
    icon: <Lightbulb size={20} />, 
    name: 'Éclairage', 
    consumption: 1500, 
    percentage: 15, 
    trend: -12, 
    color: '#FACC15',
    active: true
  },
  { 
    icon: <PanelTop size={20} />, 
    name: 'Stores automatiques', 
    consumption: 800, 
    percentage: 8, 
    trend: -2, 
    color: '#8B5CF6',
    active: true
  },
  { 
    icon: <Droplets size={20} />, 
    name: 'Irrigation', 
    consumption: 1000, 
    percentage: 10, 
    trend: 3, 
    color: '#10B981',
    active: true
  },
  { 
    icon: <Home size={20} />, 
    name: 'Autres', 
    consumption: 400, 
    percentage: 4, 
    trend: -1, 
    color: '#94A3B8',
    active: true
  },
];

// Room-based energy consumption
const roomEnergyUsage = [
  { name: 'Chambre n°1', value: 22, color: '#8B5CF6' }, // Purple
  { name: 'Chambre n°2', value: 18, color: '#6366F1' }, // Indigo
  { name: 'Salon', value: 35, color: '#EC4899' }, // Pink
  { name: 'Couloir', value: 8, color: '#14B8A6' }, // Teal
  { name: 'Jardin', value: 17, color: '#22C55E' }, // Green
];

const EnergyPage = () => {
  const [activeDevices, setActiveDevices] = useState(
    energyByArea.reduce((acc, device) => ({ ...acc, [device.name]: device.active }), {})
  );
  
  const [deviceValues, setDeviceValues] = useState({
    'Chauffage': 22,
    'Climatisation': 24,
    'Éclairage': 80,
    'Stores automatiques': 75,
    'Irrigation': 50,
  });

  const handleDeviceToggle = (deviceName) => {
    setActiveDevices(prev => ({
      ...prev,
      [deviceName]: !prev[deviceName]
    }));
  };

  const handleDeviceValueChange = (deviceName, value) => {
    setDeviceValues(prev => ({
      ...prev,
      [deviceName]: value[0]
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader title="Gestion de l'énergie" />
      <div className="flex-1 p-4 space-y-6">
        {/* Energy consumption chart (reused from dashboard) */}
        <EnergyConsumptionChart />
        
        {/* Room-based energy distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Consommation par pièce</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={roomEnergyUsage}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {roomEnergyUsage.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Pourcentage']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Économies énergétiques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Objectif mensuel</span>
                    <span className="text-sm">65% atteint</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Réduction vs. année précédente</span>
                    <span className="text-sm">42% atteint</span>
                  </div>
                  <Progress value={42} className="h-2" />
                </div>
                
                <div className="pt-4">
                  <h3 className="font-medium mb-2">Performances</h3>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-sm text-muted-foreground">Économies totales</span>
                      <span className="font-medium">25,400 kWh</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-sm text-muted-foreground">Économies financières</span>
                      <span className="font-medium">4,320 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Production solaire aujourd'hui</span>
                      <span className="font-medium">45 kWh</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Energy distribution and sources */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Distribution par équipement</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="chart">
                <TabsList className="mb-4">
                  <TabsTrigger value="chart">Graphique</TabsTrigger>
                  <TabsTrigger value="details">Contrôle manuel</TabsTrigger>
                </TabsList>
                
                <TabsContent value="chart">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={energyDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={100}
                          fill="#8884d8"
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {energyDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Pourcentage']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>
                
                <TabsContent value="details">
                  <div className="space-y-6">
                    {energyByArea.slice(0, -1).map((item) => (
                      <div key={item.name} className="space-y-2 border-b pb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-full" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                              {item.icon}
                            </div>
                            <span className="font-medium">{item.name}</span>
                          </div>
                          <Switch 
                            checked={activeDevices[item.name]} 
                            onCheckedChange={() => handleDeviceToggle(item.name)}
                          />
                        </div>
                        
                        {activeDevices[item.name] && (
                          <div className="pl-9 space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">
                                {item.name === 'Chauffage' ? 'Température' : 
                                 item.name === 'Climatisation' ? 'Température' :
                                 item.name === 'Éclairage' ? 'Intensité' :
                                 item.name === 'Stores automatiques' ? 'Ouverture' :
                                 'Intensité'}
                              </span>
                              <span className="text-sm font-medium">
                                {item.name === 'Chauffage' || item.name === 'Climatisation' 
                                  ? `${deviceValues[item.name]}°C` 
                                  : `${deviceValues[item.name]}%`}
                              </span>
                            </div>
                            <Slider 
                              value={[deviceValues[item.name]]} 
                              min={item.name === 'Chauffage' ? 15 : item.name === 'Climatisation' ? 18 : 0}
                              max={item.name === 'Chauffage' ? 30 : item.name === 'Climatisation' ? 30 : 100}
                              step={item.name === 'Chauffage' || item.name === 'Climatisation' ? 0.5 : 1}
                              onValueChange={(value) => handleDeviceValueChange(item.name, value)}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>
                                {item.name === 'Chauffage' ? '15°C' : 
                                 item.name === 'Climatisation' ? '18°C' :
                                 '0%'}
                              </span>
                              <span>
                                {item.name === 'Chauffage' ? '30°C' : 
                                 item.name === 'Climatisation' ? '30°C' :
                                 '100%'}
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-muted-foreground">Consommation actuelle:</span>
                              <span className="font-medium">{item.consumption} kWh</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                              <span className="text-muted-foreground">Tendance:</span>
                              <span className={`${item.trend < 0 ? 'text-green-500' : item.trend > 0 ? 'text-red-500' : 'text-gray-500'}`}>
                                {item.trend === 0 ? 'stable' : item.trend > 0 ? `+${item.trend}%` : `${item.trend}%`}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Sources d'énergie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={energySources}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {energySources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Pourcentage']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 space-y-2">
                <h3 className="font-medium mb-2">Production solaire</h3>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-md dark:bg-amber-950/30 dark:border-amber-800">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <SunMedium className="h-4 w-4 text-amber-500" />
                      <span className="text-sm font-medium">Production aujourd'hui</span>
                    </div>
                    <span className="text-sm">45 kWh</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-muted-foreground">Économie estimée</span>
                    <span className="text-sm">7.2 €</span>
                  </div>
                </div>
                
                <h3 className="font-medium mt-4 mb-2">État des batteries</h3>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-md dark:bg-blue-950/30 dark:border-blue-800">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Niveau de charge</span>
                      <span className="text-sm">72%</span>
                    </div>
                    <Progress value={72} className="h-2 bg-blue-100 dark:bg-blue-900" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Autonomie: ~5.4 heures</span>
                      <span>Dernière charge: 2h30</span>
                    </div>
                  </div>
                </div>
                
                <h3 className="font-medium mt-4 mb-2">Alertes système</h3>
                <div className="p-3 bg-red-50 border border-red-200 rounded-md dark:bg-red-950/30 dark:border-red-800">
                  <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                    <BadgeAlert className="h-4 w-4" />
                    <span className="text-sm font-medium">2 alertes actives</span>
                  </div>
                  <ul className="mt-2 text-xs space-y-1 text-muted-foreground">
                    <li>Vanne d'irrigation chambre n°1 - Maintenance requise</li>
                    <li>Vanne de chauffage salon - Pression irrégulière</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Monthly comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Comparatif mensuel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyComparison}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} kWh`]}
                    labelFormatter={(label) => `Mois: ${label}`}
                  />
                  <Legend />
                  <Bar name="Cette année" dataKey="thisYear" fill="#3B82F6" />
                  <Bar name="Année dernière" dataKey="lastYear" fill="#93C5FD" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EnergyPage;
