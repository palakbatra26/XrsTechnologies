import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { ThemeProvider } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import ProductNew from "./pages/admin/ProductNew";
import ProductEdit from "./pages/admin/ProductEdit";
import AdminCategories from "./pages/admin/Categories";
import AdminOrders from "./pages/admin/Orders";
import AdminCoupons from "./pages/admin/Coupons";
import AdminInventory from "./pages/admin/Inventory";
import { AdminLayout } from "./components/admin/AdminLayout";
import { AdminGuard } from "./components/admin/AdminGuard";
import Verify from "./pages/Verify";

// Import your publishable key
const PUBLISHABLE_KEY =
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ||
  import.meta.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  "pk_test_c2V0LW1vbmFyY2gtMTYuY2xlcmsuYWNjb3VudHMuZGV2JA";

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const queryClient = new QueryClient();

// Page transition component
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const [hasReducedMotion, setHasReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setHasReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setHasReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: hasReducedMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: hasReducedMotion ? 0 : -20 }}
      transition={{ 
        duration: hasReducedMotion ? 0 : 0.3, 
        ease: "easeInOut" 
      }}
    >
      {children}
    </motion.div>
  );
};

// AppRoutes component to use useLocation hook
const AppRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/verify" element={<PageTransition><Verify /></PageTransition>} />
        <Route path="/admin/login" element={<PageTransition><AdminLogin /></PageTransition>} />
        <Route
          path="/admin"
          element={
            <AdminGuard>
              <AdminLayout />
            </AdminGuard>
          }
        >
          <Route index element={<PageTransition><AdminDashboard /></PageTransition>} />
          <Route path="products" element={<PageTransition><AdminProducts /></PageTransition>} />
          <Route path="products/new" element={<PageTransition><ProductNew /></PageTransition>} />
          <Route path="products/:id/edit" element={<PageTransition><ProductEdit /></PageTransition>} />
          <Route path="categories" element={<PageTransition><AdminCategories /></PageTransition>} />
          <Route path="orders" element={<PageTransition><AdminOrders /></PageTransition>} />
          <Route path="coupons" element={<PageTransition><AdminCoupons /></PageTransition>} />
          <Route path="inventory" element={<PageTransition><AdminInventory /></PageTransition>} />
        </Route>
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  </ThemeProvider>
);

export default App;
