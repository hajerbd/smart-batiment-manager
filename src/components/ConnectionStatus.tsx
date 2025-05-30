
import React from 'react';
import { 
  Wifi, 
  WifiOff, 
  Bluetooth, 
  BluetoothOff, 
  Link, 
  Link2Off,
  Signal,
  SignalHigh,
  SignalLow
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ConnectionStatusProps {
  wifiStatus: 'connected' | 'disconnected' | 'weak';
  bluetoothStatus: 'connected' | 'disconnected';
  networkStatus: 'connected' | 'disconnected';
  signalStrength?: 'high' | 'medium' | 'low';
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  wifiStatus,
  bluetoothStatus, 
  networkStatus,
  signalStrength = 'high'
}) => {
  const getWifiIcon = () => {
    switch (wifiStatus) {
      case 'connected':
        return <Wifi className="h-4 w-4 text-green-500" />;
      case 'weak':
        return <Signal className="h-4 w-4 text-yellow-500" />;
      case 'disconnected':
        return <WifiOff className="h-4 w-4 text-red-500" />;
      default:
        return <WifiOff className="h-4 w-4 text-gray-400" />;
    }
  };

  const getBluetoothIcon = () => {
    return bluetoothStatus === 'connected' 
      ? <Bluetooth className="h-4 w-4 text-blue-500" />
      : <BluetoothOff className="h-4 w-4 text-gray-400" />;
  };

  const getNetworkIcon = () => {
    return networkStatus === 'connected'
      ? <Link className="h-4 w-4 text-green-500" />
      : <Link2Off className="h-4 w-4 text-red-500" />;
  };

  const getSignalIcon = () => {
    switch (signalStrength) {
      case 'high':
        return <SignalHigh className="h-4 w-4 text-green-500" />;
      case 'medium':
        return <Signal className="h-4 w-4 text-yellow-500" />;
      case 'low':
        return <SignalLow className="h-4 w-4 text-red-500" />;
      default:
        return <Signal className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-1">
            {getWifiIcon()}
            <Badge variant={wifiStatus === 'connected' ? 'default' : 'secondary'} className="text-xs">
              WiFi
            </Badge>
          </div>
          
          <div className="flex items-center space-x-1">
            {getBluetoothIcon()}
            <Badge variant={bluetoothStatus === 'connected' ? 'default' : 'secondary'} className="text-xs">
              Bluetooth
            </Badge>
          </div>
          
          <div className="flex items-center space-x-1">
            {getNetworkIcon()}
            <Badge variant={networkStatus === 'connected' ? 'default' : 'secondary'} className="text-xs">
              Réseau
            </Badge>
          </div>
          
          <div className="flex items-center space-x-1">
            {getSignalIcon()}
            <Badge variant="outline" className="text-xs">
              Signal
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectionStatus;
