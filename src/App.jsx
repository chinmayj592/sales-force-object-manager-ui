import { BrowserRouter, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ObjectProvider } from './context/ObjectContext';
import { useAuth } from './hooks/useAuth';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AppRoutes from './routes';
import './App.css';

function AppShell() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login' || location.pathname === '/'  && !isAuthenticated;
  const showShell = isAuthenticated && !isLoading;

  if (!showShell) {
    return <AppRoutes />;
  }

  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ObjectProvider>
          <AppShell />
        </ObjectProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
