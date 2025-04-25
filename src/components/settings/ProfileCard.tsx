
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProfileFormData {
  name: string;
  email: string;
}

export function ProfileCard() {
  const { toast } = useToast();
  const [formData, setFormData] = React.useState<ProfileFormData>({
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été enregistrées avec succès.",
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle>Profil</CardTitle>
        <CardDescription>
          Gérez vos informations personnelles
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nom complet</Label>
          <Input 
            id="name" 
            value={formData.name} 
            onChange={handleInputChange}
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            type="email" 
            value={formData.email} 
            onChange={handleInputChange}
            className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSaveProfile}
          className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 transition-colors"
        >
          <Save className="mr-2 h-4 w-4" />
          Sauvegarder
        </Button>
      </CardFooter>
    </Card>
  );
}
