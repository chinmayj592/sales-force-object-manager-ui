import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import Spinner from '../components/common/Spinner';

const ORG_OPTIONS = [
  { label: 'Production / Developer', value: 'https://login.salesforce.com' },
  { label: 'Sandbox',                value: 'https://test.salesforce.com' },
  { label: 'Custom Domain',          value: 'custom' },
];

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    title: 'Multi-Object Management',
    desc: 'Manage Account, Opportunity, Lead, Contact & Case from one unified interface.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'OAuth 2.0 Secured',
    desc: 'Enterprise-grade security with Salesforce OAuth 2.0 + PKCE. Your credentials are never stored.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Real-Time CRUD',
    desc: 'Create, view, edit and delete Salesforce records instantly with live data sync.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
        <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
      </svg>
    ),
    title: 'Infinite Pagination',
    desc: 'Loads 20 records at a time with smooth infinite scroll for large datasets.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'Any Salesforce Org',
    desc: 'Works with Production, Sandbox and Custom Domain orgs seamlessly.',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      </svg>
    ),
    title: 'External Client App',
    desc: 'Integrated via Salesforce External Client App using standard REST & OAuth APIs.',
  },
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
    <div className="lp">
      {/* ── Created By Banner ── */}
      <div className="lp__created-by">
        <span className="lp__created-by-name">Chinmay Jaiswal</span>
        <span className="lp__created-by-sep">·</span>
        <span className="lp__created-by-role">Full Stack Developer · Associate Software Engineer Candidate</span>
      </div>

      {/* ── Hero ── */}
      <section className="lp__hero">
        <div className="lp__hero-bg" aria-hidden="true">
          <div className="lp__hero-blob lp__hero-blob--1" />
          <div className="lp__hero-blob lp__hero-blob--2" />
        </div>
        <div className="lp__hero-inner">
          <div className="lp__hero-left">
            <div className="lp__badge">Assignment #1 — Associate Software Engineer</div>
            <h1 className="lp__hero-title">
              Salesforce
              <span className="lp__hero-title--accent"> Object Manager</span>
            </h1>
            <p className="lp__hero-sub">
              A full-stack web application to perform CRUD operations on Salesforce
              standard objects — built with React, Spring Boot &amp; OAuth 2.0.
            </p>
            <div className="lp__author">
              <div className="lp__author-avatar">CJ</div>
              <div>
                <div className="lp__author-name">Chinmay Jaiswal</div>
                <div className="lp__author-role">Full Stack Developer · Associate Software Engineer Candidate</div>
              </div>
            </div>
          </div>

          {/* ── Login Card ── */}
          <div className="lp__card">
            <div className="lp__card-header">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor" className="lp__card-icon">
                <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
              </svg>
              <div>
                <div className="lp__card-title">Sign in to Salesforce</div>
                <div className="lp__card-subtitle">Select your org environment</div>
              </div>
            </div>

            <div className="lp__field">
              <label htmlFor="org-type" className="lp__label">Salesforce Environment</label>
              <select
                id="org-type"
                className="lp__select"
                value={orgType}
                onChange={(e) => setOrgType(e.target.value)}
                disabled={isLoading}
              >
                {ORG_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {orgType === 'custom' && (
              <div className="lp__field">
                <label htmlFor="custom-url" className="lp__label">Custom Domain URL</label>
                <input
                  id="custom-url"
                  type="url"
                  className="lp__input"
                  placeholder="https://mycompany.my.salesforce.com"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            )}

            <button
              className="lp__login-btn"
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
            </button>

            <p className="lp__card-note">
              🔒 OAuth 2.0 secured — credentials never stored
            </p>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="lp__features">
        <div className="lp__features-inner">
          <div className="lp__section-label">What this app does</div>
          <h2 className="lp__section-title">Built for the Assignment. Ready for Production.</h2>
          <p className="lp__section-sub">
            Demonstrates real-world Salesforce integration using industry-standard patterns.
          </p>
          <div className="lp__grid">
            {FEATURES.map((f) => (
              <div key={f.title} className="lp__feature-card">
                <div className="lp__feature-icon">{f.icon}</div>
                <h3 className="lp__feature-title">{f.title}</h3>
                <p className="lp__feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="lp__stack">
        <div className="lp__stack-inner">
          <div className="lp__section-label">Tech Stack</div>
          <div className="lp__stack-pills">
            {['React 19', 'Spring Boot 3', 'OAuth 2.0 + PKCE', 'Salesforce REST API', 'Java 17', 'Render'].map((t) => (
              <span key={t} className="lp__pill">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="lp__footer">
        <span>Built by <strong>Chinmay Jaiswal</strong></span>
      </footer>
    </div>
  );
}
