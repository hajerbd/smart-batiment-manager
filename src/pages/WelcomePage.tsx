import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Shield, 
  Zap, 
  RefreshCw, 
  ChevronRight,
  ThermometerSun,
  ArrowRight
} from 'lucide-react';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600/90 via-blue-500/80 to-violet-700/90 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558002038-1055907df827')] bg-cover bg-center opacity-20 z-0"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in">
              Bienvenue sur VitaSmart
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              La plateforme intelligente pour gérer votre maison connectée en toute simplicité.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/dashboard')}
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg transform transition-transform hover:scale-105"
              >
                Accéder au tableau de bord
                <ChevronRight className="ml-2" size={18} />
              </Button>
              <Button 
                onClick={() => navigate('/alerts')}
                size="lg" 
                className="bg-blue-700 hover:bg-blue-800 text-white shadow-lg transform transition-transform hover:scale-105"
              >
                Voir les alertes
                <Shield className="ml-2" size={18} />
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/10 to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
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
      <section className="py-16 bg-gray-50 dark:bg-slate-800">
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
      <section className="py-16 bg-gradient-to-r from-violet-600 via-blue-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Prêt à commencer ?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Découvrez dès maintenant comment VitaSmart peut transformer votre expérience de maison connectée.
          </p>
          <Button 
            onClick={() => navigate('/dashboard')}
            size="lg" 
            className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg transform transition-transform hover:scale-105"
          >
            Accéder au tableau de bord
            <ArrowRight className="ml-2" size={18} />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">VitaSmart</h3>
              <p className="text-gray-300">La maison intelligente à votre service</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
              <ul className="space-y-2">
                <li><button onClick={() => navigate('/dashboard')} className="text-gray-300 hover:text-white">Tableau de bord</button></li>
                <li><button onClick={() => navigate('/alerts')} className="text-gray-300 hover:text-white">Alertes</button></li>
                <li><button onClick={() => navigate('/energy')} className="text-gray-300 hover:text-white">Énergie</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white">Centre d'aide</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Documentation</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} VitaSmart. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Components
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg transition-all hover:shadow-xl hover:translate-y-[-5px] flex flex-col items-center text-center">
    <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-full">{icon}</div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-slate-600 dark:text-slate-300">{description}</p>
  </div>
);

const StepCard = ({ number, title, description, icon }: { number: string, title: string, description: string, icon: React.ReactNode }) => (
  <div className="flex flex-col items-center">
    <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl mb-4 shadow-md">
      {number}
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-slate-600 dark:text-slate-300 text-center mb-4">{description}</p>
    <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full shadow-sm">
      {icon}
    </div>
  </div>
);

export default WelcomePage;
