
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Shield, 
  Zap, 
  RefreshCw, 
  ChevronRight,
  ThermometerSun
} from 'lucide-react';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              Bienvenue sur VitaSmart
            </h1>
            <p className="text-lg md:text-xl mb-8">
              La plateforme intelligente pour gérer votre maison connectée en toute simplicité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/dashboard')}
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-100"
              >
                Accéder au tableau de bord
                <ChevronRight className="ml-2" size={18} />
              </Button>
              <Button 
                onClick={() => navigate('/alerts')}
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white/20"
              >
                Voir les alertes
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Fonctionnalités principales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Home className="h-10 w-10 text-blue-500" />}
              title="Gestion de la maison"
              description="Visualisez et contrôlez tous les espaces de votre maison connectée en un coup d'œil."
            />
            <FeatureCard 
              icon={<Shield className="h-10 w-10 text-green-500" />}
              title="Surveillance des alertes"
              description="Soyez informé en temps réel des événements importants et des anomalies détectées."
            />
            <FeatureCard 
              icon={<Zap className="h-10 w-10 text-yellow-500" />}
              title="Gestion de l'énergie"
              description="Optimisez votre consommation d'énergie et réduisez vos factures."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Comment ça fonctionne
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <StepCard 
              number="1"
              title="Connectez vos appareils"
              description="Intégrez facilement tous vos appareils intelligents à la plateforme."
              icon={<RefreshCw className="h-6 w-6" />}
            />
            <StepCard 
              number="2"
              title="Configurez vos préférences"
              description="Personnalisez les paramètres selon vos besoins et habitudes."
              icon={<ThermometerSun className="h-6 w-6" />}
            />
            <StepCard 
              number="3"
              title="Profitez de l'automatisation"
              description="Laissez le système gérer intelligemment votre maison."
              icon={<Zap className="h-6 w-6" />}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Prêt à commencer ?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Découvrez dès maintenant comment VitaSmart peut transformer votre expérience de maison connectée.
          </p>
          <Button 
            onClick={() => navigate('/dashboard')}
            size="lg" 
            className="bg-white text-blue-600 hover:bg-blue-100"
          >
            Accéder au tableau de bord
          </Button>
        </div>
      </section>
    </div>
  );
};

// Components
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md transition-transform hover:scale-[1.02] flex flex-col items-center text-center">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-slate-600 dark:text-slate-300">{description}</p>
  </div>
);

const StepCard = ({ number, title, description, icon }: { number: string, title: string, description: string, icon: React.ReactNode }) => (
  <div className="flex flex-col items-center">
    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl mb-4">
      {number}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-slate-600 dark:text-slate-300 text-center mb-4">{description}</p>
    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
      {icon}
    </div>
  </div>
);

export default WelcomePage;
