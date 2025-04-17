
import React from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import AlertsPanel from '@/components/AlertsPanel';

const Alerts = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <DashboardHeader title="Alertes du système" />
      <div className="flex-1 overflow-auto p-3 md:p-4 lg:p-6">
        <div className="max-w-5xl mx-auto">
          <AlertsPanel />
        </div>
      </div>
    </div>
  );
};

export default Alerts;
