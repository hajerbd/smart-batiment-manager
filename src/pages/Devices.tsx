
import React from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import RoomControl from '@/components/RoomControl';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DevicesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader title="Gestion des pièces" />
      <div className="flex-1 p-4 space-y-6">
        <Tabs defaultValue="control">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="control">Contrôle</TabsTrigger>
              <TabsTrigger value="map">Plan</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="control">
            <RoomControl />
          </TabsContent>
          
          <TabsContent value="map">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center rounded-md border border-dashed p-8 h-[500px]">
                  <div className="text-center">
                    <p className="text-muted-foreground">Le plan interactif de la maison sera disponible prochainement.</p>
                    <Button variant="outline" className="mt-4">Prévisualiser la démo</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DevicesPage;
