
import React from 'react';
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
import { Lightbulb, Thermometer, Server, Coffee, Fan, Monitor } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const energyDistribution = [
  { name: 'HVAC', value: 45, color: '#43A047' },
  { name: 'Éclairage', value: 20, color: '#FFC107' },
  { name: 'Appareils électroniques', value: 15, color: '#5E35B1' },
  { name: 'Serveurs', value: 12, color: '#1E88E5' },
  { name: 'Ascenseurs', value: 5, color: '#E53935' },
  { name: 'Autres', value: 3, color: '#607D8B' },
];

const energySources = [
  { name: 'Réseau électrique', value: 65, color: '#F44336' },
  { name: 'Panneaux solaires', value: 25, color: '#FFC107' },
  { name: 'Batteries', value: 10, color: '#2196F3' },
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

const energyByArea = [
  { 
    icon: <Thermometer size={20} />, 
    name: 'HVAC', 
    consumption: 4500, 
    percentage: 45, 
    trend: -5, 
    color: '#43A047'
  },
  { 
    icon: <Lightbulb size={20} />, 
    name: 'Éclairage', 
    consumption: 2000, 
    percentage: 20, 
    trend: -12, 
    color: '#FFC107'
  },
  { 
    icon: <Server size={20} />, 
    name: 'Serveurs', 
    consumption: 1200, 
    percentage: 12, 
    trend: 3, 
    color: '#1E88E5'
  },
  { 
    icon: <Monitor size={20} />, 
    name: 'Appareils électroniques', 
    consumption: 1500, 
    percentage: 15, 
    trend: -8, 
    color: '#5E35B1'
  },
  { 
    icon: <Coffee size={20} />, 
    name: 'Cuisine/Cafétéria', 
    consumption: 500, 
    percentage: 5, 
    trend: 0, 
    color: '#E53935'
  },
  { 
    icon: <Fan size={20} />, 
    name: 'Autres', 
    consumption: 300, 
    percentage: 3, 
    trend: -2, 
    color: '#607D8B'
  },
];

const EnergyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader title="Gestion de l'énergie" />
      <div className="flex-1 p-4 space-y-6">
        {/* Energy consumption chart (reused from dashboard) */}
        <EnergyConsumptionChart />
        
        {/* Energy distribution visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
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
                    <Bar name="Cette année" dataKey="thisYear" fill="#1E88E5" />
                    <Bar name="Année dernière" dataKey="lastYear" fill="#90CAF9" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Objectifs d'économie</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Réduction mensuelle</span>
                    <span className="text-sm">65% de l'objectif</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Économies annuelles</span>
                    <span className="text-sm">42% de l'objectif</span>
                  </div>
                  <Progress value={42} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Heures creuses</span>
                    <span className="text-sm">78% de l'objectif</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                
                <div className="pt-4">
                  <h3 className="font-medium mb-2">Statistiques</h3>
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
                      <span className="text-sm text-muted-foreground">Réduction CO2</span>
                      <span className="font-medium">12.7 tonnes</span>
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
              <CardTitle>Distribution énergétique</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="chart">
                <TabsList className="mb-4">
                  <TabsTrigger value="chart">Graphique</TabsTrigger>
                  <TabsTrigger value="details">Détails</TabsTrigger>
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
                  <div className="space-y-4">
                    {energyByArea.map((item) => (
                      <div key={item.name} className="flex items-center space-x-3">
                        <div className="p-2 rounded-full" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium">{item.name}</span>
                            <span className="text-sm">{item.consumption} kWh</span>
                          </div>
                          <div className="flex items-center">
                            <div className="flex-1 mr-3">
                              <Progress value={item.percentage} className="h-2" style={{ backgroundColor: `${item.color}30` }}>
                                <div className="h-full rounded-full" style={{ backgroundColor: item.color }}></div>
                              </Progress>
                            </div>
                            <span className={`text-xs ${item.trend < 0 ? 'text-green-500' : item.trend > 0 ? 'text-red-500' : 'text-gray-500'}`}>
                              {item.trend === 0 ? 'stable' : item.trend > 0 ? `+${item.trend}%` : `${item.trend}%`}
                            </span>
                          </div>
                        </div>
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
                    <span className="text-sm font-medium">Production aujourd'hui</span>
                    <span className="text-sm">45 kWh</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm font-medium">Économie estimée</span>
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
                    <Progress value={72} className="h-2 bg-blue-100 dark:bg-blue-900">
                      <div className="h-full bg-blue-500"></div>
                    </Progress>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Autonomie: ~5.4 heures</span>
                      <span>Dernière charge: 2h30 ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EnergyPage;
