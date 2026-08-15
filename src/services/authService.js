const SF_AUTH_ENDPOINT = import.meta.env.VITE_SF_AUTH_ENDPOINT || 'http://localhost:8080/api/auth/salesforce';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// Redirects the browser to the backend-initiated Salesforce OAuth flow.
// The backend handles PKCE, consumer key/secret, and redirects back to
// the frontend with ?session_token=<token> after successful login.
export function initiateOAuthLogin() {
  window.location.href = SF_AUTH_ENDPOINT;
}

// Validates the stored session token by fetching the current user profile.
// Returns: { id, name, email, orgName }
export async function fetchCurrentUser() {
  const token = sessionStorage.getItem('sf_session_token');
  const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error('Session invalid or expired.');
  }

  return response.json();
}

// Clears the local session. Backend token invalidation happens server-side.
export function logout() {
  sessionStorage.removeItem('sf_session_token');
}
