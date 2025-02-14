import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/Layout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { PerfilPage } from './pages/PerfilPage';
import { CVPage } from './pages/CVPage';
import { BusquedaPage } from './pages/BusquedaPage';
import { ReportesPage } from './pages/ReportesPage';
import { useAuthStore } from './store/authStore';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuthStore();
  if (!token) return <Navigate to="/login" />;
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="perfil" element={<PerfilPage />} />
          <Route path="cv" element={<CVPage />} />
          <Route path="busqueda" element={<BusquedaPage />} />
          <Route path="reportes" element={<ReportesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;