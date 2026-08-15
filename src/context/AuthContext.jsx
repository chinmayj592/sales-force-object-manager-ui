import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { initiateOAuthLogin, logout as serviceLogout, fetchCurrentUser } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionToken = params.get('session_token');

    if (sessionToken) {
      // Fresh login — Salesforce redirected back with session_token in URL
      sessionStorage.setItem('sf_session_token', sessionToken);
      window.history.replaceState({}, '', window.location.pathname);
    }

    const token = sessionStorage.getItem('sf_session_token');
    if (!token) {
      setIsLoading(false);
      return;
    }

    // Token exists — fetch current user to validate the session
    fetchCurrentUser()
      .then((loggedInUser) => setUser(loggedInUser))
      .catch(() => {
        // Token invalid or expired — clear and force re-login
        sessionStorage.removeItem('sf_session_token');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(() => {
    setError(null);
    initiateOAuthLogin();
  }, []);

  const logout = useCallback(() => {
    serviceLogout();
    setUser(null);
    setError(null);
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}
