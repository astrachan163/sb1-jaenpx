import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, BookOpen, Library, Scan } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: 'fundraiser', icon: ShoppingBag, label: 'Fundraiser', path: '/#fundraiser' },
    { id: 'courses', icon: BookOpen, label: 'Courses', path: '/courses' },
    { id: 'resources', icon: Library, label: 'Resources', path: '/resources' },
    { id: 'qr-scanner', icon: Scan, label: 'QR Scanner', path: '/qr-scanner' },
  ];

  const handleNavigation = (path: string) => {
    if (path.startsWith('/#')) {
      navigate('/');
      const element = document.getElementById(path.substring(2));
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-gray-900/90 backdrop-blur-md z-50 border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              NRF RISE Up
            </Link>
            
            <div className="hidden md:flex space-x-6">
              {navItems.map(({ id, icon: Icon, label, path }) => (
                <button
                  key={id}
                  onClick={() => handleNavigation(path)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all
                    ${location.pathname === path || (path.startsWith('/#') && location.pathname === '/')
                      ? 'text-cyan-400 bg-cyan-500/10' 
                      : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/5'
                    }`}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link 
              to="/courses"
              className="px-4 py-2 rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:from-cyan-600 hover:to-blue-600 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;