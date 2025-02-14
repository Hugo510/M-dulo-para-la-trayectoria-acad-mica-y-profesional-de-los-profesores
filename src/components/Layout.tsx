import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LogOut, User, FileText, Search, BarChart3 } from 'lucide-react';

export const Layout = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-primary text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <img
                src="/logo-utd.png"
                alt="UTD Logo"
                className="h-10"
              />
              <span className="font-semibold text-xl">UTD CV Manager</span>
            </div>

            {user && (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="hover:text-secondary-light transition-colors">
                  Dashboard
                </Link>
                <Link to="/perfil" className="hover:text-secondary-light transition-colors">
                  <User size={20} />
                </Link>
                <Link to="/cv" className="hover:text-secondary-light transition-colors">
                  <FileText size={20} />
                </Link>
                <Link to="/busqueda" className="hover:text-secondary-light transition-colors">
                  <Search size={20} />
                </Link>
                <Link to="/reportes" className="hover:text-secondary-light transition-colors">
                  <BarChart3 size={20} />
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:text-secondary-light transition-colors"
                >
                  <LogOut size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-primary text-white mt-auto py-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Universidad Tecnológica de Durango</p>
        </div>
      </footer>
    </div>
  );
};