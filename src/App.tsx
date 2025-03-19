
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Energy from "./pages/Energy";
import Devices from "./pages/Devices";
import Alerts from "./pages/Alerts";
import NotFound from "./pages/NotFound";
import Sidebar from "./components/Sidebar";
import Auth from "./pages/Auth";
import Rooms from "./pages/Rooms";
import Weather from "./pages/Weather";
import Maintenance from "./pages/Maintenance";
import { useState, useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!user);
  }, []);
  
  // Fonction pour la déconnexion (utilisée par Sidebar)
  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {isAuthenticated ? (
            <div className="min-h-screen flex w-full">
              <Sidebar onLogout={handleLogout} />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/energy" element={<Energy />} />
                  <Route path="/devices" element={<Devices />} />
                  <Route path="/alerts" element={<Alerts />} />
                  <Route path="/rooms" element={<Rooms />} />
                  <Route path="/weather" element={<Weather />} />
                  <Route path="/maintenance" element={<Maintenance />} />
                  <Route path="/login" element={<Navigate to="/" replace />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          ) : (
            <Routes>
              <Route path="/login" element={<Auth />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
