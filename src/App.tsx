import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";

// Используем ленивую загрузку для главной страницы
const Index = lazy(() => import("./pages/Index"));

// Компонент-заглушка для загрузки
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="mt-4 text-gray-600">Загрузка...</p>
    </div>
  </div>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 минут
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <Suspense fallback={<LoadingFallback />}>
                <Index />
              </Suspense>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
