
import React from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import DeviceControl from '@/components/DeviceControl';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Search, Plus, Filter, ChevronDown, Lightbulb, Thermometer, Fan, Lock, Power, Wifi, PlugZap } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Device {
  id: string;
  name: string;
  type: string;
  status: 'online' | 'offline' | 'warning';
  room: string;
  lastUpdated: string;
  batteryLevel?: number;
}

const deviceTypes = [
  { value: 'light', label: 'Éclairage', icon: <Lightbulb className="h-4 w-4" /> },
  { value: 'hvac', label: 'HVAC', icon: <Thermometer className="h-4 w-4" /> },
  { value: 'fan', label: 'Ventilateur', icon: <Fan className="h-4 w-4" /> },
  { value: 'access', label: 'Contrôle d\'accès', icon: <Lock className="h-4 w-4" /> },
  { value: 'power', label: 'Énergie', icon: <Power className="h-4 w-4" /> },
  { value: 'network', label: 'Réseau', icon: <Wifi className="h-4 w-4" /> },
];

const mockDevices: Device[] = [
  { id: '1', name: 'Lumière entrée', type: 'light', status: 'online', room: 'Accueil', lastUpdated: '2 min ago', batteryLevel: 92 },
  { id: '2', name: 'Climatisation bureau', type: 'hvac', status: 'online', room: 'Bureau principal', lastUpdated: '5 min ago' },
  { id: '3', name: 'Ventilateur salle conf.', type: 'fan', status: 'offline', room: 'Salle de conférence', lastUpdated: '1h ago', batteryLevel: 15 },
  { id: '4', name: 'Porte principale', type: 'access', status: 'online', room: 'Entrée', lastUpdated: '30 min ago', batteryLevel: 78 },
  { id: '5', name: 'Prise intelligente', type: 'power', status: 'online', room: 'Salle serveur', lastUpdated: '12 min ago' },
  { id: '6', name: 'Router principal', type: 'network', status: 'warning', room: 'Local technique', lastUpdated: '15 min ago' },
  { id: '7', name: 'Alarme incendie', type: 'safety', status: 'online', room: 'Global', lastUpdated: '45 min ago', batteryLevel: 85 },
  { id: '8', name: 'Éclairage couloir', type: 'light', status: 'online', room: 'Couloir', lastUpdated: '1h ago' },
  { id: '9', name: 'Climatisation réunion', type: 'hvac', status: 'online', room: 'Salle réunion', lastUpdated: '3h ago' },
  { id: '10', name: 'Station recharge', type: 'power', status: 'online', room: 'Parking', lastUpdated: '4h ago' },
];

const getDeviceTypeIcon = (type: string) => {
  const deviceType = deviceTypes.find(t => t.value === type);
  if (deviceType) return deviceType.icon;
  return <PlugZap className="h-4 w-4" />;
};

const getDeviceStatusBadge = (status: 'online' | 'offline' | 'warning') => {
  switch (status) {
    case 'online':
      return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">En ligne</Badge>;
    case 'offline':
      return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800">Hors ligne</Badge>;
    case 'warning':
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800">Alerte</Badge>;
    default:
      return null;
  }
};

const getDeviceTypeName = (type: string) => {
  const deviceType = deviceTypes.find(t => t.value === type);
  if (deviceType) return deviceType.label;
  return 'Autre';
};

const DevicesPage = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterRoom, setFilterRoom] = React.useState<string | null>(null);
  const [filterType, setFilterType] = React.useState<string | null>(null);
  
  const filteredDevices = mockDevices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          device.room.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRoom = !filterRoom || device.room === filterRoom;
    const matchesType = !filterType || device.type === filterType;
    
    return matchesSearch && matchesRoom && matchesType;
  });
  
  const rooms = Array.from(new Set(mockDevices.map(device => device.room)));

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader title="Gestion des équipements" />
      <div className="flex-1 p-4 space-y-6">
        <Tabs defaultValue="list">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="list">Liste</TabsTrigger>
              <TabsTrigger value="map">Plan</TabsTrigger>
              <TabsTrigger value="control">Contrôle</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Rechercher un appareil" 
                  className="pl-8 w-full md:w-[250px]" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-10">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrer
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <div className="p-2">
                    <Label className="text-xs">Type d'appareil</Label>
                    <Select value={filterType || ''} onValueChange={(value) => setFilterType(value || null)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Tous les types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Tous les types</SelectItem>
                        {deviceTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center">
                              {type.icon}
                              <span className="ml-2">{type.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <DropdownMenuSeparator />
                  
                  <div className="p-2">
                    <Label className="text-xs">Pièce</Label>
                    <Select value={filterRoom || ''} onValueChange={(value) => setFilterRoom(value || null)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Toutes les pièces" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Toutes les pièces</SelectItem>
                        {rooms.map((room) => (
                          <SelectItem key={room} value={room}>{room}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            </div>
          </div>
          
          <TabsContent value="list">
            <Card>
              <CardHeader>
                <CardTitle>
                  Appareils
                  <Badge variant="outline" className="ml-2">
                    {filteredDevices.length} appareils
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 bg-muted/50 p-4 text-sm font-medium">
                    <div className="col-span-4 md:col-span-3">Appareil</div>
                    <div className="col-span-2 hidden md:block">Type</div>
                    <div className="col-span-3 md:col-span-2">Pièce</div>
                    <div className="col-span-3 md:col-span-2">Statut</div>
                    <div className="col-span-2 hidden md:block">Dernière MAJ</div>
                    <div className="col-span-2 md:col-span-1 text-right">Actions</div>
                  </div>
                  
                  <div className="divide-y">
                    {filteredDevices.map((device) => (
                      <div key={device.id} className="grid grid-cols-12 items-center p-4">
                        <div className="col-span-4 md:col-span-3 flex items-center space-x-3">
                          <div className={`p-1.5 rounded-full ${device.status === 'online' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : device.status === 'warning' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'}`}>
                            {getDeviceTypeIcon(device.type)}
                          </div>
                          <div>
                            <div className="font-medium">{device.name}</div>
                            {device.batteryLevel !== undefined && (
                              <div className="flex items-center text-xs text-muted-foreground">
                                <div className="relative w-4 h-2 border rounded mr-1">
                                  <div 
                                    className={`absolute left-0 top-0 bottom-0 rounded-sm ${device.batteryLevel > 20 ? 'bg-green-500' : 'bg-red-500'}`} 
                                    style={{ width: `${device.batteryLevel}%` }} 
                                  />
                                </div>
                                {device.batteryLevel}%
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="col-span-2 hidden md:block text-sm text-muted-foreground">
                          {getDeviceTypeName(device.type)}
                        </div>
                        
                        <div className="col-span-3 md:col-span-2 text-sm">
                          {device.room}
                        </div>
                        
                        <div className="col-span-3 md:col-span-2">
                          {getDeviceStatusBadge(device.status)}
                        </div>
                        
                        <div className="col-span-2 hidden md:block text-sm text-muted-foreground">
                          {device.lastUpdated}
                        </div>
                        
                        <div className="col-span-2 md:col-span-1 text-right">
                          <Switch checked={device.status === 'online'} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="map">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center rounded-md border border-dashed p-8 h-[500px]">
                  <div className="text-center">
                    <p className="text-muted-foreground">Le plan interactif du bâtiment sera disponible prochainement.</p>
                    <Button variant="outline" className="mt-4">Prévisualiser la démo</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="control">
            <DeviceControl />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DevicesPage;
