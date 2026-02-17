import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { RamadanProvider } from "@/context/RamadanContext";
import Index from "./pages/Index";
import CalendarPage from "./pages/CalendarPage";
import DuasPage from "./pages/DuasPage";
import ChecklistPage from "./pages/ChecklistPage";
import ProgressPage from "./pages/ProgressPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import BottomTabBar from "./components/BottomTabBar";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="dark">
    <QueryClientProvider client={queryClient}>
      <RamadanProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="max-w-lg mx-auto min-h-screen relative">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/duas" element={<DuasPage />} />
                <Route path="/checklist" element={<ChecklistPage />} />
                <Route path="/progress" element={<ProgressPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <BottomTabBar />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </RamadanProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
