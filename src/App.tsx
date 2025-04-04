
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "./pages/HomePage";
import InventoryPage from "./pages/InventoryPage";
import StatisticsPage from "./pages/StatisticsPage";
import ExpiryPredictorPage from "./pages/ExpiryPredictorPage";
import AddItemPage from "./pages/AddItemPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="/expiry-predictor" element={<ExpiryPredictorPage />} />
            <Route path="/add-item" element={<AddItemPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
