import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { login as authLogin, signup as authSignup } from '../services/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const cookieUser = Cookies.get('user');
    if (cookieUser) {
      setUser(JSON.parse(cookieUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const userData = await authLogin(email, password);
      setUser(userData);
      Cookies.set('user', JSON.stringify(userData), { expires: 7 }); // expires in 7 days
      navigate('/dashboard');
    } catch (error) {
      throw error;
    }
  };

  const signup = async (name, email, password) => {
    try {
      const userData = await authSignup(name, email, password);
      setUser(userData);
      Cookies.set('user', JSON.stringify(userData), { expires: 7 });
      navigate('/dashboard');
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('user');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
