import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import Spinner from '../components/common/Spinner';

const ORG_OPTIONS = [
  { label: 'Production / Developer', value: 'https://login.salesforce.com' },
  { label: 'Sandbox',                value: 'https://test.salesforce.com' },
  { label: 'Custom Domain',          value: 'custom' },
];

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const [orgType, setOrgType] = useState(ORG_OPTIONS[0].value);
  const [customUrl, setCustomUrl] = useState('');

  function handleLogin() {
    const loginUrl = orgType === 'custom' ? customUrl.trim() : orgType;
    login(loginUrl);
  }

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

        <div className="login-card__org-selector">
          <label htmlFor="org-type">Salesforce Environment</label>
          <select
            id="org-type"
            value={orgType}
            onChange={(e) => setOrgType(e.target.value)}
            disabled={isLoading}
          >
            {ORG_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          {orgType === 'custom' && (
            <input
              type="url"
              placeholder="https://mycompany.my.salesforce.com"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              disabled={isLoading}
              className="login-card__custom-url"
            />
          )}
        </div>

        <Button
          variant="salesforce"
          size="lg"
          onClick={handleLogin}
          disabled={isLoading || (orgType === 'custom' && !customUrl.trim())}
        >
          {isLoading ? (
            <><Spinner size="sm" label="Signing in…" /><span>Connecting…</span></>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
              </svg>
              <span>Login with Salesforce</span>
            </>
          )}
        </Button>

        <p className="login-card__note">
          Uses OAuth 2.0 — your credentials are never stored in this application.
        </p>
      </div>
    </div>
  );
}
