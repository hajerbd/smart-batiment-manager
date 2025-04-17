
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
                <Route path="/profile" element={<Profile />} />
                {/* Redirection pour les pages supprimées vers des pages existantes */}
                <Route path="/devices" element={<Navigate to="/dashboard" replace />} />
                {/* Redirection générique pour les sous-routes connues vers des pages existantes */}
                <Route path="/dashboard/*" element={<Navigate to="/dashboard" replace />} />
                <Route path="/alerts/*" element={<Navigate to="/alerts" replace />} />
                <Route path="/energy/*" element={<Navigate to="/energy" replace />} />
                {/* Page 404 pour toutes les autres routes */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
