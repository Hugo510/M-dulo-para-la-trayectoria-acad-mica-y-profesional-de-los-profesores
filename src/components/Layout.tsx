import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LogOut, User, FileText, Search, BarChart3, Menu, X } from 'lucide-react';

export const Layout = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className="bg-gradient-to-r from-primary to-primary-light text-white shadow-md relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" aria-label="Inicio">
                <img src="/logo-utd.png" alt="UTD Logo" className="h-10" />
              </Link>
              <span className="font-semibold text-xl">UTD CV Manager</span>
            </div>

            {user && (
              <>
                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6">
                  <Link to="/dashboard" title="Dashboard" aria-label="Dashboard" className="hover:text-secondary-light transition-colors">Dashboard</Link>
                  <Link to="/perfil" title="Perfil" aria-label="Perfil" className="hover:text-secondary-light transition-colors flex items-center justify-center rounded-full h-8 w-8 hover:bg-primary-dark transition-colors"><User size={20} /></Link>
                  <Link to="/cv" title="CV" aria-label="CV" className="hover:text-secondary-light transition-colors flex items-center justify-center rounded-full h-8 w-8 hover:bg-primary-dark transition-colors"><FileText size={20} /></Link>
                  <Link to="/busqueda" title="Búsqueda" aria-label="Búsqueda" className="hover:text-secondary-light transition-colors flex items-center justify-center rounded-full h-8 w-8 hover:bg-primary-dark transition-colors"><Search size={20} /></Link>
                  <Link to="/reportes" title="Reportes" aria-label="Reportes" className="hover:text-secondary-light transition-colors flex items-center justify-center rounded-full h-8 w-8 hover:bg-primary-dark transition-colors"><BarChart3 size={20} /></Link>
                  <button onClick={handleLogout} title="Cerrar sesión" aria-label="Cerrar sesión" className="hover:text-secondary-light transition-colors flex items-center justify-center rounded-full h-8 w-8 hover:bg-primary-dark transition-colors">
                    <LogOut size={20} />
                  </button>
                </div>
                {/* Mobile Menu Toggle */}
                <button
                  className="md:hidden flex items-center focus:outline-none"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle Menu"
                  title="Menú"
                >
                  {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              </>
            )}
          </div>
          {/* Mobile Menu Links */}
          {user && (
            <div className={`md:hidden w-full bg-primary-dark transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-screen py-2' : 'max-h-0 overflow-hidden'}`}>
              <div className="flex flex-col space-y-2">
                <Link to="/dashboard" title="Dashboard" aria-label="Dashboard" className="block px-4 py-2 hover:text-secondary-light transition-colors">Dashboard</Link>
                <Link to="/perfil" title="Perfil" aria-label="Perfil" className="block px-4 py-2 hover:text-secondary-light transition-colors"><User size={24} className="inline mr-1" />Perfil</Link>
                <Link to="/cv" title="CV" aria-label="CV" className="block px-4 py-2 hover:text-secondary-light transition-colors"><FileText size={24} className="inline mr-1" />CV</Link>
                <Link to="/busqueda" title="Búsqueda" aria-label="Búsqueda" className="block px-4 py-2 hover:text-secondary-light transition-colors"><Search size={24} className="inline mr-1" />Busqueda</Link>
                <Link to="/reportes" title="Reportes" aria-label="Reportes" className="block px-4 py-2 hover:text-secondary-light transition-colors"><BarChart3 size={24} className="inline mr-1" />Reportes</Link>
                <button onClick={handleLogout} title="Cerrar sesión" aria-label="Cerrar sesión" className="block px-4 py-2 text-left hover:text-secondary-light transition-colors">
                  <LogOut size={24} className="inline mr-1" /> Salir
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-primary text-white py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Universidad Tecnológica de Durango</p>
        </div>
      </footer>
    </div>
  );
};