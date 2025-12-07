'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: string | null; // For now, just storing a string (token exists?)
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  // Check for token when the app starts
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setUser(token);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem('access_token', token);
    setUser(token); // Update state immediately
    router.push('/'); // Redirect to home
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null); // Update state immediately
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the context easily
export function useAuth() {
  return useContext(AuthContext);
}