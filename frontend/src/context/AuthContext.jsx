import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { io } from 'socket.io-client';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authAPI.setToken(token);
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      // Initialize socket connection
      const newSocket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000', {
        auth: {
          token: localStorage.getItem('token')
        }
      });

      newSocket.on('connect', () => {
        newSocket.emit('join-room', user.id);
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user]);

  const loadUser = async () => {
    try {
      const response = await authAPI.getMe();
      setUser(response.data.user);
    } catch (error) {
      localStorage.removeItem('token');
      authAPI.setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await authAPI.login(email, password);
    localStorage.setItem('token', response.data.token);
    authAPI.setToken(response.data.token);
    setUser(response.data.user);
    return response;
  };

  const register = async (name, email, password) => {
    const response = await authAPI.register(name, email, password);
    localStorage.setItem('token', response.data.token);
    authAPI.setToken(response.data.token);
    setUser(response.data.user);
    return response;
  };

  const logout = () => {
    localStorage.removeItem('token');
    authAPI.setToken(null);
    setUser(null);
    if (socket) {
      socket.close();
      setSocket(null);
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    socket
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

