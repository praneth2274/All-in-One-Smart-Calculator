import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types';
import { getCurrentUser } from '../services/authService';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (fields: Partial<User>) => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('calchub_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('calchub_token');
  });

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkSession = async () => {
      const storedToken = localStorage.getItem('calchub_token');
      if (storedToken) {
        try {
          const freshUser = await getCurrentUser();
          if (freshUser) {
            setUser((prev) => ({ ...prev, ...freshUser }));
            localStorage.setItem('calchub_user', JSON.stringify(freshUser));
          }
        } catch (err) {
          console.warn('Backend session check failed or offline, retaining cached session.');
        }
      }
      setLoading(false);
    };
    checkSession();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    if (userData.token) {
      setToken(userData.token);
      localStorage.setItem('calchub_token', userData.token);
    }
    localStorage.setItem('calchub_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('calchub_user');
    localStorage.removeItem('calchub_token');
  };

  const updateUser = (fields: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...fields };
      setUser(updated);
      localStorage.setItem('calchub_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        updateUser,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

