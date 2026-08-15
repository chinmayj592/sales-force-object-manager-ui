import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ObjectProvider } from './context/ObjectContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AppRoutes from './routes';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ObjectProvider>
          <div className="app-shell">
            <Header />
            <main className="app-main">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </ObjectProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
