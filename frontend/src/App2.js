
// import { Toaster } from "react-toastify";
// import { TooltipProvider } from "react-bootstrap/Tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './App2/redux/store';
import NotFound from "./App2/pages/NotFound";
import ZapierIntegration from "./App2/pages/ZapierIntegration";

// Auth routes
import Login from "./App2/pages/Login";
import Register from "./App2/pages/Register";
import ProtectedRoute from "./App2/components/ProtectedRoute";
import PublicRoute from "./App2/components/PublicRoute";
import DashboardLayout from "./App2/components/DashboardLayout";

// Protected pages
import Dashboard from "./App2/pages/Dashboard";
import Tasks from "./App2/pages/Tasks";
import Customers from "./App2/pages/Customers";
import 'bootstrap/dist/css/bootstrap.min.css';

const queryClient = new QueryClient();

const App2 = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      {/* <TooltipProvider> */}
      {/* <Toaster position="top-right" /> */}

      <BrowserRouter>
        <Routes>
          {/* Public routes (accessible only when logged out) */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected routes (require authentication) */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/customers" element={<Customers />} />
              {/* <Route path="/zapier" element={<ZapierIntegration />} /> */}
              {/* Add more protected routes here */}
              <Route path="/reports" element={<div className="p-4">Reports Page (Coming Soon)</div>} />
              <Route path="/settings" element={<div className="p-4">Settings Page (Coming Soon)</div>} />
            </Route>
          </Route>

          {/* Special routes */}
          <Route path="/zapier" element={<ZapierIntegration />} />

          {/* Catch all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      {/* <ToastContainer /> */}

      {/* </TooltipProvider> */}
    </QueryClientProvider>
  </Provider>
);

export default App2;
