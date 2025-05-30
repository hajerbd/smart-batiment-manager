
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
  SignalLow,
  SignalMedium
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConnectionIconProps {
  type: 'wifi' | 'bluetooth' | 'network' | 'signal';
  status: 'connected' | 'disconnected' | 'weak' | 'high' | 'medium' | 'low';
  className?: string;
  size?: number;
}

const ConnectionIcon: React.FC<ConnectionIconProps> = ({
  type,
  status,
  className,
  size = 16
}) => {
  const getIcon = () => {
    switch (type) {
      case 'wifi':
        switch (status) {
          case 'connected':
            return <Wifi size={size} className={cn("text-green-500", className)} />;
          case 'weak':
            return <Signal size={size} className={cn("text-yellow-500", className)} />;
          case 'disconnected':
            return <WifiOff size={size} className={cn("text-red-500", className)} />;
          default:
            return <WifiOff size={size} className={cn("text-gray-400", className)} />;
        }
        
      case 'bluetooth':
        return status === 'connected' 
          ? <Bluetooth size={size} className={cn("text-blue-500", className)} />
          : <BluetoothOff size={size} className={cn("text-gray-400", className)} />;
          
      case 'network':
        return status === 'connected'
          ? <Link size={size} className={cn("text-green-500", className)} />
          : <Link2Off size={size} className={cn("text-red-500", className)} />;
          
      case 'signal':
        switch (status) {
          case 'high':
            return <SignalHigh size={size} className={cn("text-green-500", className)} />;
          case 'medium':
            return <SignalMedium size={size} className={cn("text-yellow-500", className)} />;
          case 'low':
            return <SignalLow size={size} className={cn("text-red-500", className)} />;
          default:
            return <Signal size={size} className={cn("text-gray-400", className)} />;
        }
        
      default:
        return null;
    }
  };

  return getIcon();
};

export default ConnectionIcon;
