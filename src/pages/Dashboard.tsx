
import React, { useState } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import HouseView from '@/components/HouseView';
import RoomDeviceControl from '@/components/RoomDeviceControl';
import { ScrollArea } from '@/components/ui/scroll-area';

const Dashboard = () => {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <DashboardHeader title="Tableau de bord VitaSmart" />
      <div className="flex-1 overflow-hidden">
        {selectedRoomId ? (
          <ScrollArea className="h-full w-full">
            <RoomDeviceControl 
              roomId={selectedRoomId} 
              onBack={() => setSelectedRoomId(null)} 
            />
          </ScrollArea>
        ) : (
          <div className="h-full w-full">
            <HouseView onSelectRoom={setSelectedRoomId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
