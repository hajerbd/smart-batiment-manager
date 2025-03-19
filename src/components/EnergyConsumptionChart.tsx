
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for the energy consumption chart
const dailyData = [
  { time: '00:00', consumption: 130 },
  { time: '04:00', consumption: 100 },
  { time: '08:00', consumption: 180 },
  { time: '12:00', consumption: 220 },
  { time: '16:00', consumption: 210 },
  { time: '20:00', consumption: 175 },
  { time: '23:59', consumption: 140 },
];

const weeklyData = [
  { time: 'Lun', consumption: 1200 },
  { time: 'Mar', consumption: 1100 },
  { time: 'Mer', consumption: 1300 },
  { time: 'Jeu', consumption: 1400 },
  { time: 'Ven', consumption: 1800 },
  { time: 'Sam', consumption: 900 },
  { time: 'Dim', consumption: 700 },
];

const monthlyData = [
  { time: 'Jan', consumption: 30000 },
  { time: 'Fév', consumption: 28000 },
  { time: 'Mar', consumption: 29000 },
  { time: 'Avr', consumption: 26000 },
  { time: 'Mai', consumption: 25000 },
  { time: 'Juin', consumption: 32000 },
  { time: 'Juil', consumption: 35000 },
  { time: 'Aoû', consumption: 37000 },
  { time: 'Sep', consumption: 31000 },
  { time: 'Oct', consumption: 28000 },
  { time: 'Nov', consumption: 29000 },
  { time: 'Déc', consumption: 32000 },
];

const EnergyConsumptionChart = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Consommation d'énergie</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily">
          <TabsList className="mb-4">
            <TabsTrigger value="daily">Jour</TabsTrigger>
            <TabsTrigger value="weekly">Semaine</TabsTrigger>
            <TabsTrigger value="monthly">Mois</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={dailyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorConsumption" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1E88E5" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#1E88E5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} kWh`, 'Consommation']}
                    labelFormatter={(label) => `Temps: ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="consumption" 
                    stroke="#1E88E5" 
                    fillOpacity={1} 
                    fill="url(#colorConsumption)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="weekly">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={weeklyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorConsumptionWeekly" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1E88E5" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#1E88E5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} kWh`, 'Consommation']}
                    labelFormatter={(label) => `Jour: ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="consumption" 
                    stroke="#1E88E5" 
                    fillOpacity={1} 
                    fill="url(#colorConsumptionWeekly)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="monthly">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={monthlyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorConsumptionMonthly" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1E88E5" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#1E88E5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} kWh`, 'Consommation']}
                    labelFormatter={(label) => `Mois: ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="consumption" 
                    stroke="#1E88E5" 
                    fillOpacity={1} 
                    fill="url(#colorConsumptionMonthly)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="text-center p-2 border rounded-md border-border">
            <div className="text-sm font-medium text-muted-foreground">Aujourd'hui</div>
            <div className="text-2xl font-bold text-energy">220 kWh</div>
            <div className="text-xs text-green-500">↓ 5% vs hier</div>
          </div>
          <div className="text-center p-2 border rounded-md border-border">
            <div className="text-sm font-medium text-muted-foreground">Cette semaine</div>
            <div className="text-2xl font-bold text-energy">1200 kWh</div>
            <div className="text-xs text-red-500">↑ 3% vs sem. dernière</div>
          </div>
          <div className="text-center p-2 border rounded-md border-border">
            <div className="text-sm font-medium text-muted-foreground">Ce mois</div>
            <div className="text-2xl font-bold text-energy">31000 kWh</div>
            <div className="text-xs text-green-500">↓ 2% vs mois dernier</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnergyConsumptionChart;
