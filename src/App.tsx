import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import Employees from "./pages/Employees";
import Employers from "./pages/Employers";
import Household from "./pages/Household";
import Learn from "./pages/Learn";
import MoneyWise from "./pages/MoneyWise";
import Support from "./pages/Support";
import Pilot from "./pages/Pilot";
import FieldAgent from "./pages/FieldAgent";
import Compliance from "./pages/Compliance";
import Contact from "./pages/Contact";
import AppPrototype from "./pages/AppPrototype";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/employers" element={<Employers />} />
            <Route path="/household" element={<Household />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/moneywise" element={<MoneyWise />} />
            <Route path="/support" element={<Support />} />
            <Route path="/pilot" element={<Pilot />} />
            <Route path="/field-agent" element={<FieldAgent />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/app" element={<AppPrototype />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
