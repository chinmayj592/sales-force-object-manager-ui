import { useAuth } from '../../hooks/useAuth';
import Button from '../common/Button';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__brand">
          <svg className="header__logo" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
          </svg>
          <span className="header__title">Salesforce Manager</span>
        </div>
        {user && (
          <div className="header__user">
            <span className="header__user-name">{user.name}</span>
            <span className="header__user-org">{user.orgName}</span>
            <Button variant="ghost" size="sm" onClick={logout}>Sign out</Button>
          </div>
        )}
      </div>
    </header>
  );
}
