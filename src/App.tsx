
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ChatbotPage from "./pages/ChatbotPage";
import PomodoroPage from "./pages/PomodoroPage";
import FlashcardsPage from "./pages/FlashcardsPage";
import TasksPage from "./pages/TasksPage";
import MotivationPage from "./pages/MotivationPage";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/pomodoro" element={<PomodoroPage />} />
          <Route path="/flashcards" element={<FlashcardsPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/motivation" element={<MotivationPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
