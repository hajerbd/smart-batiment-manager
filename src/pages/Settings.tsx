
import React from 'react';
import { User } from 'lucide-react';
import { ProfileCard } from '@/components/settings/ProfileCard';
import { PreferencesCard } from '@/components/settings/PreferencesCard';

const Settings = () => {
  return (
    <div className="container max-w-2xl mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <User className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-bold">Paramètres</h1>
      </div>
      
      <div className="space-y-6">
        <ProfileCard />
        <PreferencesCard />
      </div>
    </div>
  );
};

export default Settings;
