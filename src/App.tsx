
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";
import Energy from "./pages/Energy";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex w-full">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/energy" element={<Energy />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
                
                {/* Redirections pour les pages supprimées ou sous-routes */}
                <Route path="/devices" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard/*" element={<Navigate to="/dashboard" replace />} />
                <Route path="/alerts/*" element={<Navigate to="/alerts" replace />} />
                <Route path="/energy/*" element={<Navigate to="/energy" replace />} />
                <Route path="/settings/*" element={<Navigate to="/settings" replace />} />
                
                {/* Redirection 404 vers la page d'accueil */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
