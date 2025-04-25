
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, UserRound, Mail, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProfileFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export function ProfileCard() {
  const { toast } = useToast();
  const [formData, setFormData] = React.useState<ProfileFormData>({
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    phone: '+33 6 12 34 56 78',
    address: '123 Rue de la République, Paris'
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
    <Card className="shadow-lg transition-all hover:shadow-xl">
      <CardHeader className="pb-4 space-y-1">
        <div className="flex items-center space-x-2">
          <UserRound className="h-6 w-6 text-blue-500" />
          <CardTitle>Profil Personnel</CardTitle>
        </div>
        <CardDescription>
          Gérez vos informations personnelles et coordonnées
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Nom complet</Label>
          <div className="relative">
            <Input 
              id="name" 
              value={formData.name} 
              onChange={handleInputChange}
              className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            />
            <UserRound className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Input 
              id="email" 
              type="email" 
              value={formData.email} 
              onChange={handleInputChange}
              className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            />
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone</Label>
          <div className="relative">
            <Input 
              id="phone" 
              type="tel" 
              value={formData.phone} 
              onChange={handleInputChange}
              className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            />
            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSaveProfile}
          className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700 transition-all duration-300"
        >
          <Save className="mr-2 h-4 w-4" />
          Sauvegarder les modifications
        </Button>
      </CardFooter>
    </Card>
  );
}
