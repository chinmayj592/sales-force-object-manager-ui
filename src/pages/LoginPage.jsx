import LoginButton from '../components/auth/LoginButton';

export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card__icon" aria-hidden="true">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
          </svg>
        </div>
        <h1 className="login-card__title">Salesforce Object Manager</h1>
        <p className="login-card__subtitle">
          Sign in with your Salesforce account to manage your CRM records.
        </p>
        <LoginButton />
        <p className="login-card__note">
          Uses OAuth 2.0 — your credentials are never stored in this application.
        </p>
      </div>
    </div>
  );
}
