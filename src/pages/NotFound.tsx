
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <FileQuestion className="h-10 w-10 text-blue-500 dark:text-blue-400" />
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-2 text-gray-800 dark:text-gray-100">404</h1>
        <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Page non trouvée</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate('/')} 
            className="flex items-center justify-center gap-2"
            variant="default"
          >
            <Home size={16} />
            Retour à l'accueil
          </Button>
          
          <Button 
            onClick={() => navigate(-1)} 
            className="flex items-center justify-center gap-2"
            variant="outline"
          >
            <ArrowLeft size={16} />
            Page précédente
          </Button>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Vous cherchiez peut-être :
          </p>
          <div className="flex flex-col gap-2">
            <Button 
              variant="link" 
              onClick={() => navigate('/dashboard')} 
              className="text-blue-500 dark:text-blue-400"
            >
              Tableau de bord
            </Button>
            <Button 
              variant="link" 
              onClick={() => navigate('/alerts')} 
              className="text-blue-500 dark:text-blue-400"
            >
              Alertes du système
            </Button>
            <Button 
              variant="link" 
              onClick={() => navigate('/energy')} 
              className="text-blue-500 dark:text-blue-400"
            >
              Gestion de l'énergie
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
