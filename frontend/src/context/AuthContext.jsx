import { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
// import { login, register } from '../services/auth..js';
import {login, register} from '../services/Auth.js'; // Adjust the import path as necessary
// 1. Create Context
const AuthContext = createContext();

// 2. Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check for token on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (token) {
          const decoded = jwtDecode(token);
          setUser(decoded);
        }
      } catch (error) {
        console.error("Invalid token", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [token]);

  // Login function
  const login = async (credentials) => {
    try {
      const response = await login(credentials);
      setToken(response.token);
      localStorage.setItem('token', response.token);
      navigate('/dashboard');
    } catch (error) {
      throw error;
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const response = await register(userData);
      setToken(response.token);
      localStorage.setItem('token', response.token);
      navigate('/dashboard');
    } catch (error) {
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Context value
  const value = {
    user,
    token,
    isLoading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom Hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default AuthContext;