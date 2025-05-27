
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { toast } from "@/hooks/use-toast";
import {
  User,
  UserCog,
  MoreHorizontal,
  Trash2,
  Edit,
  Lock,
  Unlock,
  UserPlus,
  Mail,
  Search
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Types
interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  lastLogin?: string;
}

const UserManagement = () => {
  // État pour stocker les utilisateurs
  const [users, setUsers] = useState<UserData[]>([
    {
      id: '1',
      name: 'Admin Principal',
      email: 'admin@maison.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2025-05-01 14:30'
    },
    {
      id: '2',
      name: 'Jean Dupont',
      email: 'jean@exemple.com',
      role: 'user',
      status: 'active',
      lastLogin: '2025-04-30 09:15'
    },
    {
      id: '3',
      name: 'Marie Martin',
      email: 'marie@exemple.com',
      role: 'user',
      status: 'inactive'
    },
    {
      id: '4',
      name: 'Paul Bernard',
      email: 'paul@exemple.com',
      role: 'user',
      status: 'active',
      lastLogin: '2025-04-29 16:45'
    }
  ]);

  // État pour le formulaire de nouvel utilisateur
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'user' as 'admin' | 'user',
  });

  // État pour la recherche d'utilisateurs
  const [searchQuery, setSearchQuery] = useState('');

  // Fonction pour ajouter un nouvel utilisateur
  const addUser = () => {
    if (!newUser.name.trim() || !newUser.email.trim()) {
      toast({
        title: "Erreur",
        description: "Tous les champs sont obligatoires",
        variant: "destructive"
      });
      return;
    }

    // Validation basique de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newUser.email)) {
      toast({
        title: "Format d'email invalide",
        description: "Veuillez entrer une adresse email valide",
        variant: "destructive"
      });
      return;
    }

    // Vérifier si l'email existe déjà
    if (users.some(user => user.email === newUser.email)) {
      toast({
        title: "Email déjà utilisé",
        description: "Cette adresse email est déjà associée à un compte",
        variant: "destructive"
      });
      return;
    }

    const newId = (Math.max(...users.map(user => parseInt(user.id))) + 1).toString();
    
    setUsers([...users, {
      id: newId,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: 'active'
    }]);

    // Réinitialiser le formulaire
    setNewUser({
      name: '',
      email: '',
      role: 'user',
    });

    toast({
      title: "Utilisateur ajouté",
      description: `${newUser.name} a été ajouté avec succès`
    });
  };

  // Fonction pour supprimer un utilisateur
  const deleteUser = (id: string) => {
    // Vérifier s'il s'agit du dernier administrateur
    const isLastAdmin = id === '1' || 
      (users.find(user => user.id === id)?.role === 'admin' && 
       users.filter(user => user.role === 'admin').length === 1);

    if (isLastAdmin) {
      toast({
        title: "Action impossible",
        description: "Impossible de supprimer le dernier administrateur",
        variant: "destructive"
      });
      return;
    }

    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);

    toast({
      title: "Utilisateur supprimé",
      description: "L'utilisateur a été supprimé avec succès"
    });
  };

  // Fonction pour changer le statut d'un utilisateur
  const toggleUserStatus = (id: string) => {
    // Empêcher la désactivation du compte admin principal
    if (id === '1') {
      toast({
        title: "Action impossible",
        description: "Impossible de désactiver le compte administrateur principal",
        variant: "destructive"
      });
      return;
    }

    setUsers(users.map(user => 
      user.id === id ? { 
        ...user, 
        status: user.status === 'active' ? 'inactive' : 'active' 
      } : user
    ));

    const targetUser = users.find(user => user.id === id);
    const newStatus = targetUser?.status === 'active' ? 'désactivé' : 'activé';

    toast({
      title: `Utilisateur ${newStatus}`,
      description: `Le compte de ${targetUser?.name} a été ${newStatus}`
    });
  };

  // Fonction pour changer le rôle d'un utilisateur
  const changeUserRole = (id: string, newRole: 'admin' | 'user') => {
    // Empêcher le changement du rôle de l'admin principal
    if (id === '1' && newRole !== 'admin') {
      toast({
        title: "Action impossible",
        description: "Impossible de modifier le rôle de l'administrateur principal",
        variant: "destructive"
      });
      return;
    }

    setUsers(users.map(user => 
      user.id === id ? { ...user, role: newRole } : user
    ));

    const targetUser = users.find(user => user.id === id);

    toast({
      title: "Rôle modifié",
      description: `${targetUser?.name} est maintenant ${newRole === 'admin' ? 'administrateur' : 'utilisateur'}`
    });
  };

  // Filtrer les utilisateurs selon la recherche
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <UserCog className="w-8 h-8 text-blue-500" />
        <h1 className="text-3xl font-bold">Gestion des Utilisateurs</h1>
      </div>

      <div className="grid gap-6">
        {/* Carte pour ajouter un nouvel utilisateur */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Ajouter un nouvel utilisateur
            </CardTitle>
            <CardDescription>
              Créer un nouveau compte utilisateur pour accéder au système de gestion de la maison
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    placeholder="Nom de l'utilisateur"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Adresse email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@exemple.com"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="role-user"
                    name="role"
                    checked={newUser.role === 'user'}
                    onChange={() => setNewUser({ ...newUser, role: 'user' })}
                    className="rounded-full"
                  />
                  <Label htmlFor="role-user">Utilisateur</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="role-admin"
                    name="role"
                    checked={newUser.role === 'admin'}
                    onChange={() => setNewUser({ ...newUser, role: 'admin' })}
                    className="rounded-full"
                  />
                  <Label htmlFor="role-admin">Administrateur</Label>
                </div>
              </div>
              
              <Button onClick={addUser} className="w-full md:w-auto">
                <UserPlus className="mr-2 h-4 w-4" />
                Ajouter l'utilisateur
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Carte pour la liste des utilisateurs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Utilisateurs du système
            </CardTitle>
            <CardDescription>
              Gérer les comptes des utilisateurs ayant accès au système
            </CardDescription>
            <div className="flex w-full max-w-sm items-center space-x-2 mt-2">
              <Input
                placeholder="Rechercher un utilisateur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" variant="ghost">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Dernière connexion</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                            {user.email}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.role === 'admin' ? "destructive" : "default"}>
                            {user.role === 'admin' ? 'Admin' : 'Utilisateur'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === 'active' ? "outline" : "secondary"}>
                            {user.status === 'active' ? 'Actif' : 'Inactif'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {user.lastLogin || 'Jamais connecté'}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem 
                                onClick={() => toggleUserStatus(user.id)}
                                className="flex items-center gap-2"
                              >
                                {user.status === 'active' ? (
                                  <>
                                    <Lock className="h-4 w-4" />
                                    <span>Désactiver</span>
                                  </>
                                ) : (
                                  <>
                                    <Unlock className="h-4 w-4" />
                                    <span>Activer</span>
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <Dialog>
                                <DialogTrigger asChild>
                                  <DropdownMenuItem 
                                    onSelect={(e) => e.preventDefault()}
                                    className="flex items-center gap-2"
                                  >
                                    <Edit className="h-4 w-4" /> Changer le rôle
                                  </DropdownMenuItem>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Changer le rôle de {user.name}</DialogTitle>
                                    <DialogDescription>
                                      Sélectionnez le nouveau rôle pour cet utilisateur
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="py-4 flex flex-col gap-4">
                                    <div className="flex items-center space-x-2">
                                      <input 
                                        type="radio" 
                                        id={`role-user-${user.id}`}
                                        checked={user.role === 'user'}
                                        onChange={() => {}}
                                        className="h-4 w-4 rounded-full"
                                      />
                                      <Label htmlFor={`role-user-${user.id}`}>Utilisateur standard</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <input 
                                        type="radio" 
                                        id={`role-admin-${user.id}`}
                                        checked={user.role === 'admin'}
                                        onChange={() => {}}
                                        className="h-4 w-4 rounded-full"
                                      />
                                      <Label htmlFor={`role-admin-${user.id}`}>Administrateur</Label>
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <DialogClose asChild>
                                      <Button variant="outline">Annuler</Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                      <Button 
                                        onClick={() => changeUserRole(user.id, user.role === 'admin' ? 'user' : 'admin')}
                                      >
                                        Confirmer
                                      </Button>
                                    </DialogClose>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              <DropdownMenuSeparator />
                              <Dialog>
                                <DialogTrigger asChild>
                                  <DropdownMenuItem 
                                    className="text-destructive flex items-center gap-2"
                                    onSelect={(e) => e.preventDefault()}
                                  >
                                    <Trash2 className="h-4 w-4" /> Supprimer
                                  </DropdownMenuItem>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Confirmer la suppression</DialogTitle>
                                    <DialogDescription>
                                      Êtes-vous sûr de vouloir supprimer l'utilisateur {user.name} ?
                                      Cette action est irréversible.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <DialogFooter>
                                    <DialogClose asChild>
                                      <Button variant="outline">Annuler</Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                      <Button 
                                        variant="destructive"
                                        onClick={() => deleteUser(user.id)}
                                      >
                                        Supprimer
                                      </Button>
                                    </DialogClose>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-4">
                        Aucun utilisateur trouvé
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserManagement;
