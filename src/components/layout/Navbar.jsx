import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserCircleIcon, LogoutIcon } from '@heroicons/react/outline';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
                CrediKhaata
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-2">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <UserCircleIcon className="h-5 w-5 mr-1" />
                  <span>{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
                  title="Logout"
                >
                  <LogoutIcon className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
