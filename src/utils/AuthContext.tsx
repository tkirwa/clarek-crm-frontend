// AuthContext.tsx
import React, { createContext, useContext, ReactNode, useEffect } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = React.useState<string | null>(() => {
    // Load token from localStorage on initialization
    return localStorage.getItem('token');
  });

  const logout = () => {
    // Clear the token from storage or perform any other logout logic
    localStorage.removeItem('token');
    // Set the token state to null
    setToken(null);
  };

  // Save the token to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('token', token || '');
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
